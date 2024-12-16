import { SignIn, SignUp } from "@clerk/clerk-react";
import React from "react";

const SignInPage = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <SignIn fallbackRedirectUrl="/feed" signUpFallbackRedirectUrl="/feed" />
    </div>
  );
};

export default SignInPage;
