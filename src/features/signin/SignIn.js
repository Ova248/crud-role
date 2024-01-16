import React, { useState } from "react";
import "../../assets/styles/ShowPassword.css";
import "../../assets/styles/Form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { Link } from "react-router-dom";

export const Login = () => {
  const { handleLogin, setEmail, setPassword, email, password } = useGlobalContext();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12 text-center">
          <div className="text-center heading py-2">Sign-In</div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <form className="row" onSubmit={handleLogin}>
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
                <div className="password-toggle-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control input-text-box"
                    placeholder="Contraseña"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="password-toggle-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </span>
                </div>
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
                  <Link to="/auth/sign-up">
                    <span
                      className="link-danger"
                      style={{ textDecoration: "none", cursor: "pointer" }}
                    >
                      Sign Up
                    </span>
                  </Link>
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
