import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FiSend } from "react-icons/fi";

const style = {
  form: `h-14 w-[50vw] flex text-xl rounded-[16px] border-[1px] border-white border-opacity-30 items-center space-x-2 px-4`,
  input: `w-full text-xl p-3 bg-transparent text-white outline-none border-none`,
  button: `w-[40px] h-[40px] bg-[#019A5A] text-gray-300 flex items-center justify-center rounded-[10px]`,
  container: `w-full flex justify-center items-center my-[20px] max-md:my-[10px]`,
  sendContainer: `w-[52vw] h-[56px] flex items-center justify-center  `,
};

const SendMessage = ({ scroll }) => {
  const [input, setInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Please enter a valid message");
      return;
    }
    setIsSubmitting(true); 
    const { uid, displayName } = auth.currentUser;
    try {
      await addDoc(collection(db, "messages"), {
        text: input,
        name: displayName,
        uid,
        timestamp: serverTimestamp(),
      });
      setInput("");
      scroll.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error sending message: ", error);
      alert("Error sending message");
    }
    setIsSubmitting(false);
  };

  return (
    <div className={style.container}>
      <div className={style.sendContainer}>
        <form onSubmit={sendMessage} className={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={style.input}
            type="text"
            placeholder="Message"
            disabled={isSubmitting}
          />
          <button
            className={style.button}
            type="submit"
            disabled={isSubmitting}
          >
            <FiSend size={24} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendMessage;
