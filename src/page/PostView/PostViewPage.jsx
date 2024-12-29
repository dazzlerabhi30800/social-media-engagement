import React, { useEffect, useState } from "react";
import { RiLoader3Fill } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import PostComp from "../../components/PostComp";
import ConfigFunc from "../../config/ConfigFunc";
import { FaArrowLeftLong } from "react-icons/fa6";

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
      className={`${paddingStyles} w-full flex flex-col gap-10 h-fit flex-1 overflow-hidden`}
    >
      <Link to="/" className="bg-darkGrey p-3 w-fit rounded-[50%] text-white hover:bg-gray-600">
        <FaArrowLeftLong size={17} />
      </Link>
      <PostComp post={postInfo} />
    </div>
  );
};

export default PostViewPage;
