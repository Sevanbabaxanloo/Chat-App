import React from "react";
import { auth } from "../firebase";
import { FaPowerOff } from "react-icons/fa";

const style = {
  button: `text-red-500 flex gap-2 items-center cursor-pointer`,
};

const LogOut = () => {
  const signOut = () => {
    signOut(auth);
  };

  return (
    <button onClick={() => auth.signOut()} className={style.button}>
      <FaPowerOff />
      Log out
    </button>
  );
};

export default LogOut;
