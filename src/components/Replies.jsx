import React from "react";
import ReplyInput from "./ReplyInput";
import ReplyComp from "./ReplyComp";

const Replies = ({ fetching, setFetching, commentId, replies, username }) => {
  return (
    <div className="flex flex-col pl-10">
      <ReplyInput
        id={commentId}
        fetching={fetching}
        setFetching={setFetching}
        replies={replies}
        username={username}
      />

      <div
        className={`flex flex-col border-2 ${
          replies.length > 0 ? "border-blue-300" : "border-transparent"
        }  } border-b-transparent mt-5`}
      >
        {replies.map((reply, index) => (
          <ReplyComp reply={reply} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Replies;
