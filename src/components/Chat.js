import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { db } from "../firebase";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import Da from "../image/arrowdown.svg";

const style = {
  main: `flex flex-col gap-2 mt-[40px] mx-[80px] max-h-[60vh] overflow-y-auto scrollbar scrollbar-thumb-[#019A5A] scrollbar-track-[#6E6E6E] scrollbar-thin max-xl:mx-[40px] max-md:my-[20px] max-md:mx-[20px] max-sm:my-[10px] max-sm:mx-[10px]`,
};

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [isNewMessage, setIsNewMessage] = useState(false);
  const scroll = useRef();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let newMessages = [];
      querySnapshot.forEach((doc) => {
        newMessages.push({ ...doc.data(), id: doc.id });
      });

      if (!isInitialLoad.current && newMessages.length > messages.length) {
        setIsNewMessage(true);
      } else {
        isInitialLoad.current = false;
      }

      setMessages(newMessages);
    });

    const isScrolledToBottom = () => {
      const { scrollTop, scrollHeight, clientHeight } = scroll.current;
      return scrollTop + clientHeight >= scrollHeight;
    };

    const onScroll = () => {
      if (isScrolledToBottom()) {
        setIsNewMessage(false);
      }
    };

    const currentScroll = scroll.current;
    currentScroll.addEventListener("scroll", onScroll);

    return () => {
      unsubscribe();
      currentScroll.removeEventListener("scroll", onScroll);
    };
  }, [messages]);

  const hideNotification = () => {
    setIsNewMessage(false);
  };

  return (
    <>
      <main className={style.main} onClick={hideNotification} ref={scroll}>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </main>
      <div className={isNewMessage ? "" : "hidden"}>
        <div className="w-full flex justify-center items-center gap-[24px]">
          <div className="w-[20vw] h-[1px] bg-gradient-to-r from-transparent to-[#019A5A]"></div>
          <div className="flex items-center">
            <div className="text-[#fff] text-[12px] font-[montserrat] font-[500] text-opacity-45">
              New Message
            </div>
            <img src={Da} alt="Arrow Down" />
          </div>
          <div className="w-[20vw] h-[1px] bg-gradient-to-r from-[#019A5A] to-transparent"></div>
        </div>
      </div>
      <SendMessage scroll={scroll} />
    </>
  );
};

export default Chat;
