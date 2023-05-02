import Messages from "./Messages";
import Input from "./Input";

const Chat = ({ setActive }) => {
  return (
    <div className="chat">
      <div className="chatInfo">
        <button className="go-back" onClick={() => setActive(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </button>
        <div className="option">
          <button>Clear chat</button>
          <button>More</button>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
