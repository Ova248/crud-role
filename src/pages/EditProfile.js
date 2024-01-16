import React, { useState, useEffect } from "react";
import "../assets/styles/ShowPassword.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "../contexts/GlobalContext";

export const EditProfile = ({ user }) => {
  const {
    name,
    setName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    newEmail,
    setNewEmail,
    handleUpdateProfile,
  } = useGlobalContext();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
    }
  }, [user]);

  return (
    <div className="container">
      <h2>Edit Profile</h2>
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-auto col-lg-6 ">
          <form
            className="row justify-content-md-center"
            onSubmit={handleUpdateProfile}
          >
            <div className="col-4 py-3">
              <input
                type="text"
                className="form-control input-text-box"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-4 py-3">
              <input
                type="text"
                className="form-control input-text-box"
                placeholder="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="col-8 py-3">
              <input
                type="email"
                className="form-control"
                placeholder="Old email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-8 py-3">
              <input
                type="email"
                className="form-control"
                placeholder="New Email"
                name="newEmail"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
            <div className="col-8 py-3">
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
            <button type="submit" className="btn btn-primary col-6 py-3">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
