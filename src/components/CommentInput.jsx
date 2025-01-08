import React, { useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import CommentFuncs from "../config/CommentFuncs";
import { RiLoader3Fill } from "react-icons/ri";

const CommentInput = ({ postId, setFetching, fetching }) => {
  const [commentString, setCommentString] = useState("");
  const { postComment } = CommentFuncs();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await postComment(postId, commentString);
    setFetching(true);
    setCommentString("");
  };
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 text-lg mt-4 w-full">
      <input
        type="text"
        required
        value={commentString}
        placeholder="Comment Something..."
        onChange={(e) => setCommentString(e.target.value)}
        className="p-2 px-4 border-2 border-gray-400 focus:border-gray-500 flex-1 rounded-sm"
      />
      <button
        disabled={fetching}
        type="submit"
        className="p-2 px-4 bg-darkGrey hover:bg-gray-500 text-white font-medium rounded-sm"
      >
        {fetching ? (
          <RiLoader3Fill className="animate-spin" size={20} />
        ) : (
          <FaRegPaperPlane size={20} />
        )}
      </button>
    </form>
  );
};

export default CommentInput;
