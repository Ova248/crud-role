import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import {
  updateProfile,
  updateEmail,
  updatePassword,
  sendEmailVerification,
} from "firebase/auth";

export const EditProfile = ({ user }) => {
  const [displayName, setDisplayName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      // setLastName(user.lastName || "");
      // setEmail(user.email || "");
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const currentUser = auth.currentUser;

      await updateProfile(currentUser, { displayName });

      // if (currentUser.email !== email) {
      //   await updateEmail(currentUser, email);
      //   await sendEmailVerification(currentUser);
      // }

      if (password) {
        await updatePassword(currentUser, password);
      }
      toast.success("Profile updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating profile:", error.message);
      toast.error("Error updating profile");
    }
  };

  return (
    <div className="container">
      <h2>Edit Profile</h2>
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-10 col-md-8 col-lg-6">
          <form className="row" onSubmit={handleUpdateProfile}>
            <div className="col-6 py-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                id="displayName "
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            {/* <div className="col-6 py-3">
          <input
          type="text"
          className="form-control"
          placeholder="lastName"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          />
        </div> */}
            {/* <div className="mb-3">
          <input
          type="email"
          className="form-control"
          placeholder="Wmail"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
        </div> */}
            <div className="col-6 py-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
