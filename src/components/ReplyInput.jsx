import React, { useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import { RiLoader3Fill } from "react-icons/ri";
import CommentFuncs from "../config/CommentFuncs";

const ReplyInput = ({ id, setFetching, replies, username }) => {
  const [commentString, setCommentString] = useState("");
  const [loading, setLoading] = useState(false);
  const { postReply } = CommentFuncs();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) return;
    setLoading(true);
    await postReply(id, commentString, replies);
    setFetching(true);
    setCommentString("");
    setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 text-lg mt-4 w-full">
      <input
        type="text"
        required
        value={commentString}
        placeholder={`Reply to @${username} `}
        onChange={(e) => setCommentString(e.target.value)}
        className="p-2 px-4 border-2 border-gray-400 focus:border-gray-500 flex-1 rounded-sm"
      />
      <button
        disabled={loading}
        type="submit"
        className="p-2 px-4 bg-darkGrey hover:bg-gray-500 text-white font-medium rounded-sm"
      >
        {loading ? (
          <RiLoader3Fill className="animate-spin" size={20} />
        ) : (
          <FaRegPaperPlane size={20} />
        )}
      </button>
    </form>
  );
};

export default ReplyInput;
