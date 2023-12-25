import React from "react";
import { auth } from "../firebase";

const style = {
  messageContainer: `flex items-center justify-between max-h-[87vh] px-[20px]`,
  messageSent: `text-white float-right flex flex-col gap-1`,
  messageReceived: `text-white float-right`,
  nameContainerSent: `bg-[#6E6E6E] text-gray-300 text-xs rounded-[10px] py-[12px] px-[18px] float-right w-content flex items-start flex-col`,
  nameContainerReceived: `bg-[#019A5A] text-gray-300 text-xs rounded-[10px] py-[12px] px-[18px] float-left w-content flex items-start flex-col`,
  name: `text-white text-[12px] font-[700]`,
};

const Message = ({ message }) => {
  const { timestamp } = message;
  const formattedTime = new Date(timestamp?.toDate()).toLocaleTimeString();

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
