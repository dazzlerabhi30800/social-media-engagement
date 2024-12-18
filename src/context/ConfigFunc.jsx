import moment from "moment";
import { supabase } from "../config/supabaseConfig";
import { useSocialContext } from "./SocialContext";

export default function ConfigFunc() {
  const { setPosts, setUserInfo, setUserPosts } = useSocialContext();

  // NOTE: fucntion to fetch Post
  const fetchFeed = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);
    if (data) {
      setPosts(data);
    }
    if (error) {
      console.log(error);
    }
  };

  // NOTE: function to fetch user info on profile page
  const getUserInfo = async (id) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .limit(1);
    if (error) {
      console.log(error);
    } else {
      setUserInfo(data[0]);
      getUserPosts(id);
    }
  };

  // NOTE: function to fetch user info on profile page
  const getUserInfoWithoutFeeds = async (id) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .limit(1);
    if (error) {
      console.log(error);
    } else {
      return data[0];
    }
  };

  // NOTE: get user posts for profile page
  const getUserPosts = async (id) => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("user_id", id);
    if (error) {
      // console.log(error);
      aler(error.message);
    } else {
      setUserPosts(data);
    }
  };

  // save file to cloud storage
  const saveToCloudStorage = async (file) => {
    if (!file) {
      return false;
    }
    const { data, error } = await supabase.storage
      .from("post-imgs")
      .upload(`posts/${file.name}`, file);
    if (data) {
      const { data: fileUrl } = supabase.storage
        .from("post-imgs")
        .getPublicUrl(data?.path);
      return fileUrl?.publicUrl;
    } else {
      console.log(error);
      return false;
    }
  };

  //  save user edited bio
  const saveUserEditedBio = async (id, name, bio, bannerFile) => {
    if (!id || !name || !bio) {
      alert("Please fill all the required fields");
    }

    const fileUrl = await saveToCloudStorage(bannerFile);

    const { data, error } = await supabase
      .from("users")
      .update({
        name: name,
        bio: bio,
        banner_img: fileUrl ? fileUrl : null,
      })
      .eq("id", id)
      .select();
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  };

  const formatTime = (time) => {
    if (!time) return;
    const formatted = moment(time).startOf("hour").fromNow();
    // console.log(moment(time).format("YYYY hh:mm"));
    return formatted;
  };

  const paddingStyles = "p-4 sm:p-6 md:px-10";

  return {
    fetchFeed,
    formatTime,
    getUserInfo,
    paddingStyles,
    saveUserEditedBio,
    getUserInfoWithoutFeeds,
  };
}
