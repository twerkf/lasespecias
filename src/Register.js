import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "./firebase";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const register = () => {
    if (!name) alert("Falta tu nombre");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
  <div className="wallpaper">
    <div className="info">¿quienes somos? </div>
      <div  className="text">
        En el Conjunto residencial Las especias se conforma un espacio de vivienda organizado y en donde se busca propiciar espacios de comunicación, sana convivencia y en donde reine la armonía, la paz, el respeto y la equidad para todos los propietarios siguiendo los lineamientos establecidos en nuestro reglamento con el fin de lograr un desarrollo humano sostenible.
      </div>
    <div className="register">
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre Residente"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electronico"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <button className="register__btn" onClick={register}>
          Registrar
        </button>
        <button
          className="register__btn register__google"
          onClick={signInWithGoogle}
        >
          Registrar con Gmail
        </button>

        <div>
          Tienes cuenta? <Link to="/login">Entra</Link> Ahora.
        </div>
      </div>
    </div>
  </div>
  );
}

export default Register;
