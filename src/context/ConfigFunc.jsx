import moment from "moment";
import { supabase } from "../config/supabaseConfig";
import { useSocialContext } from "./SocialContext";

export default function ConfigFunc() {
  const { setPosts, setUserInfo, setUserPosts, userInfo } = useSocialContext();

  // NOTE: fucntion to fetch Post
  const fetchFeed = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*, users(photoUrl, name)")
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
      // let bannerImg = JSON.parse(data[0]?.banner_img);
      // let profileData = JSON.parse(data[0]?.photoUrl);
      // setUserInfo({ ...data[0], banner_img: bannerImg, photoUrl: profileData });
      console.log(data[0]);
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
  const saveToCloudStorage = async (file, prevBanner) => {
    if (!file) {
      return false;
    }
    if (!prevBanner) {
      const fileName = `posts/${file.name}-${Date.now()}`;
      const { data, error } = await supabase.storage
        .from("post-imgs")
        .upload(fileName, file, {
          cacheControl: "200",
        });
      if (data) {
        const { data: fileUrl } = supabase.storage
          .from("post-imgs")
          .getPublicUrl(data?.path);
        const info = {
          path: data?.path,
          fileUrl: fileUrl?.publicUrl,
        };
        return info;
      } else {
        console.log(error);
        return false;
      }
    } else {
      const { data, error } = await supabase.storage
        .from("post-imgs")
        .update(prevBanner, file, {
          cacheControl: "0",
          upsert: true,
        });
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        const { data: fileUrl } = supabase.storage
          .from("post-imgs")
          .getPublicUrl(data?.path);
        const info = {
          path: data?.path,
          fileUrl: fileUrl?.publicUrl,
        };
        return info;
      }
    }
  };

  // check the user profile photo url
  const updateUserProfileImg = async (currentImg, newImg) => {
    if (!currentImg || !newImg) {
      return false;
    }
    if (!currentImg.path) {
      const fileName = `posts/${newImg.name}-${Date.now()}`;
      const { data, error } = await supabase.storage
        .from("post-imgs")
        .upload(fileName, newImg, {
          cacheControl: "200",
        });
      if (data) {
        const { data: fileUrl } = supabase.storage
          .from("post-imgs")
          .getPublicUrl(data?.path);
        const info = {
          path: data?.path,
          fileUrl: fileUrl?.publicUrl,
        };
        return info;
      } else {
        console.log(error);
        return false;
      }
    } else {
      const { data, error } = await supabase.storage
        .from("post-imgs")
        .update(prevBanner.path, file, {
          cacheControl: "0",
          upsert: true,
        });
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        const { data: fileUrl } = supabase.storage
          .from("post-imgs")
          .getPublicUrl(data?.path);
        const info = {
          path: data?.path,
          fileUrl: fileUrl?.publicUrl,
        };
        return info;
      }
    }
  };

  //  save user edited bio
  const saveUserEditedBio = async (
    id,
    name,
    bio,
    bannerFile,
    prevBanner,
    profileImg,
    newProfileImg
  ) => {
    if (!id || !name || !bio) {
      alert("Please fill all the required fields");
    }

    const fileUrl = await saveToCloudStorage(bannerFile, prevBanner);
    const profileInfo = await updateUserProfileImg(profileImg, newProfileImg);

    const { data, error } = await supabase
      .from("users")
      .update({
        name: name,
        bio: bio,
        banner_img: fileUrl ? fileUrl : {},
        photoUrl: profileInfo ? profileInfo : profileImg,
      })
      .eq("id", id)
      .select();
    if (error) {
      console.log(error);
    } else {
      // console.log(data);
      alert("Profile Updated Succesfully");
    }
  };

  const formatTime = (time) => {
    if (!time) return;
    const formatted = moment(time).startOf("hour").fromNow();
    // console.log(moment(time).format("YYYY hh:mm"));
    return formatted;
  };

  const paddingStyles = "p-6 md:px-10";

  const fetchImage = (image) => {
    if (!image) {
      return false;
    }
    let imageData = JSON.parse(image);
    if (typeof imageData === "object") {
      return imageData?.fileUrl;
    }
    return imageData;
  };
  return {
    fetchFeed,
    formatTime,
    getUserInfo,
    paddingStyles,
    saveUserEditedBio,
    getUserInfoWithoutFeeds,
    fetchImage,
  };
}
