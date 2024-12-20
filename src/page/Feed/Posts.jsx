import React from "react";
import { useSocialContext } from "../../context/SocialContext";
import PostComp from "../../components/PostComp";
import InfiniteScroll from "react-infinite-scroll-component";
import ConfigFunc from "../../context/ConfigFunc";
// import Spinner from "../../components/Spinner";
import { RiLoader3Fill } from "react-icons/ri";

const Posts = () => {
  const { posts, hasMore } = useSocialContext();
  const { fetchMoreFeeds } = ConfigFunc();
  return (
    <div className="mt-10">
      <h2 className="font-bold text-black text-2xl">Feed</h2>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreFeeds}
        hasMore={hasMore}
        loader={
          <div className="my-10 w-full flex justify-center items-center font-semibold text-lg">
            <RiLoader3Fill className="animate-spin" size={45} />
          </div>
        }
      >
        <div className="flex flex-col gap-10 mt-8">
          {posts?.map((post, index) => (
            <PostComp post={post} key={index} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Posts;
