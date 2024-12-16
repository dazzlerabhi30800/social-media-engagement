import { createContext, useContext, useState } from "react";

const socialContext = createContext();

export default function SocialContextProvider({ children }) {
  const [user, setUser] = useState(false);
  return (
    <socialContext.Provider value={{ user }}>{children}</socialContext.Provider>
  );
}

export const useSocialContext = () => {
  const context = useContext(socialContext);
  if (!context) {
    throw new Error("context is null");
  }
  return context;
};
