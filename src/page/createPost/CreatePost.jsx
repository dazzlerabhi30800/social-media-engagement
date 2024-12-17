import { FaArrowLeft, FaCamera, FaFile } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSocialContext } from "../../context/SocialContext";

const CreatePost = () => {
  const { saveToCloudStorage, files, setFiles, title, setTitle } =
    useSocialContext();
  const navigate = useNavigate();

  // save post

  const handleAddPost = async () => {
    if (!files) return;
    const { postError: error } = await saveToCloudStorage();
    if (!error) {
      navigate("/feed");
    }
    if (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full relative">
      <div className="flex items-center gap-5 text-black">
        <Link to={"/feed"}>
          <FaArrowLeft />
        </Link>
        <h2 className="font-bold text-xl">New Post</h2>
      </div>
      <div className="flex flex-col mt-10 flex-1">
        <textarea
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What's on your mind?"
          rows={8}
          className="bg-red-100 rounded-md p-4 w-full placeholder:text-gray-600"
        />
        {/* Buttons Wrapper */}
        <div className="flex flex-col mt-12 gap-8 text-xl font-bold">
          <div className="w-full">
            <input
              onChange={(e) => setFiles(e.target.files)}
              type="file"
              multiple
              id="files"
              className="hidden"
            />
            <label
              htmlFor="files"
              className="flex items-center gap-4 text-black cursor-pointer"
            >
              <FaFile size={25} className="text-red-400" />{" "}
              {files ? files.length + " files" : "Choose the file"}
            </label>
          </div>
          <div className="w-full">
            <input
              type="file"
              id="cameraFile"
              accept="image/*;capture=camera"
              capture="environment"
              className="hidden"
              onChange={(e) => setFiles(e.target.files)}
            />
            <label
              htmlFor="cameraFile"
              className="flex items-center gap-4 text-black cursor-pointer"
            >
              <FaCamera size={25} className="text-blue-400" />{" "}
              {files && files.length > 0
                ? files.length + " files"
                : "Choose from Camera"}
            </label>
          </div>
        </div>
        <button
          onClick={files && handleAddPost}
          className="absolute bottom-0 mb-auto p-3 bg-black text-white w-full hover:bg-gray-800 rounded-3xl shadow-md font-bold md:text-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
