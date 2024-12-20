import React from "react";
import { FaHeart } from "react-icons/fa";
import { IoPaperPlane } from "react-icons/io5";
import ConfigFunc from "../context/ConfigFunc";
import { SwiperSlide, Swiper } from "swiper/react";
import { Pagination } from "swiper/modules";
import HighlighHashtags from "./HighlighHashtags";
import { useSocialContext } from "../context/SocialContext";
import VideoComp from "./VideoComp";

const PostComp = ({ post }) => {
  const { formatTime } = ConfigFunc();
  const { setSharePostData } = useSocialContext();
  return (
    <div className="p-5 rounded-[26px] shadow-md bg-slate-100 flex flex-col">
      <div className="flex items-center gap-2">
        <img
          src={post?.users?.photoUrl?.fileUrl}
          alt={post?.users?.name}
          className="w-12 h-12 object-cover rounded-[50%]"
        />
        <div className="flex flex-col gap-1 text-xs">
          <h3 className="text-base font-bold">{post?.users?.name}</h3>
          <p className="text-gray-500">{formatTime(post?.created_at)}</p>
        </div>
      </div>
      <div className="mt-5">
        <HighlighHashtags title={post?.title} />
      </div>
      <div className="flex gap-2 w-full mt-5 overflow-hidden">
        <Swiper
          spaceBetween={10}
          loop={false}
          centeredSlides={false}
          pagination={{
            clickable: true,
          }}
          slidesPerView={post?.post_url.length > 1 ? 1.5 : 1}
          slidesPerGroup={1}
          modules={[Pagination]}
          className="mySwiper overflow-hidden w-inherit h-[270px] sm:h-[300px]"
        >
          {post?.post_url.map((link, index) => (
            <SwiperSlide key={index}>
              {link.includes(".mp4") ? (
                <VideoComp link={link} />
              ) : (
                <img
                  src={link}
                  alt={index}
                  className="w-full h-full rounded-xl object-cover"
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button>
          <FaHeart className="text-gray-500 text-xl hover:text-red-500" />
        </button>
        <button
          onClick={() =>
            setSharePostData((prev) => ({
              ...prev,
              showDialog: true,
              postData: post?.id,
            }))
          }
          className="bg-gray-200 text-gray-600 flex items-center gap-1 rounded-[30px] py-2 px-5 text-lg shadow-sm hover:shadow-md transition-all hover:bg-gray-200"
        >
          <IoPaperPlane size={20} />
          Share
        </button>
      </div>
    </div>
  );
};

export default PostComp;
