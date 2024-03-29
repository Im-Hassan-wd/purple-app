import Logo from "../img/logo.png";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { useContext, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
const Navbar = () => {
  const [show, setShow] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleSignOut = async () => {
    await updateDoc(doc(db, "users", currentUser.uid), {
      online: false,
    });

    // log user out
    signOut(auth);
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src={Logo} alt="logo" />
        <span>PurpleAPP</span>
      </div>
      {/* <div className="user">
        <img src={currentUser.photoURL} alt="avatar" />
        <span>{currentUser.displayName}</span>
      </div> */}
      <div className="bell" onClick={() => setShow(!show)}>
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
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>
        <div className="noti"></div>
        {show && (
          <div className="more">
            <button onClick={handleSignOut}>logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
