import React, { useEffect, useState } from "react";
import CommentFuncs from "../config/CommentFuncs";
import CommentComp from "./CommentComp";
import CommentInput from "./CommentInput";
import { RiLoader3Fill } from "react-icons/ri";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [fetching, setFetching] = useState(true);
  const { fetchComments } = CommentFuncs();
  useEffect(() => {
    fetching &&
      fetchComments(postId).then((res) => {
        setComments(res);
        setFetching(false);
      });
  }, [fetching]);
  return (
    <div className="mt-5 flex flex-col w-full flex-1">
      <CommentInput
        postId={postId}
        setFetching={setFetching}
        fetching={fetching}
      />
      {fetching ? (
        <div className="my-10 w-full flex justify-center items-center">
          <RiLoader3Fill className="animate-spin" size={45} />
        </div>
      ) : (
        <div
          className={`flex flex-col border-2 ${comments.length > 0 ? "border-gray-200" : "border-transparent"}  } border-b-transparent mt-5`}
        >
          {comments.map((comment, index) => (
            <CommentComp comment={comment} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;
