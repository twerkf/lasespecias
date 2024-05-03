import "./Dashboard.css";
import DataItem from './data-item';
import Modal from './modal';
import data from './data.json';
import { auth, db, logout } from "./firebase";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where, namedQuery } from "firebase/firestore";

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState(data);
  const [currentUser, setCurrentUser] = useState(null);
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    fetchUserName();
  }, [user, loading]);

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  const addUser = user => {
    if (currentUser) {
      setUserData(userData.map(data => (data.id === user.id ? user : data)));
      setCurrentUser(null);
      return;
    }
    user.id = userData.length + 1;
    setUserData([...userData, user]);
  }

  const editUserHandler = user => {
    setCurrentUser(user);
    toggleModal();
  }

  const deleteUser = user => {
    setUserData(userData.filter(item => item.name !== user.name));
  }

  return (
    <div className="dashboard">
      <div className="dashboard__container">
      <h1 className="title">Fecha Salón social</h1>
        Fecha agendada:
        <div></div><br></br>
          <DataItem data={userData} onEdit={editUserHandler} onDelete={deleteUser} />
          <Modal onCancel={toggleModal} onSubmit={addUser} show={showModal} data={userData} editUser={currentUser} /><br></br>
          <button onClick={toggleModal}>Reservar</button><br></br><br></br><br></br>
        <button className="dashboard__btn" onClick={logout}>
          Salir
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
