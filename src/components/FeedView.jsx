import React from "react";
import { useSocialContext } from "../context/SocialContext";
import { SwiperSlide, Swiper } from "swiper/react";
import { Pagination } from "swiper/modules";
import { FaHeart } from "react-icons/fa";
import { IoPaperPlane, IoClose } from "react-icons/io5";
import ConfigFunc from "../context/ConfigFunc";
import HighlighHashtags from "./HighlighHashtags";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const FeedView = () => {
  const { feedViewInfo, setFeedViewInfo } = useSocialContext();
  const location = useLocation();
  const navigate = useNavigate();
  const { formatTime } = ConfigFunc();
  return (
    <div
      className={`h-auto min-w-[300px] w-[95%] max-w-[500px] absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 z-40  transition-all`}
    >
      <div className="p-5 rounded-[26px] h-full w-full shadow-md bg-slate-100 flex flex-col">
        <button
          onClick={() => {
            setFeedViewInfo(null);
            navigate(location.pathname.replace("?feedView=true"));
          }}
          className="text-gray-500 self-end mb-3 hover:text-gray-800"
        >
          <IoClose size={30} />{" "}
        </button>
        <div className="flex items-center gap-2">
          <img
            src={feedViewInfo?.users?.photoUrl.fileUrl}
            alt={feedViewInfo?.users?.name}
            className="w-12 h-12 object-cover rounded-[50%]"
          />
          <div className="flex flex-col gap-1 text-xs">
            <h3 className="text-base font-bold">{feedViewInfo?.users?.name}</h3>
            <p className="text-gray-500">
              {formatTime(feedViewInfo?.created_at)}
            </p>
          </div>
        </div>
        <div className="mt-5">
          <HighlighHashtags title={feedViewInfo?.title} />
        </div>
        <div className="h-[200px] sm:h-[250px] flex flex-wrap gap-2 w-full mt-7">
          <Swiper
            spaceBetween={10}
            loop={false}
            centeredSlides={false}
            pagination={{
              clickable: true,
            }}
            slidesPerView={feedViewInfo?.post_url.length > 1 ? 1.5 : 1}
            slidesPerGroup={1}
            modules={[Pagination]}
            className={`mySwiper h-full w-full overflow-hidden`}
          >
            {feedViewInfo?.post_url.map((link, index) => (
              <SwiperSlide key={index} className="w-full">
                {link.includes(".mp4") ? (
                  <video
                    src={link}
                    width="100%"
                    className="w-full h-full"
                    controls
                    loop
                    autoPlay={false}
                  />
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
        <div className="mt-5 flex items-center justify-between">
          <button>
            <FaHeart className="text-gray-500 text-xl hover:text-red-500" />
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/post/${feedViewInfo?.id}`
              );
              toast.success("Post link copied to clipboard", {
                duration: 5000,
              });
            }}
            className="bg-gray-200 text-gray-600 flex items-center gap-1 rounded-[30px] py-2 px-5 text-lg shadow-sm hover:shadow-md transition-all hover:bg-gray-200"
          >
            <IoPaperPlane size={20} />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedView;
