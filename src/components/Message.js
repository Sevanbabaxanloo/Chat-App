import React from "react";
import { auth } from "../firebase";

const style = {
  messageContainer: `flex items-center justify-between max-h-[87vh] px-[20px] max-md:px-[10px] max-sm:px-[5px]`,
  messageSent: `text-white float-right font-[Montserrat] text-left`,
  messageReceived: `text-white float-right font-[Montserrat] text-left`,
  nameContainerSent: `bg-[#6E6E6E] max-w-[40%] text-gray-300 text-xs rounded-[10px] py-[12px] px-[18px] float-right w-content flex items-start flex-col gap-[4px] max-md:max-w-[70%] max-sm:max-w-[100%]`,
  nameContainerReceived: `bg-[#019A5A] max-w-[40%] text-gray-300 text-xs rounded-[10px] py-[12px] px-[18px] float-left w-content flex items-start flex-col gap-[4px] max-md:max-w-[70%] max-sm:max-w-[100%]`,
  name: `text-white text-[12px] font-[700] font-[Montserrat]`,
};

const Message = ({ message }) => {
  const { timestamp } = message;
  const formattedTime = new Date(timestamp?.toDate()).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isSender = message.uid === auth.currentUser.uid;

  const messageClass = isSender ? style.messageSent : style.messageReceived;
  const nameContainerClass = isSender
    ? style.nameContainerSent
    : style.nameContainerReceived;

  return (
    <div className={`${style.messageContainer}`}>
      <div className="w-full">
        <div className={nameContainerClass}>
          <p className={style.name}>{message.name}</p>
          <p className={`${messageClass}`}>{message.text}</p>
          <small>{formattedTime}</small>
        </div>
      </div>
    </div>
  );
};

export default Message;
