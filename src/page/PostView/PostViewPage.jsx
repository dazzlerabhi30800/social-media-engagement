import React, { useEffect, useState } from "react";
import { RiLoader3Fill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import PostComp from "../../components/PostComp";
import ConfigFunc from "../../config/ConfigFunc";

const PostViewPage = () => {
  const { paddingStyles, getPost } = ConfigFunc();
  const [postInfo, setPostInfo] = useState();
  const { postId } = useParams();

  useEffect(() => {
    postId && fetchPostInfo();
  }, [postId]);

  const fetchPostInfo = async () => {
    const { data, error } = await getPost(postId);
    if (data) {
      setPostInfo(data[0]);
    }
    if (error) {
      console.log(error);
    }
  };

  if (!postInfo)
    return (
      <div className="flex w-full items-center justify-center mt-20 text-black">
        <RiLoader3Fill className="animate-spin" size={30} />
      </div>
    );
  return (
    <div
      className={`${paddingStyles} w-full flex flex-1 mt-10 overflow-hidden`}
    >
      <PostComp post={postInfo} />
    </div>
  );
};

export default PostViewPage;
