import React, { useState } from "react";
import ConfigFunc from "../config/ConfigFunc";
import Replies from "./Replies";

const CommentComp = ({ comment, showReplyBtn, fetching, setFetching }) => {
  const { formatTime } = ConfigFunc();
  const [showReplies, setShowReplies] = useState(false);
  return (
    <div className="flex flex-col gap-2 border-b-2 border-gray-200 py-4 px-3">
      <div className="flex items-center gap-5">
        <img
          src={comment.users.photoUrl.fileUrl}
          className="w-12 h-12 rounded-[50%] object-cover"
          alt={comment?.users?.name}
        />
        <div className="flex flex-col gap-1">
          <h3 className="font-medium text-sm text-darkGrey leading-none">
            {comment?.users?.name}
          </h3>
          <p className="text-xs text-gray-600">
            {formatTime(comment.created_at)}
          </p>
        </div>
      </div>
      <div className="p-3 text-sm mt-2 font-medium bg-white text-darkGrey">
        {comment.commentText}
      </div>
      {showReplyBtn && (
        <button
          onClick={() => setShowReplies((prev) => !prev)}
          className="text-blue-400 font-semibold hover:underline ml-5 w-fit"
        >
          {showReplies
            ? "hide replies"
            : `show ${comment?.replies.length} replies`}
        </button>
      )}
      {showReplies && (
        <Replies
          fetching={fetching}
          setFetching={setFetching}
          commentId={comment?.id}
          replies={comment?.replies}
          username={comment?.users?.name}
        />
      )}
    </div>
  );
};

export default CommentComp;
