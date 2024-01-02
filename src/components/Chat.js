import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { db } from "../firebase";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";

const style = {
  main: `flex flex-col gap-2 mt-[40px] mx-[80px] max-h-[60vh] overflow-y-auto scrollbar scrollbar-thumb-[#019A5A] scrollbar-track-[#6E6E6E] scrollbar-thin max-md:my-[20px] max-md:mx-[20px] max-sm:my-[10px] max-sm:mx-[10px]`,
};

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <main className={style.main}>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        <span ref={scroll}></span>
      </main>
      <SendMessage scroll={scroll} />
    </>
  );
};

export default Chat;
