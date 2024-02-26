import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../Autentication/AutProvider";
import DefaultLayout from "../layout/DefaultLayout";
import { API_URL } from "../Autentication/constanst";
import type { AuthResponseError } from "../types/types";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const [roll, setRoll] =useState("")
  const client="Cliente"
  const Profesional="Profesional"
  const auth = useAuth();
  const goto = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!roll) {
      setErrorResponse("Por favor, selecciona el tipo de usuario.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          username,
          password,
          roll
        })
      });

      if (response.ok) {
        console.log("el usuario se creó correctamente");
        setErrorResponse("");
        goto("/login");
      } else {
        console.log("algo malo ocurrió :o");
        const json = (await response.json()) as AuthResponseError;
        setErrorResponse(json.body.error);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (auth.esAutentico) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <DefaultLayout>
      <section className="father">
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <h1>Registro</h1>
            {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
            <div className="input-box">
              <label>Nombre</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
            </div>
            <div className="input-box">
              <label>Correo</label>
              <input type="email" value={username} onChange={(e) => setUsername(e.target.value)}></input>
            </div>
            <div className="input-box">
              <label>Contraseña</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <div className="input-box">
              <label className="tipe-user" style={{color:'white',marginBottom:5}}>Tipo de usuario: </label>
              <select className="form-select form-select-sm" aria-label=".form-select-lg " id="combo-box" value={roll} onChange={(e) => setRoll(e.target.value)}>
              <option value=""> -- Selecciona -- </option>
              <option value={client}>Cliente</option>
              <option value={Profesional}>Profesional</option>
            </select>
            </div>
            <button type="submit" className="btn">Registrarse</button>
          </form>
        </div>
      </section>
    </DefaultLayout>
  );
}
