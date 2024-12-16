import { createContext, useContext, useState } from "react";
import { supabase } from "../config/supabaseConfig";
import { useUser } from "@clerk/clerk-react";

const socialContext = createContext();

export default function SocialContextProvider({ children }) {
  const { user } = useUser();
  console.log(user);

  const registerNewUser = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("email")
      .eq("email", user?.primaryEmailAddress?.emailAddress);
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
  return (
    <socialContext.Provider value={{ registerNewUser }}>
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
