import { auth, provider } from "../../config/FirebaseConfig";
import { signInWithPopup, signOut } from "firebase/auth";
import { useSocialContext } from "../../context/SocialContext";
import { useNavigate } from "react-router-dom";
import { RiLoader3Fill } from "react-icons/ri";

const Home = () => {
  const { userInfo, loading } = useSocialContext();
  const navigate = useNavigate();
  const googleAuth = async () => {
    await signInWithPopup(auth, provider).then((_) => navigate("/feed"));
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
        <button
          disabled={loading}
          onClick={googleAuth}
          className="flex items-center gap-3 bg-darkGrey rounded-[30px] p-3 px-8 text-white font-semibold hover:brightness-125 disabled:opacity-70"
        >
          <img src="./google.png" alt="google" />
          {loading ? (
            <RiLoader3Fill className="animate-spin text-2xl" />
          ) : (
            "Continue with Google"
          )}
        </button>
      </div>
    </div>
  );
};

export default Home;
