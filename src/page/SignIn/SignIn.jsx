import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="h-screen flex w-full justify-center items-center">
      <SignIn
        signInfallbackRedirectUrl="/"
        signUpFallbackRedirectUrl="/"
      />
    </div>
  );
};

export default SignInPage;
