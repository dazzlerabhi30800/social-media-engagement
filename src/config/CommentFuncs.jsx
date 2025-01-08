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
      .eq("postId", id)
      .order("created_at", { ascending: false });
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

  const postReply = async (id, replyString, replies) => {
    if (!userInfo) {
      toast.error("You are not logged in");
      return;
    }
    const newReplies = [...replies];
    newReplies.push({
      id: id,
      replyString: replyString,
      users: userInfo,
      date: Date.now(),
    });
    const { error } = await supabase
      .from("comments")
      .update({
        replies: newReplies,
      })
      .eq("id", id);
    if (error) {
      console.log(error);
      toast.error(error.message);
      return;
    }
    return true;
  };

  return { fetchComments, postComment, postReply };
};

export default CommentFuncs;
