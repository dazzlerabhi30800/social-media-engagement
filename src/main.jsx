import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import SocialContextProvider from "./context/SocialContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import "swiper/css";
import "swiper/css/pagination";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env.local file");
}
console.log(PUBLISHABLE_KEY);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      signInFallbackRedirectUrl={"/feed"}
      afterSignOutUrl="/"
    >
      <BrowserRouter>
        <SocialContextProvider>
          <App />
        </SocialContextProvider>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
);
