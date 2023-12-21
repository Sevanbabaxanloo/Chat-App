// Message.js
import React from "react";
import { auth } from "../firebase";

const style = {
  messageContainer: `flex items-center justify-between py-2 px-3 max-h-[87vh]`,
  messageSent: `bg-[#395dff] text-white float-right rounded-full p-4`,
  messageReceived: `bg-[#e5e5ea] text-black float-left rounded-full p-4`,
  nameContainerSent: `text-gray-600 text-xs px-3 py-2 float-left`,
  nameContainerReceived: `text-gray-600 text-xs px-3 py-2 float-right`,
  form: `p-2`,
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
      <div className={nameContainerClass}>
        <p>{message.name}</p>
        <small> {formattedTime}</small>
      </div>
      <div className={style.form}>
        <p className={`${messageClass}`}>{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
