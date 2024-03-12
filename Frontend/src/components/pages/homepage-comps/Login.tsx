import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Autentication/AutProvider";
import { useState } from "react";
import { API_URL } from "../../../Autentication/constanst";
import type { AuthResponse, AuthResponseError } from "../../../types/types";
import React from "react";
import Header from "./Header";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const auth = useAuth();
  const goto = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });
      console.log('POST login ', response);

      if (response.ok) {
        console.log("Inicio de sesión exitoso.");
        setErrorResponse("");
        const json = (await response.json()) as AuthResponse;
        console.log(response);

        if (json.body.accessToken && json.body.refreshToken) {
          const guardar = auth.saveUser(json);
          console.log('datos almacenados LOGIN', guardar);
          goto("/iniciar-sesion");
        }
      } else {
        console.log("algo malo acurrió :o");
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
    <>
      <Header />
      <section className="relative z-10 h-screen flex justify-center items-center">
        <div className="relative bg-white p-8 rounded shadow-md">
          <h1 className="text-3xl font-bold mb-4 text-black">Iniciar Sesión</h1>
          {!!errorResponse && <div className="text-red-500 mb-4">{errorResponse}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Correo Electrónico"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
                className="w-full text-black p-2 border border-gray-300 rounded focus:outline-none focus:border-purple-600"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-black p-2 border border-gray-300 rounded focus:outline-none focus:border-purple-600"
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-gray-700">
                <input type="checkbox" className="mr-2" />
                Recordar Usuario
              </label>
              <a href="#" className="text-purple-600">¿Has olvidado tu contraseña?</a>
            </div>
            <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 focus:outline-none">Iniciar Sesión</button>
          </form>
          <div className="mt-4">
            <p>¿No tienes una cuenta? <a href="/signup" className="text-purple-600">Registrarse</a></p>
          </div>
        </div>
      </section>
    </>
  );
}
