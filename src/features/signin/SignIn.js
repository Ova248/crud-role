import React, { useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/ShowPassword.css";
import "../../assets/styles/Form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../authContext/AuthContext";

export const Login = ({ setActive }) => {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const { login } = useAuth();

  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        const docRef = doc(collection(db, "users"), email);
        await setDoc(docRef, { email, password });
        const docSnap = await getDoc(docRef);

        console.log("Contenido del documento:", docSnap.data());

        if (docSnap.exists()) {
          const userData = docSnap.data();
          console.log("Contenido del documento:", docSnap.data());

          if (userData.password === password) {
            // console.log(
            //   "Inicio de sección confirmado. Datos de usuario: ",
            //   userData
            // );
            // login(userData);
            setActive("home");
            navigate("/home");
          } else {
            console.log("Contraseña incorrecta");
            return toast.error("Contraeña incorrecta");
          }
        } else {
          console.log("El documento no existe para el correo electrónico proporcionado.");
          return toast.error("Usuario no encontrado en Firebase");
        }
      } catch (error) {
        console.error("Error al obtener el documento:", error);
        return toast.error("Error al obtener el documento de Firebase");
      }
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
