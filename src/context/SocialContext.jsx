import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../config/supabaseConfig";
import { checkFiles, compressFile } from "../config/utilFunc";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/FirebaseConfig";
import { useNavigate } from "react-router-dom";

const socialContext = createContext({});

export default function SocialContextProvider({ children }) {
  // HOOKS
  const [loading, setLoading] = useState(false);
  // hooks for creating new post
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState(
    JSON.parse(localStorage.getItem("postTitle")) || "",
  );

  //
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [feedViewInfo, setFeedViewInfo] = useState(null);
  const [page, setPage] = useState(1);
  // const [showConfirmPostDialog, setShowConfirmPostDialog] = useState(false);
  const [sharePostData, setSharePostData] = useState({
    showDialog: false,
    postData: null,
  });
  // hook for keep count of posts
  const [totalPosts, setTotalPosts] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  // use effect

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await registerNewUser(user);
      }
      if (!user) {
        return;
      }
    });
    return () => unSub();
  }, []);

  useEffect(() => {
    localStorage.setItem("postTitle", JSON.stringify(title));
  }, [title]);

  // Functions

  // Save New user to database
  const registerNewUser = async (user) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", user?.email)
      .limit(1);
    if (data.length === 0) {
      const { error } = await supabase.from("users").insert([
        {
          id: user?.uid,
          name: user?.displayName,
          email: user?.email,
          photoUrl: {
            fileUrl:
              "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png",
            path: null,
          },
        },
      ]);
      if (!error) {
        await registerNewUser(user);
      }
    } else {
      setUserInfo(data[0]);
      return data[0];
    }
  };

  // Save uploaded files to cloud storage
  const saveToCloudStorage = async () => {
    if (!files || files.length === 0) {
      alert("You've not uploaded any file");
      return;
    }

    if (title.length < 5) {
      alert("your title is too short!");
      return;
    }

    // check if files doesn't contain more than one Video;
    const isFileOkay = checkFiles(files);
    if (!isFileOkay) {
      alert("You can't upload more than 1 files with video");
      return;
    }

    if (files.length >= 4) {
      alert("You can't post more than 3 files");
    }

    setLoading(true);

    let fileLinks = [];
    for (let i = 0; i < files.length; i++) {
      let fileShouldUpload;
      const fileName = files[i].name + "-" + Date.now();
      if (files[i].type === "video/mp4") {
        fileShouldUpload = files[i];
      } else {
        const compressedFile = await compressFile(files[i], 700);
        fileShouldUpload = compressedFile;
      }
      // to check if the file is a video then we want the original file.
      const { data, error } = await supabase.storage
        .from("post-imgs")
        .upload(`posts/${fileName}`, fileShouldUpload);
      if (data) {
        const { data: fileUrl } = supabase.storage
          .from("post-imgs")
          .getPublicUrl(data?.path);
        fileLinks.push(fileUrl?.publicUrl);
      }
      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }
    }
    setFiles([]);
    const { data: postCreated, error: postError } = await savePosts(fileLinks);
    return { postCreated, postError };
  };

  // to save post in supabase
  const savePosts = async (fileLinks) => {
    if (fileLinks.length < 1) {
      alert("you don't have any files");
    }
    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          title: title,
          created_by: userInfo?.name,
          likes: [],
          post_url: fileLinks,
          user_id: userInfo?.id,
        },
      ])
      .select();
    return { data: data ? data : null, error: error ? error : null };
  };

  // logout
  const logoutSession = async () => {
    setUserInfo(null);
    setPosts([]);
    setUserPosts([]);
    setPage(1);
    setTotalPosts(0);
    setHasMore(true);
    navigate("/");
  };

  return (
    <socialContext.Provider
      value={{
        registerNewUser,
        saveToCloudStorage,
        setFiles,
        files,
        title,
        setTitle,
        posts,
        setPosts,
        userInfo,
        setUserInfo,
        userPosts,
        page,
        setPage,
        setUserPosts,
        feedViewInfo,
        setFeedViewInfo,
        logoutSession,
        totalPosts,
        setTotalPosts,
        hasMore,
        setHasMore,
        loading,
        setLoading,
        sharePostData,
        setSharePostData,
      }}
    >
      {children}
    </socialContext.Provider>
  );
}

export const useSocialContext = () => {
  const context = useContext(socialContext);

  // if (!context) {
  //   throw new Error("context is null");
  // }
  return context;
};
