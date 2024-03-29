import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase/firebase-config";
import {
  setDoc,
  doc,
  getDocs,
  getDoc,
  collection,
  query,
  where,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserShield } from "@fortawesome/free-solid-svg-icons";

const UserRoleActions = ({ userEmail, onRoleChange }) => {
  const [userRoles, setUserRoles] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserRoles = async () => {
      try {
        const usersCollectionRef = collection(db, "users");
        const q = query(usersCollectionRef, where("email", "==", userEmail));
        const querySnapshot = await getDoc((await getDocs(q)).docs[0].ref);
        setUserRoles(querySnapshot.data().roles || {});
        setIsAdmin(querySnapshot.data().roles?.admin || false);
      } catch (error) {
        console.error("Error al obtener los roles del usuario:", error.message);
      }
    };

    fetchUserRoles();
  }, [userEmail]);

  const handleUserRoleChange = async (newRole) => {
    try {
      const updatedRoles = { ...userRoles, [newRole]: true };

      if (newRole === "reader") {
        updatedRoles["admin"] = false;
      }

      const usersCollectionRef = collection(db, "users");
      const q = query(usersCollectionRef, where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);

      const userDocRef = doc(db, "users", querySnapshot.docs[0].id);

      await setDoc(userDocRef, { roles: updatedRoles }, { merge: true });

      toast.success("Rol de usuario actualizado exitosamente");
      onRoleChange();
    } catch (error) {
      console.error("Error al cambiar el rol del usuario:", error.message);
      toast.error(`Error al cambiar el rol del usuario: ${error.message}`);
    }
  };

  return (
    <div>
      <button onClick={() => handleUserRoleChange("reader")}>
        <FontAwesomeIcon icon={faUser} /> Lector
      </button>
      <button onClick={() => handleUserRoleChange("admin")}>
        <FontAwesomeIcon icon={faUserShield} /> Admin
      </button>
    </div>
  );
};

export default UserRoleActions;
