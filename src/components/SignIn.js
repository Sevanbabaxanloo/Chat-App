import React from "react";
import GoogleButton from "react-google-button";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

const style = {
  wrapper: `flex justify-center cursor-pointer`,
};

const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider);
  console.log("clicked");
};

const SignIn = () => {
  return (
    <div className={`${style.wrapper} google-button-container`}>
      <GoogleButton
        className="google-button google-span google-svg"
        onClick={googleSignIn}
      />
    </div>
  );
};

export default SignIn;
