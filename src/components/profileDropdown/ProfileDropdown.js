import React from "react";
import { Dropdown } from "react-bootstrap";

export const ProfileDropdown = ({ user, handleLogout }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="link"
        id="dropdown-basic"
        style={{ fontSize: "14px", display: "flex", alignItems: "center" }}
      >
        <>
          <div className="profile-logo" style={{ marginRight: "5px"}}>
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
          <p
            style={{ fontSize: "14px", display: "flex", alignItems: "center", margin:"0"}}
          >
            {user?.displayName} {user?.lastName}
          </p>
        </>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="/edit-profile">Editar Perfil</Dropdown.Item>
        <Dropdown.Item onClick={handleLogout}>Cerrar sesión</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileDropdown;
