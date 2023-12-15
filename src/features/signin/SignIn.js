import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase-config";
import { useNavigate} from "react-router-dom";

export const Login = ({ setActive }) => {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");

  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    if (email && password) {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      setActive("home");
      navigate("/home"); 
    } else {
      return toast.error("All fields are mandatory to fill");
    }
    navigate("/");
  };

  const handleLick = () => {
    navigate("/auth/sign-up"); 
  };

  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12 text-center">
          <div className="text-center heading py-2">Sign-In</div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <form className="row" onSubmit={handleAuth}>
              <div className="col-12 py-3">
                <input
                  type="email"
                  className="form-control input-text-box"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="col-12 py-3">
                <input
                  type="password"
                  className="form-control input-text-box"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPasword(e.target.value)}
                />
              </div>
              <div className="col-12 py-3 text-center">
                <button className="btn btn-sign-in" type="submit">
                  Sign-in
                </button>
              </div>
            </form>
            <div>
              <div className="text-center justify-content-center mt-2 pt-2">
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account ?&nbsp;
                  <span
                    className="link-danger"
                    style={{ textDecoration: "none", cursor: "pointer" }}
                    onClick={handleLick}
                  >
                    Sign Up
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;