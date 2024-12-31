import React, { useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { IoPaperPlane } from "react-icons/io5";
import { SwiperSlide, Swiper } from "swiper/react";
import { Pagination } from "swiper/modules";
import { RiLoader3Fill } from "react-icons/ri";
import HighlighHashtags from "./HighlighHashtags";
import { useSocialContext } from "../context/SocialContext";
import VideoComp from "./VideoComp";
import { useNavigate, useSearchParams } from "react-router-dom";
import ConfigFunc from "../config/ConfigFunc";
import PropTypes from "prop-types";

const PostComp = ({ post }) => {
  const { formatTime, handlePostLikes } = ConfigFunc();
  const { setSharePostData, userInfo, loading, postAnimate } =
    useSocialContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  let dialog = searchParams.get("showDialog");
  useEffect(() => {
    setSharePostData((prev) => ({
      ...prev,
      showDialog: dialog ? Boolean(dialog) : false,
      postData: dialog ? prev.postData : null,
    }));
  }, [dialog]);
  return (
    <div className="p-5 rounded-[26px] shadow-md bg-slate-100 flex flex-col w-full">
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
          slidesPerView={post?.post_url.length > 1 ? 1.2 : 1}
          // slidesPerView={1}
          modules={[Pagination]}
          className="mySwiper overflow-hidden w-full h-[270px] sm:h-[300px]"
        >
          {post?.post_url.map((link, index) => (
            <SwiperSlide key={index}>
              {link.includes(".mp4") ? (
                <VideoComp link={link} />
              ) : (
                <img
                  src={link}
                  alt={index}
                  className="flex w-full h-full rounded-xl object-cover"
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div
          className={`flex items-center ${post?.likes.includes(userInfo?.id) ? "text-red-500 text-2xl" : "text-gray-500"}`}
        >
          <button
            disabled={loading}
            onClick={() => handlePostLikes(post?.id, post?.likes, userInfo?.id)}
          >
            <FaHeart
              className={` text-xl hover:text-red-500  ${loading && postAnimate === post?.id && "animate-ping"} `}
            />
          </button>
          {loading && <RiLoader3Fill size={25} className="animate-spin ml-1" />}
          {post?.likes.length > 0 && (
            <span className="font-bold text-lg ml-1 mt-1">
              {post?.likes.length}
            </span>
          )}
        </div>
        <button
          onClick={() => {
            setSharePostData((prev) => ({ ...prev, postData: post?.id }));
            navigate("/feed?showDialog=true");
          }}
          className="bg-gray-200 text-gray-600 flex items-center gap-1 rounded-[30px] py-2 px-5 text-lg shadow-sm hover:shadow-md transition-all hover:bg-gray-200"
        >
          <IoPaperPlane size={20} />
          Share
        </button>
      </div>
    </div>
  );
};

PostComp.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostComp;
