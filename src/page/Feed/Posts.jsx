import React from "react";
import { useSocialContext } from "../../context/SocialContext";
import PostComp from "../../components/PostComp";
import InfiniteScroll from "react-infinite-scroll-component";
import ConfigFunc from "../../context/ConfigFunc";
import { RiLoader3Fill } from "react-icons/ri";

const Posts = () => {
  const { posts, totalPosts } = useSocialContext();
  const { fetchMoreFeeds } = ConfigFunc();
  return (
    <div className="mt-10 w-full">
      <h2 className="font-bold text-black text-2xl">Feed</h2>
      {posts.length > 0 ? (
        <InfiniteScroll
          className="w-full"
          dataLength={posts.length}
          next={fetchMoreFeeds}
          hasMore={posts.length !== totalPosts}
          loader={
            <div className="my-10 w-full flex justify-center items-center">
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
      ) : (
        <div className="flex w-full items-center justify-center text-xl font-medium mt-10">
          There are no posts to show!!
        </div>
      )}
    </div>
  );
};

export default Posts;
