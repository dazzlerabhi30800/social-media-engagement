import React from "react";
import { useSocialContext } from "../../context/SocialContext";
import PostComp from "../../components/PostComp";

const Posts = () => {
  const { posts } = useSocialContext();
  return (
    <div className="mt-10">
      <h2 className="font-bold text-black text-2xl">Feed</h2>
      <div className="flex flex-col gap-10 mt-8">
        {posts?.map((post, index) => (
          <PostComp post={post} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
