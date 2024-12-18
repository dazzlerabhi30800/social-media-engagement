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

  const formatTime = (time) => {
    if (!time) return;
    const formatted = moment(time).startOf("hour").fromNow();
    // console.log(moment(time).format("YYYY hh:mm"));
    return formatted;
  };

  const paddingStyles = "p-4 sm:p-6 md:px-10";

  return { fetchFeed, formatTime, getUserInfo, paddingStyles };
}
