import { useState, useEffect } from "react";
import { Home } from "../pages/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserRole from "../pages/Roles";
import AddEditCrud from "../pages/AddEditCrud";
import NotFound from "../pages/NotFound";
import Navbar from "../components/navbar/Navbar";
import { Login } from "../pages/SignIn";
import { Register } from "../pages/SignUp";
import { EditProfile } from "../pages/EditProfile";
import { useAuth } from "../contexts/AuthContext";

function App() {
  const [active, setActive] = useState("home");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
      <div className="App">
        <Navbar
          setActive={setActive}
          active={active}
          user={user}
          handleLogout={() => {
            logout();
            setUser(null);
            setActive("login");
            navigate("/");
          }}
        />
        <ToastContainer position="top-left" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<AddEditCrud />} />
          <Route path="/update/:id" element={<AddEditCrud />} />
          <Route
            path="/auth/sign-in"
            element={<Login setActive={setActive} />}
          />
          <Route
            path="/auth/sign-up"
            element={<Register setActive={setActive} />}
          />
          <Route path="/user-roles" element={<UserRole currentUser={user} />} />
          <Route path="/edit-profile" element={<EditProfile user={user} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
  );
}

export default App;
