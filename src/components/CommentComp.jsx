import React from "react";
import ConfigFunc from "../config/ConfigFunc";

const CommentComp = ({ comment }) => {
  const { formatTime } = ConfigFunc();
  return (
    <div className="flex flex-col gap-2 border-b-2 border-gray-200 py-4 px-3">
      <div className="flex items-center gap-5">
        <img
          src={comment.users.photoUrl.fileUrl}
          className="w-12 h-12 rounded-[50%] object-cover"
          alt={comment?.users?.name}
        />
        <div className="flex flex-col gap-1">
          <h3 className="font-medium text-sm text-darkGrey leading-none">{comment?.users?.name}</h3>
          <p className="text-xs text-gray-600">{formatTime(comment.created_at)}</p>
        </div>
      </div>
      <div className="p-3 text-sm mt-2 font-medium bg-white text-darkGrey">
        {comment.commentText}
      </div>
    </div>
  );
};

export default CommentComp;
