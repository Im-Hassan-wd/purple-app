import { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import { format } from "date-fns";
// components
import Message from "./Message";

const Messages = ({ active }) => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  const now = new Date();
  // console.log(format(now, "eeee"));

  const ref = useRef();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    ref.current?.scrollIntoView({
      behavior: "auto",
    });

    return () => unsub();
  }, [data.chatId]);

  return (
    <div className="messages" ref={ref}>
      {/* {!messages && (
        <div className="new">Be the first to say Hi, don't be shy!</div>
      )} */}
      {/* <small>
        Messages and calls are end-to-encypted. No one, including Google and
        third parties, can read eligible messages as they travel between your
        phone and the phone you message.
      </small> */}
      {messages.map((m) => (
        <Message active={active} message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
