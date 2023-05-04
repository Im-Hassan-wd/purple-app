// react core
import { useState } from "react";
// react router dom
import { Link, useNavigate } from "react-router-dom";
// firebase
import {
  ActionCodeOperation,
  createUserWithEmailAndPassword,
  sendSignInLinkToEmail,
  updateProfile,
} from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

// static files
import addAvatar from "../img/addAvater.png";
import Logo from "../img/logo.png";

const Signup = () => {
  const [error, setError] = useState(null);
  const [fileName, setFilename] = useState("Add an avatar");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value.toLowerCase();
    const displayName = e.target[1].value.toLowerCase();
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    // signing in with users email & password
    try {
      if (!file.type.includes("image")) {
        setFilename("only images are allowed");
        setError("only images are valid as avatar");
      }
      if (file.type.includes("image")) {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        const storageRef = ref(storage, displayName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          (error) => {
            setError(error.message);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await updateProfile(res.user, {
                  displayName,
                  photoURL: downloadURL,
                });

                await setDoc(doc(db, "users", res.user.uid), {
                  uid: res.user.uid,
                  displayName,
                  email,
                  photoURL: downloadURL,
                });

                await setDoc(doc(db, "userChats", res.user.uid), {});

                navigate("/");
              }
            );
          }
        );
        // sendSignInLinkToEmail(auth, email, ActionCodeOperation).then(() => {
        //   window.localStorage.setItem("emailForSignIn", email);
        // });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <div className="logo">
          <img src={Logo} alt="logo" />
          <h1>Hello</h1>
        </div>
        <p>Welcome to the world largest chatting community :)</p>

        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="text" placeholder="display name" />
          <input type="password" placeholder="password" />
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) =>
              setFilename(
                e.target.value.substring(12, e.target.value.indexOf("."))
              )
            }
          />
          <label htmlFor="file">
            <img src={addAvatar} alt="add avatar" />
            <span>{fileName}</span>
          </label>
          <button>Sign up</button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
          {error && <div>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
