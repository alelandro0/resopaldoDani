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

      if (response.ok) {
        setErrorResponse("");
        const json = (await response.json()) as AuthResponse;

        if (json.body.accessToken && json.body.refreshToken) {
          const guardar = auth.saveUser(json);
          goto("/dashboard");
        }
      } else {
        const json = (await response.json()) as AuthResponseError;
        setErrorResponse(json.body.error);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const transparentBg = "bg-transparent";
  const blueBorder = "border-2 border-blue-500";
  const blackText = "text-black";
  const blueButtonBg = "bg-white";
  const whiteButtonTxt = "text-white";
  const blueLink = "text-blue-600 hover:bg-blue-600 hover:text-white";
  const whiteText = "text-white";

  if (auth.esAutentico) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <Header />
      <section className="relative z-10 h-screen flex justify-center items-center">
        <div className={`relative ${transparentBg} p-8 rounded ${blueBorder} shadow-md space-y-4`}>
          <h1 className="text-3xl font-bold mb-4 text-white">Iniciar Sesión</h1>
          {!!errorResponse && <div className="text-red-500 mb-4">{errorResponse}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Correo Electrónico"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
                className="w-full text-black p-2 border border-gray-300 rounded focus:outline-none focus:border-purple-600"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-black p-2 border border-gray-300 rounded focus:outline-none focus:border-purple-600"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-blue-600">
                <input type="checkbox" className="mr-2" />
                Recordar Usuario 
              </label>
              <a href="#" className={`${whiteText}`}>¿Has olvidado tu contraseña?</a>
            </div>
            <button type="submit" className={`w-full ${blueButtonBg} ${blackText} p-2 rounded focus:outline-none`}>
              Iniciar Sesión
            </button>
          </form>
          <div className="mt-4">
            <p>¿No tienes una cuenta? <a href="/signup" className={`text-blue-600 `}>Registrarse</a></p>
          </div>
        </div>
      </section>
    </>
  );
}
