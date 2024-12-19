import { createContext, useContext, useState } from "react";
import { supabase } from "../config/supabaseConfig";
import { useClerk, useUser } from "@clerk/clerk-react";
import { checkFiles } from "../config/utilFunc";

const socialContext = createContext();

export default function SocialContextProvider({ children }) {
  const { user } = useUser();
  const { signOut } = useClerk();

  // HOOKS
  const [files, setFiles] = useState();
  const [title, setTitle] = useState("");
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [feedViewInfo, setFeedViewInfo] = useState(null);

  // Functions

  // Save New user to database
  const registerNewUser = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", user?.primaryEmailAddress?.emailAddress)
      .limit(1);
    if (data.length === 0) {
      const { error } = await supabase.from("users").insert([
        {
          id: user?.id,
          name: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
          photoUrl: { fileUrl: user?.imageUrl, path: null },
        },
      ]);
      if (!error) {
        await registerNewUser();
      }
    } else {
      setUserInfo(data[0]);
    }
  };

  // Save uploaded files to cloud storage
  const saveToCloudStorage = async () => {
    if (!files) {
      alert("You've not uploaded any file");
      return;
    }

    if (title.length < 5) {
      alert("your title is too short!");
      return;
    }

    const isFileOkay = checkFiles(files);
    if (!isFileOkay) {
      alert("You can't upload more than 1 video files");
      return;
    }

    if (files.length >= 4) {
      alert("You can't post more than 3 files");
    }

    // check if files doesn't contain more than one Video;

    let fileLinks = [];
    for (let i = 0; i < files.length; i++) {
      const fileName = files[i].name + "-" + Date.now();
      const { data, error } = await supabase.storage
        .from("post-imgs")
        .upload(`posts/${fileName}`, files[i]);
      if (data) {
        const { data: fileUrl } = supabase.storage
          .from("post-imgs")
          .getPublicUrl(data?.path);
        fileLinks.push(fileUrl?.publicUrl);
      }
      if (error) {
        console.log(error);
      }
    }
    setFiles();
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
          created_by: user?.fullName,
          user_photo: user?.imageUrl,
          likes: [],
          post_url: fileLinks,
          user_id: user?.id,
        },
      ])
      .select();
    return { data: data ? data : null, error: error ? error : null };
  };

  // logout
  const logoutSession = async () => {
    await signOut({ redirectUrl: "/" });
    setUserInfo([]);
    setPosts([]);
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
        setUserPosts,
        feedViewInfo,
        setFeedViewInfo,
        logoutSession,
      }}
    >
      {children}
    </socialContext.Provider>
  );
}

export const useSocialContext = () => {
  const context = useContext(socialContext);

  if (!context) {
    throw new Error("context is null");
  }
  return context;
};
