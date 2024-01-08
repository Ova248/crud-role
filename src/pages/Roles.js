import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase-config";
import { query, collection, getDocs } from "firebase/firestore";
import UserRoleActions from "../features/rol/useRol";
import { useAuth } from "../features/authContext/AuthContext";
import "../assets/styles/Roles.css";

const UserRole = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (currentUser && currentUser.roles && currentUser.roles.admin) {
      getUsersList();
    }
  }, [currentUser]);

  const getUsersList = async () => {
    try {
      const usersQuery = query(collection(db, "users"));
      const usersSnapshot = await getDocs(usersQuery);
      const usersData = usersSnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((user) => user.email !== currentUser.email);
      setUsers(usersData);
    } catch (error) {
      console.error("Error al obtener la lista de usuarios:", error.message);
      toast.error("Error al obtener la lista de usuarios");
    }
  };

  const handleUserRoleChange = () => {
    getUsersList();
  };

  return (
    <div>
      <h3>Lista de Usuarios</h3>
      {users.length > 0 ? (
        <div>
          {users.map((user) => (
            <div key={user.email} className="user-container">
              <div className="user-info">
                <strong>{user.name} {user.lastName}</strong> - {user.email}
              </div>
              <div className="actions">
                <UserRoleActions
                  userEmail={user.email}
                  onRoleChange={handleUserRoleChange}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay usuarios disponibles.</p>
      )}
    </div>
  );
};

export default UserRole;
