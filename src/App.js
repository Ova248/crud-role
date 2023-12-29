import { useState, useEffect } from "react";
import "./App.css";
import "./media-query.css";
import { Home } from "./pages/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Roles } from "./pages/Roles";
import AddEditCrud from "./pages/AddEditCrud";
import NotFound from "./pages/NotFound";
import Navbar from "./components/navbar/Navbar";
import { auth } from "./firebase-config";
import { signOut } from "firebase/auth";
import { Login } from "./features/signin/SignIn";
import { Register } from "./features/signup/SignUp";
import { EditProfile } from "./pages/EditProfile";

function App() {
  const [active, setActive] = useState("home");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  });

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setActive("login");
      navigate("/");
    });
  };

  return (
    <div className="App">
      <Navbar
        setActive={setActive}
        active={active}
        user={user}
        handleLogout={handleLogout}
      />
      <ToastContainer position="top-left" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/create" element={<AddEditCrud />} />
        <Route path="/update/:id" element={<AddEditCrud />} />
        <Route path="/auth/sign-in" element={<Login setActive={setActive} />} />
        <Route
          path="/auth/sign-up"
          element={<Register setActive={setActive} />}
        />
        <Route path="/edit-profile" element={<EditProfile user={user}/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
