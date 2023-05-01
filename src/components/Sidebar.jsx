import Search from "./Search";
import Navbar from "./Navbar";
import Chats from "./Chats";

const Sidebar = ({ setConvo, setActive }) => {
  return (
    <div className="sidebar">
      <Search setConvo={setConvo} />
      <Chats setConvo={setConvo} setActive={setActive} />
    </div>
  );
};

export default Sidebar;
