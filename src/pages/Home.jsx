import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import { useState } from "react";
// import { ChatContext } from "../context/ChatContext";
import Navbar from "../components/Navbar";

const Home = () => {
  ///
  const [convo, setConvo] = useState(false);
  const [active, setActive] = useState(true);

  return (
    <div className="home">
      <Navbar />
      <div className="container">
        <Sidebar setConvo={setConvo} setActive={setActive} />
        {convo ? (
          active && <Chat convo={convo} setActive={setActive} />
        ) : (
          <h3>Choose a chat to start the conversation</h3>
        )}
      </div>
    </div>
  );
};

export default Home;
