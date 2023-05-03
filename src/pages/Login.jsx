import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";

//static files
import Logo from "../img/logo.png";

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value.toLowerCase();
    const password = e.target[1].value;

    // loging in with users email & password
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);

      await updateDoc(doc(db, "users", res.user.uid), {
        online: true,
      });

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <div className="logo">
          <img src={Logo} alt="logo" />
          <h1>Hello Again!</h1>
        </div>
        <p>Welcome back, you've been missed</p>

        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" required />
          <input type="password" placeholder="password" required />
          <button>Login</button>
          {error && <div>{error}</div>}
        </form>
        <p className="nav">
          You don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
