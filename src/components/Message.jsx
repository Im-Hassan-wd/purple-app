import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const date = new Date(message.date.seconds * 1000);
  let hours = date.getHours(); // gives the value in 24 hours format
  let minutes = date.getMinutes();

  let suf = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;

  let finalTime = hours + ":" + minutes + " " + suf;

  const ref = useRef();

  // useEffect(() => {
  //   ref.current?.scrollIntoView({
  //     behavior: "smooth",
  //   });
  // }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      {message.senderId === data.user.uid && (
        <div className="messageInfo">
          <div className="avatar-div">
            <img
              src={
                message.senderId === currentUser.uid
                  ? currentUser.photoURL
                  : data.user.photoURL
              }
              alt="avatar"
            />
          </div>
          <span>{finalTime}</span>
        </div>
      )}
      <div className="messageContent">
        {message.text && <p>{message.text}</p>}
        {message.photo && <img src={message.photo} alt="photo" />}
      </div>
    </div>
  );
};

export default Message;
