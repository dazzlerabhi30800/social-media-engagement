import { createContext, useContext, useState } from "react";
import { supabase } from "../config/supabaseConfig";
import { useUser } from "@clerk/clerk-react";
import { checkFiles } from "../config/utilFunc";

const socialContext = createContext();

export default function SocialContextProvider({ children }) {
  const { user } = useUser();
  const [filesPath, setFilesPath] = useState([]);
  const [files, setFiles] = useState();

  // Save New user to database
  const registerNewUser = async () => {
    const { data } = await supabase
      .from("users")
      .select("email")
      .eq("email", user?.primaryEmailAddress?.emailAddress)
      .limit(1);
    if (data.length === 0) {
      let { data, error } = await supabase.from("users").insert([
        {
          id: user?.id,
          name: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
          photoUrl: user?.imageUrl,
        },
      ]);
      console.log(error);
    }
  };

  // Save uploaded files to cloud storage
  const saveToCloudStorage = async () => {
    if (!files) {
      alert("You've not uploaded any file");
      return;
    }

    const isFileOkay = checkFiles(files);
    if (!isFileOkay) {
      alert("You can't upload more than 1 video files");
      return;
    }

    // check if files doesn't contain more than one Video;

    let fileLinks = [];
    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
      const fileName = files[i].name;
      const { data, error } = await supabase.storage
        .from("post-imgs")
        .upload(`posts/${fileName}`, files[i]);
      console.log(data);
      if (data) {
        // alert(error);
        const { data: fileUrl } = supabase.storage
          .from("post-imgs")
          .getPublicUrl(data?.path);
        // console.log(fileUrl?.publicUrl);
        fileLinks.push(fileUrl?.publicUrl);
      }
      if (error) {
        consle.log(error);
      }
    }
    setFilesPath(fileLinks);
    setFiles();
  };
  console.log(files);

  return (
    <socialContext.Provider
      value={{ registerNewUser, saveToCloudStorage, setFiles, files }}
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
