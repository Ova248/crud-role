import { Dropdown } from "bootstrap";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ active, setActive, user, handleLogout }) => {
  const userId = user?.uid;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid bg-faded padding-media">
        <div className="container padding-media">
          <nav className="navbar navbar-toggleable-md navbar-light">
            <button
              className="navbar-toggler mt-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              data-bs-parent="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="true"
              aria-label="Toggle Navigation"
            >
              <span className="fa fa-bars"></span>
            </button>
            <div className="collapse navbar-collapse">
              <ul
                className="navbar-nav me-auto mb-2 mb-lg-0"
                id="navbarSupportedContent"
              >
                <Link to="/" style={{ textDecoration: "none" }}>
                  <li
                    className={`nav-item nav-link ${
                      active === "home" ? "active" : ""
                    }`}
                    onClick={() => setActive("home")}
                  >
                    Home
                  </li>
                </Link>

                <Link to="/create" style={{ textDecoration: "none" }}>
                  <li
                    className={`nav-item nav-link ${
                      active === "create" ? "active" : ""
                    }`}
                    onClick={() => setActive("create")}
                  >
                    Create
                  </li>
                </Link>
              </ul>
              <div className="row g-3">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  {userId ? (
                    <>
                      <div className="profile-logo">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                          alt="logo"
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            marginTop: "12px",
                          }}
                        />
                      </div>
                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle"
                          href="#"
                          id="navbarDropdown"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          style={{
                            marginTop: "12px",
                            marginLeft: "5px",
                            cursor: "pointer",
                          }}
                        >
                          {user?.displayName} {user?.lastName}
                        </a>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="navbarDropdown"
                        >
                          <Link
                            to="/edit-profile"
                            className="dropdown-item"
                            style={{ textDecoration: "none" }}
                          >
                            Editar Perfil
                          </Link>
                          <div className="dropdown-divider"></div>
                          <span
                            className="dropdown-item"
                            onClick={handleLogout}
                            style={{ cursor: "pointer" }}
                          >
                            Logout
                          </span>
                        </div>
                      </li>
                    </>
                  ) : (
                    <Link to="/auth/sign-in" style={{ textDecoration: "none" }}>
                      <li
                        className={`nav-item nav-link ${
                          active === "login" ? "active" : ""
                        }`}
                      >
                        Login
                      </li>
                    </Link>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
