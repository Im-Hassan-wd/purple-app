import { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { ChatContext } from "../context/ChatContext";
// import Cam from "../img/cam.png";

const Chats = ({ setConvo, setActive }) => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = async (u) => {
    setConvo(true);
    setActive(true);

    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <>
      {chats.length !== 0 && <h2>Chats</h2>}
      <div className="chats">
        {Object.entries(chats)
          .sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <div
              className="userChat"
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              <div className="avatar-div">
                {/* {chat[1].userInfo.online && <div></div>} */}
                <img
                  src={chat[1].userInfo.photoURL}
                  alt={chat[1].userInfo.displayName}
                />
              </div>
              <div className="userChatInfo">
                <span>
                  {chat[1].userInfo.displayName.charAt(0).toUpperCase() +
                    chat[1].userInfo.displayName.slice(1)}
                </span>
                <p>{chat[1].lastMessage?.text}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Chats;
