import React, { createContext, useState, useContext } from "react";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/authContext/AuthContext";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState();
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState();
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (name && lastName && email && password) {
      try {
        const userDocRef = doc(collection(db, "users"));

        const userDocId = userDocRef.id;

        await setDoc(userDocRef, {
          uid: userDocId,
          name,
          lastName,
          email,
          password,
          roles: { admin: false },
        });
        toast.success("Registrado con éxito");
        navigate("/auth/sign-in");
      } catch (error) {
        console.error("Error al crear el usuario:", error.message);
        toast.error("Error al crear la cuenta de usuario");
      }
    } else {
      return toast.error("Todos los campos son obligatorios");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let userFound = false;
      const querySnapshot = await getDocs(collection(db, "users"));

      querySnapshot.forEach((doc) => {
        if (doc.data().email === email && doc.data().password === password) {
          const userData = doc.data();
          login(userData);
          navigate("/");
          toast.success("Inicio de sesión confirmado");
          userFound = true;
        }
      });
      if (!userFound) {
        toast.error("Usuario no encontrado");
      }
    } catch (error) {
      console.error("Error al obtener el documento:", error);
      toast.error("Error al obtener el documento de Firebase");
    }
  };

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
    <GlobalContext.Provider
      value={{
        name,
        setName,
        lastName,
        setLastName,
        email,
        password,
        setEmail,
        setPassword,
        newEmail,
        setNewEmail,
        handleUpdateProfile,
        handleLogin,
        handleRegister,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
