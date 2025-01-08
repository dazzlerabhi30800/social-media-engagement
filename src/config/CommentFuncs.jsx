import toast from "react-hot-toast";
import { supabase } from "./supabaseConfig";
import { useSocialContext } from "../context/SocialContext";

const CommentFuncs = () => {
  const { userInfo } = useSocialContext();

  // NOTE: fetch post comments by post id
  const fetchComments = async (id) => {
    const { data, error } = await supabase
      .from("comments")
      .select("*, users(photoUrl, name)")
      .eq("postId", id);
    if (!error) {
      return data;
    }
    return [];
  };

  // NOTE: to post comment
  const postComment = async (postId, commentText) => {
    if (!postId || !commentText) {
      toast.error("Fill all the fields correctly!");
    }
    const { error } = await supabase.from("comments").insert([
      {
        commentText: commentText,
        commented_by: userInfo.id,
        postId: postId,
        replies: [],
      },
    ]);
    if (error) {
      console.log(error);
      return false;
    }
    return true;
  };

  // NOTE: to get no fo comments for a post
  const getCommentCount = async (postId) => {
    const { count } = await supabase
      .from("comments")
      .select("id", { count: "exact", head: true })
      .eq("postId", postId);
    return count;
  };

  return { fetchComments, postComment, getCommentCount };
};

export default CommentFuncs;
