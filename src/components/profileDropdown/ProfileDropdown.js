import React, { useState } from "react";
import "./ProfileDropdown.css";

const ProfileDropdown = ({ user, handleLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div
      className={`profile-dropdown ${isDropdownOpen ? "open" : ""}`}
      onBlur={closeDropdown}
    >
      <div className="dropdown-toggle" onClick={toggleDropdown}>
        <div className="profile-logo">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="logo"
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
            }}
          />
        </div>
        <p>
          {user?.displayName} {user?.lastName}
        </p>
      </div>

      {isDropdownOpen && (
        <div className="dropdown-menu">
          <a href="/edit-profile" className="dropdown-item">
            Editar Perfil
          </a>
          <a href="#" className="dropdown-item" onClick={handleLogout}>
            Cerrar sesión
          </a>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
