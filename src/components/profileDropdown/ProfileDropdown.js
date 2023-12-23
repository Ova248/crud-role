import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faL } from '@fortawesome/free-solid-svg-icons';
import "./ProfileDropdown.css";

const ProfileDropdown = ({ user, handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  //Dar click afuera se cierra
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dropdownRef]);

  return (
    <div
    ref={dropdownRef}
      className={`profile-Menu ${isMenuOpen ? "open" : ""}`}
    >
      <div className="menu-toggle" onClick={toggleMenu}>
        <div className="burger-icon">
        <FontAwesomeIcon icon={faBars} />
          <span></span>
          <span></span>
          <span></span>
          {/* <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="logo"
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
            }} 
          /> */}
        </div>
      </div>

      {isMenuOpen && (
         <div className="menu-items">
         <p className="menu-username">
           {user?.displayName} {user?.lastName}
         </p>
         <a href="/edit-profile" className="menu-item">
           Editar Perfil
         </a>
         <a href="#" className="menu-item" onClick={handleLogout}>
           Cerrar sesión
         </a>
       </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
