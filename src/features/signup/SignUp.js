import React, { useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../firebase-config";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";  
import { useNavigate } from "react-router-dom";
import "../../assets/styles/ShowPassword.css";
import "../../assets/styles/Form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export const Register = ({setActive}) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    if (name && lastName && email && password) {
      try {
        const userDocRef = doc(collection(db, "users"));

        const userDocId = userDocRef.id;

        await setDoc(userDocRef, {
          uid: userDocId,
          name,
          lastName,
          email,
          password,
          roles: { admin: false, reader: true }, 
        });
        setActive("home");
        toast.success("Registrado con éxito");
        navigate("/auth/sign-in");
      } catch (error) {
        console.error("Error al crear el usuario:", error.message);
        toast.error("Error al crear la cuenta de usuario");
      }
    } else {
      return toast.error("All fields are mandatory to fill");
    }
  };

  const handleLoginClick = () => {
    navigate("/auth/sign-in");
  };

  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12 text-center">
          <div className="text-center heading py-2">Sign-Up</div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <form className="row" onSubmit={handleAuth}>
              <div className="col-6 py-3">
                <input
                  type="text"
                  className="form-control input-text-box"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-6 py-3">
                <input
                  type="text"
                  className="form-control input-text-box"
                  placeholder="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
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
                    onChange={(e) => setPasword(e.target.value)}
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
                <button className={"btn btn-sign-up"} type="submit">
                  Sign-up
                </button>
              </div>
            </form>
            <div>
              <div className="text-center justify-content-center mt-2 pt-2">
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Already have an account ?&nbsp;
                  <span
                    style={{
                      textDecoration: "none",
                      cursor: "pointer",
                      color: "#08dd04",
                    }}
                    onClick={handleLoginClick}
                  >
                    Sign In
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

export default Register;
