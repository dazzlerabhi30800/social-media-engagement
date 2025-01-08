import moment from "moment";
import { supabase } from "../config/supabaseConfig";
import { useNavigate } from "react-router-dom";
import { compressFile } from "../config/utilFunc";
import toast from "react-hot-toast";
import { useSocialContext } from "../context/SocialContext";

export default function ConfigFunc() {
  const {
    setPosts,
    setUserInfo,
    userInfo,
    setUserPosts,
    setPage,
    page,
    setTotalPosts,
    totalPosts,
    setHasMore,
    setLoading,
    setPostAnimate,
    setFiles,
    files,
  } = useSocialContext();
  const navigate = useNavigate();
  const limit = 20;

  // NOTE: function to fetch Post
  const fetchFeed = async () => {
    setLoading(true);
    const { count } = await supabase
      .from("posts")
      .select("*", { count: "exact", head: true });
    const { data, error } = await supabase
      .from("posts")
      .select("*, users(photoUrl, name),comments:comments(count)")
      .order("created_at", { ascending: false })
      .limit(page * limit);
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
    setPage((prev) => (prev + 1 > pageCount ? prev : prev + 1));
  };

  // NOTE: get exact no of pages based on the length of posts
  const getPages = () => {
    let pageNo = Math.floor(totalPosts / limit);
    let remainingPages =
      Math.floor((totalPosts % limit) / 20) > 0
        ? Math.floor((totalPosts % limit) / 20)
        : 1;
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
      alert(error.message);
    } else {
      setUserPosts(data);
    }
  };

  // update the user profile & banner photo url
  const updateUserProfileImg = async (currentImg, newImg, width) => {
    if (!currentImg && !newImg) {
      return false;
    }
    if (!newImg) {
      return currentImg;
    }
    if (!newImg.type.includes("image/")) {
      toast.error("You can only upload image files");
      return false;
    }
    const fileName = `posts/${newImg.name}-${Date.now()}`;
    const compressedFile = await compressFile(newImg, width);
    if (!compressedFile) {
      toast.error("cannot compress file. Please try again");
      return;
    }
    if (!currentImg || !currentImg.path) {
      const { data, error } = await supabase.storage
        .from("post-imgs")
        .upload(fileName, compressedFile, {
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
        toast.error(error.message);
        return false;
      }
    } else {
      const { error } = await supabase.storage
        .from("post-imgs")
        .remove([currentImg.path]);

      const { data: newFile, error: newError } = await supabase.storage
        .from("post-imgs")
        .upload(fileName, compressedFile, {
          cacheControl: "0",
        });
      if (error) {
        toast.error(error.message);
      }
      if (newError) {
        toast.error(newError.message);
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
    newProfileImg
  ) => {
    if (!id || !name || !bio) {
      alert("Please fill all the required fields");
    }
    setLoading(true);

    // const fileUrl = await saveToCloudStorage(bannerFile, prevBanner);
    const fileUrl = await updateUserProfileImg(prevBanner, bannerFile, 600);
    const profileInfo = await updateUserProfileImg(
      profileImg,
      newProfileImg,
      150
    );

    const { error } = await supabase
      .from("users")
      .update({
        name: name,
        bio: bio,
        banner_img: fileUrl ? fileUrl : prevBanner,
        photoUrl: profileInfo ? profileInfo : profileImg,
      })
      .eq("id", id)
      .select();
    if (error) {
      console.log(error);
      setLoading(false);
    } else {
      const userData = await getUserInfoWithoutFeeds(userInfo?.id);
      if (userData) {
        setLoading(false);
        toast.success("profile updated succesfully", { duration: 5000 });
        navigate(-1);
      }
    }
  };

  // NOTE: Managing Likes
  const handlePostLikes = async (postId, likesArr, userId) => {
    if (!userInfo) {
      navigate("/");
      return;
    }
    if (!postId || !likesArr || !userId) return;
    setPostAnimate(postId);
    const updatedLikesArr = [...likesArr];
    const findUserIndex = updatedLikesArr.findIndex((user) => user === userId);
    if (findUserIndex < 0) {
      updatedLikesArr.push(userId);
    } else {
      updatedLikesArr.splice(findUserIndex, 1);
    }
    const { data, error } = await supabase
      .from("posts")
      .update({
        likes: updatedLikesArr,
      })
      .select("likes")
      .eq("id", postId);
    if (error) {
      toast.error(error.message);
      setPostAnimate("");
    } else {
      await fetchFeed();
      setPostAnimate("");
    }
  };

  // NOTE: to upload files

  const uploadFiles = (e) => {
    const newFiles = e.target.files;
    const filesArr = [...files];
    for (let i = 0; i < newFiles.length; i++) {
      filesArr.push(newFiles[i]);
    }
    if (filesArr.length > 3) {
      toast.error("you can't upload more than 3 image files!!", {
        duration: 3000,
      });
      return;
    }
    setFiles(filesArr);
  };

  // format post timestamps
  const formatTime = (time) => {
    if (!time) return;
    // const formatted = moment(time).format("h:mm a -- ddd -- Do MMM'YY");
    const formatted = moment(time).fromNow();
    return formatted;
  };

  // padding styles for main screen
  const paddingStyles = "p-6 md:px-10";

  return {
    fetchFeed,
    formatTime,
    getUserInfo,
    paddingStyles,
    saveUserEditedBio,
    getUserInfoWithoutFeeds,
    fetchMoreFeeds,
    getPost,
    handlePostLikes,
    uploadFiles,
  };
}
