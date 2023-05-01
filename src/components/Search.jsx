import { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Search = ({ setConvo }) => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async (e) => {
    e.preventDefault();

    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    console.log(q);

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSelect = async () => {
    setConvo(true);
    // check whether chats exists
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        // create a chat in collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // create user chat
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            online: user.online,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            online: user.online,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      setError(err.message);
    }
    setUser(null);
    setUsername("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.0}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>

        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Find a user"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </form>
      </div>
      {error && <div>User not found!</div>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <div className="avatar-div">
            <img src={user.photoURL} alt={user.displayName} />
          </div>
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
