import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="h-screen flex w-full justify-center items-center">
      <SignIn fallbackRedirectUrl="/feed" signUpFallbackRedirectUrl="/feed" />
    </div>
  );
};

export default SignInPage;
