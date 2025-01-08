import React, { useEffect, useState } from "react";
import CommentComp from "./CommentComp";
import CommentInput from "./CommentInput";
import { RiLoader3Fill } from "react-icons/ri";
import HighOrderComment from "./HighOrderComment";
import PropTypes from "prop-types";
import CommentFuncs from "../config/CommentFuncs";

const Comments = ({ id, fetchFunc }) => {
  const [comments, setComments] = useState([]);
  const [fetching, setFetching] = useState(fetchFunc ? true : false);
  const { postComment } = CommentFuncs();
  useEffect(() => {
    fetching &&
      fetchFunc &&
      fetchFunc(id).then((res) => {
        setComments(res);
        setFetching(false);
      });
  }, [fetching]);
  return (
    <div className="mt-5 flex flex-col w-full flex-1">
      <CommentInput
        id={id}
        setFetching={setFetching}
        fetching={fetching}
        postCommentFunc={postComment}
      />
      {fetching && comments.length < 1 ? (
        <div className="my-10 w-full flex justify-center items-center">
          <RiLoader3Fill className="animate-spin" size={45} />
        </div>
      ) : (
        <div
          className={`flex flex-col border-2 ${
            comments.length > 0 ? "border-gray-200" : "border-transparent"
          }  } border-b-transparent mt-5`}
        >
          {comments.map((comment, index) => (
            <CommentComp
              fetching={fetching}
              setFetching={setFetching}
              showReplyBtn={true}
              comment={comment}
              key={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

Comments.propTypes = {
  id: PropTypes.string,
  fetchFunc: PropTypes.func,
};

export default HighOrderComment(Comments);
