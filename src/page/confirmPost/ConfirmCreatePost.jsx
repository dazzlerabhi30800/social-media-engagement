import React from "react";
import { useSocialContext } from "../../context/SocialContext";
import { SwiperSlide, Swiper } from "swiper/react";
import { Pagination } from "swiper/modules";
import HighlighHashtags from "../../components/HighlighHashtags";
import { FaArrowLeft, FaFile, FaTrash } from "react-icons/fa";
import { RiLoader3Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ConfigFunc from "../../config/ConfigFunc";

const ConfirmCreatePost = () => {
  const {
    title,
    files,
    loading,
    setFiles,
    setLoading,
    saveToCloudStorage,
    setTitle,
  } = useSocialContext();
  const { paddingStyles, fetchFeed } = ConfigFunc();
  const navigate = useNavigate();
  const handleRemoveFiles = (index) => {
    const fileArr = [...files];
    fileArr.splice(index, 1);
    setFiles(fileArr);
  };

  const handleAddPost = async () => {
    if (!files || files.length === 0) {
      toast.error(
        "You have no files to upload. Please select at least one file!!",
      );
    }
    const { postError: error } = await saveToCloudStorage();
    if (!error) {
      toast.success("Post Created", {
        duration: 5000,
      });
      await fetchFeed();
      setLoading(false);
      setTitle("");
      navigate("/feed");
    }
    if (error) {
      alert(error.message);
      setLoading(false);
    }
  };
  return (
    <div
      className={`flex flex-col flex-1 w-full h-inherit gap-10 ${paddingStyles} justify-between bg-white`}
    >
      <div className="flex flex-col gap-6 w-full">
        <button onClick={() => navigate(-1)}>
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
                  {file.type.includes("video") ? (
                    <div className="relative h-full w-full">
                      <video
                        src={URL.createObjectURL(file)}
                        width="100%"
                        className="w-full h-full rounded-xl object-cover"
                        controls
                        loop
                        autoPlay={false}
                      />
                      <button
                        onClick={() => handleRemoveFiles(index)}
                        className="absolute bottom-3 right-3 bg-black/60 rounded-[50%] p-2 text-lg text-white"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ) : (
                    <div className="h-full w-full relative">
                      <span className="absolute top-5 right-5 text-sm font-bold text-black bg-white py-1 px-3 rounded-2xl">
                        {index + 1}/{files.length}
                      </span>
                      <img
                        src={URL.createObjectURL(file)}
                        alt={index}
                        className="w-full h-full rounded-xl object-cover"
                      />
                      <button
                        onClick={() => handleRemoveFiles(index)}
                        className="absolute bottom-3 right-3 bg-black/60 rounded-[50%] p-2 text-lg text-white"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
        {files.length === 1 && files[0].type.includes("video") ? (
          <span>You can't upload files</span>
        ) : (
          files.length !== 3 && (
            <div className="w-full">
              <input
                onChange={(e) => {
                  const newFiles = e.target.files;
                  const filesArr = [...files];
                  for (let i = 0; i < newFiles.length; i++) {
                    filesArr.push(newFiles[i]);
                  }
                  if (filesArr.length > 3) {
                    alert("you can't upload more than 3 image files!!");
                    return;
                  }
                  setFiles(filesArr);
                }}
                type="file"
                multiple
                id="updateFiles"
                className="hidden"
              />
              <label
                htmlFor="updateFiles"
                className="flex items-center gap-4 text-black cursor-pointer"
              >
                <FaFile size={25} className="text-red-400" />{" "}
                {files.length > 0
                  ? files.length < 3
                    ? files.length +
                      ` files, ${3 - files.length} more can be added`
                    : "You can't add more files"
                  : "Choose the file"}
              </label>
            </div>
          )
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
