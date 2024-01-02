import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/ShowPassword.css";
import "../../assets/styles/Form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();

    if (email && password) {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));

        querySnapshot.forEach((doc) => {
          
          console.log("Correo electrónico del documento:", doc.id);
          console.log("Correo electrónico proporcionado:", email);
          console.log(doc.id, " => ", doc.data());
          console.log("Email:", email);
          console.log("Password:", password);
          console.log("Query Snapshot:", querySnapshot.docs.map(doc => doc.data()));


          if (doc.id === email) {
            const userData = doc.data();
            console.log("Datos del usuario encontrado:", userData);

            if (userData.password === password) {
              toast.success("Inicio de sección confirmada.");
              navigate("/home");
            } else {
              console.log("Contraseña incorrecta");
              toast.error("Contraseña incorrecta");
              navigate("/");
            }
          }
        });

        // Si llega aquí, significa que no se encontró el usuario
        console.log("El usuario no existe");
        toast.error("Usuario no encontrado");
      } catch (error) {
        console.error("Error al obtener el documento:", error);
        toast.error("Error al obtener el documento de Firebase");
      }
    } else {
      toast.error("Todos los campos son obligatorios");
    }
  };

  const handleClick = () => {
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
                  <span
                    className="link-danger"
                    style={{ textDecoration: "none", cursor: "pointer" }}
                    onClick={handleClick}
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
