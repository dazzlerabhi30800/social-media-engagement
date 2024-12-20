import moment from "moment";
import { supabase } from "../config/supabaseConfig";
import { useSocialContext } from "./SocialContext";
import { useNavigate } from "react-router-dom";

export default function ConfigFunc() {
  const {
    setPosts,
    setUserInfo,
    userInfo,
    setUserPosts,
    posts,
    setPage,
    page,
    setTotalPosts,
    totalPosts,
    setHasMore,
    setLoading,
  } = useSocialContext();
  const navigate = useNavigate();

  // NOTE: function to fetch Post
  const fetchFeed = async () => {
    setLoading(true);
    const { data: countData, count } = await supabase
      .from("posts")
      .select("*", { count: "exact", head: true });
    const { data, error } = await supabase
      .from("posts")
      .select("*, users(photoUrl, name)")
      .order("created_at", { ascending: false })
      .limit(page * 2);
    if (data) {
      setPosts(data);
      setTotalPosts(count);
      setLoading(false);
    }
    if (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // NOTE: function to get post by id
  const getPost = async (id) => {
    const { data, error } = await supabase
      .from("posts")
      .select("*, users(photoUrl, name)")
      .eq("id", id);
    return { data, error };
  };

  //NOTE: function for infinite scrolling component to fetch more feeds
  const fetchMoreFeeds = () => {
    setHasMore(true);
    let pageCount = getPages();
    if (page >= pageCount) {
      setHasMore(false);
    } else if (posts.length === totalPosts) {
      setHasMore(false);
    } else {
      setPage((prev) => prev + 1);
      setHasMore(true);
    }
  };

  // NOTE: get exact no of pages based on the length of posts
  const getPages = () => {
    let pageNo = Math.floor(totalPosts / 2);
    let remainingPages = totalPosts % 2;
    const totalPages = pageNo + remainingPages;
    return totalPages;
  };

  // NOTE: function to fetch user info on profile page
  const getUserInfo = async (id) => {
    if (!id) return;
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
    }
    if (data) {
      setUserInfo(data[0]);
      return data[0];
    }
  };

  // NOTE: get user posts for profile page
  const getUserPosts = async (id) => {
    const { data, error } = await supabase
      .from("posts")
      .select("*, users(photoUrl, name)")
      .order("created_at", { ascending: false })
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
      return prevBanner;
    }
    const fileName = `posts/${file.name}-${Date.now()}`;
    if (!prevBanner) {
      const { data, error } = await supabase.storage
        .from("post-imgs")
        .upload(fileName, file, {
          cacheControl: "0",
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
        .remove([prevBanner.path]);

      const { data: newFile, error: newError } = await supabase.storage
        .from("post-imgs")
        .upload(fileName, file, {
          cacheControl: "0",
        });
      if (error) {
        console.log(error);
      }
      if (newError) {
        console.log(newError);
      } else {
        const { data: fileUrl } = supabase.storage
          .from("post-imgs")
          .getPublicUrl(newFile?.path);
        const info = {
          path: newFile?.path,
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
    if (!newImg) {
      return currentImg;
    }
    const fileName = `posts/${newImg.name}-${Date.now()}`;
    if (!currentImg.path) {
      const { data, error } = await supabase.storage
        .from("post-imgs")
        .upload(fileName, newImg, {
          cacheControl: "0",
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
        .remove([currentImg.path]);

      const { data: newFile, error: newError } = await supabase.storage
        .from("post-imgs")
        .upload(fileName, newImg, {
          cacheControl: "0",
        });
      if (error) {
        console.log(error);
      }
      if (newError) {
        console.log(newError);
      }
      if (newFile) {
        const { data: fileUrl } = supabase.storage
          .from("post-imgs")
          .getPublicUrl(newFile?.path);
        const info = {
          path: newFile?.path,
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
    newProfileImg,
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
      const userData = await getUserInfoWithoutFeeds(userInfo?.id);
      if (userData) {
        navigate(`/feed`);
      }
    }
  };

  const formatTime = (time) => {
    if (!time) return;
    const formatted = moment(time).startOf("hour").fromNow();
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
    fetchMoreFeeds,
    getPost,
  };
}
