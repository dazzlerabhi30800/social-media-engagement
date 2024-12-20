import { FaArrowLeft, FaCamera, FaFile } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSocialContext } from "../../context/SocialContext";
import ConfigFunc from "../../context/ConfigFunc";
import ConfirmCreatePost from "../confirmPost/ConfirmCreatePost";

const CreatePost = () => {
  const {
    saveToCloudStorage,
    files,
    setFiles,
    title,
    setTitle,
    setShowConfirmPostDialog,
    showConfirmPostDialog,
    setLoading,
  } = useSocialContext();
  const { paddingStyles } = ConfigFunc();
  const navigate = useNavigate();

  // save post

  const handleAddPost = async () => {
    if (!files || files.length === 0) return;
    const { postError: error } = await saveToCloudStorage();
    if (!error) {
      navigate("/feed");
      setLoading(false);
    }
    if (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <div className={`${paddingStyles} w-full flex relative`}>
      <div className={`flex flex-col gap-1 w-full relative`}>
        <div className="flex items-center gap-5 text-black">
          <button onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </button>
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
                onChange={(e) => {
                  const newFiles = e.target.files;
                  const filesArr = [];
                  for (let i = 0; i < newFiles.length; i++) {
                    filesArr.push(newFiles[i]);
                  }
                  console.log(filesArr);
                  setFiles(filesArr);
                }}
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
                onChange={(e) => {
                  const newFiles = e.target.files;
                  const filesArr = [];
                  for (let i = 0; i < newFiles.length; i++) {
                    filesArr.push(newFiles[i]);
                  }
                  console.log(filesArr);
                  setFiles(filesArr);
                }}
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
            onClick={() => setShowConfirmPostDialog(true)}
            className="absolute bottom-0 mb-auto p-3 bg-black text-white w-full hover:bg-gray-800 rounded-3xl shadow-md font-bold md:text-lg"
          >
            Submit
          </button>
        </div>
      </div>
      {showConfirmPostDialog && (
        <ConfirmCreatePost handleAddPost={handleAddPost} />
      )}
    </div>
  );
};

export default CreatePost;
