import React, { useEffect, useState } from "react";
import { useSocialContext } from "../../context/SocialContext";
import ConfigFunc from "../../context/ConfigFunc";
import { SwiperSlide, Swiper } from "swiper/react";
import { Pagination } from "swiper/modules";
import HighlighHashtags from "../../components/HighlighHashtags";
import { FaArrowLeft } from "react-icons/fa";
import { RiLoader3Fill } from "react-icons/ri";

const ConfirmCreatePost = ({ handleAddPost }) => {
  const {
    title,
    files,
    showConfirmPostDialog,
    setShowConfirmPostDialog,
    loading,
  } = useSocialContext();
  const { paddingStyles } = ConfigFunc();
  return (
    <div
      className={`w-full flex-1 h-inherit gap-10 ${paddingStyles} ${
        showConfirmPostDialog ? "flex flex-col z-40 justify-between" : "hidden"
      } absolute top-0 left-0 h-full w-full bg-white`}
    >
      <div className="flex flex-col gap-6 w-full">
        <button onClick={() => setShowConfirmPostDialog(false)}>
          <FaArrowLeft />
        </button>
        {files.length > 0 && (
          <div className="w-full">
            <Swiper
              spaceBetween={10}
              loop={false}
              centeredSlides={false}
              pagination={{
                clickable: true,
              }}
              slidesPerView={1}
              slidesPerGroup={1}
              modules={[Pagination]}
              className="mySwiper h-[270px] sm:h-[300px] w-full overflow-hidden"
            >
              {files?.map((file, index) => (
                <SwiperSlide key={index} className="w-full">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={index}
                    className="w-full h-full rounded-xl object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
        <h3 className="w-full rounded-xl p-4 bg-slate-200">
          <HighlighHashtags title={title} />
        </h3>
      </div>
      <button
        onClick={handleAddPost}
        disabled={loading}
        className="flex items-center gap-5 justify-center py-3 px-6 rounded-[30px] bg-darkGrey text-white w-full text-lg hover:bg-gray-700 disabled:opacity-70"
      >
        {loading && <RiLoader3Fill className="animate-spin" size={30} />}
        Create Post
      </button>
    </div>
  );
};

export default ConfirmCreatePost;
