import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import "../assets/styles/ShowPassword.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {
  updateDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";

export const EditProfile = ({ user }) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const usersCollection = collection(db, "users");
      const userQuery = query(usersCollection, where("email", "==", email));
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userRef = userDoc.ref;

        const updatedData = {
          name,
          lastName,
          email: newEmail || email, 
        };
        await updateDoc(userRef, updatedData);

        toast.success("Profile updated successfully");
        navigate("/");
      } else {
        toast.error("User not found");
      }
    } catch (error) {
      console.error("Error updating profile:", error.message);
      toast.error("Error updating profile");
    }
  };

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
