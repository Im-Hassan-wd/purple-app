import Search from "./Search";
import Chats from "./Chats";
import Navbar from "./Navbar";

const Sidebar = ({ setConvo, setActive }) => {
  return (
    <div className="sidebar">
      <Navbar />
      <Search setConvo={setConvo} />
      <Chats setConvo={setConvo} setActive={setActive} />
    </div>
  );
};

export default Sidebar;
