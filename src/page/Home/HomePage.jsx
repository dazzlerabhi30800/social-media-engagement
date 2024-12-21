// import { Link } from "react-router-dom";
import { useSignIn } from "@clerk/clerk-react";

const Home = () => {
  const { signIn, isLoaded } = useSignIn();
  const signInWithGoogle = () => {
    if (!isLoaded) return;
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/",
    });
  };
  return (
    <div className="h-screen relative bg-[url('/banner.png')] bg-center bg-cover md:bg-[length:100%_180%] md:bg-no-repeat w-full bg-red-200 text-darkGrey">
      {/* Google Signin Comp */}
      <div className="absolute bottom-0 shadow-md rounded-t-[70px] sm:rounded-t-[100px] bg-white p-6 sm:p-9 h-[300px] w-full flex flex-col gap-8 items-center">
        <div className="flex flex-col gap-2 items-center">
          <div className="flex items-center gap-2">
            <img
              src="./logo.png"
              alt="Vibemax"
              className="w-[60px] h-[60px] object-contain"
            />
            <h1 className="text-3xl font-bold">Vibemax</h1>
          </div>
          <p className="text-lg font-semibold text-center">
            Moments That Matter, Shared Forever.
          </p>
        </div>
        {/* <Link */}
        {/*   to="/sign-in" */}
        {/*   className="flex items-center gap-3 bg-darkGrey rounded-[30px] p-3 px-8 text-white font-semibold hover:brightness-125" */}
        {/* > */}
        {/*   <img src="./google.png" alt="google" /> */}
        {/*   Continue with Google */}
        {/* </Link> */}
        <button
          onClick={signInWithGoogle}
          className="flex items-center gap-3 bg-darkGrey rounded-[30px] p-3 px-8 text-white font-semibold hover:brightness-125"
        >
          <img src="./google.png" alt="google" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Home;
