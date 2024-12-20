import React from "react";
import { useSocialContext } from "../../context/SocialContext";
import PostComp from "../../components/PostComp";
import InfiniteScroll from "react-infinite-scroll-component";
import ConfigFunc from "../../context/ConfigFunc";
import { RiLoader3Fill } from "react-icons/ri";

const Posts = () => {
  const { posts, hasMore, loading } = useSocialContext();
  const { fetchMoreFeeds } = ConfigFunc();
  return (
    <div className="mt-10">
      <h2 className="font-bold text-black text-2xl">Feed</h2>
      {posts.length > 0 ? (
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchMoreFeeds}
          hasMore={hasMore}
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
      ) : loading ? (
        <div className="my-10 w-full flex justify-center items-center">
          <RiLoader3Fill className="animate-spin" size={45} />
        </div>
      ) : (
        <div className="flex w-full items-center justify-center text-xl font-medium mt-10">
          There are no posts to show!!
        </div>
      )}
    </div>
  );
};

export default Posts;
