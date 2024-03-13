import React, { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from '../../../Autentication/constanst';
import { useAuth } from '../../../Autentication/AutProvider';
import type { AuthResponseError } from "../../../types/types";
import Header from "./Header";

export const Registro = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState('');
  const [roll, setRoll] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const client = "Cliente";
  const Profesional = "Profesional";
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
        setErrorResponse("");
        goto("/iniciar-sesion");
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
  const blueBorder = "border-2 border-white";
  const blackText = "text-black";
  const blueButtonBg = "bg-white";
  const whiteButtonTxt = "text-white";
  const whiteText = "text-white";

  if (auth.esAutentico) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <Header />
      <section className="relative z-10 mt-12 flex items-center justify-center h-screen shadow-md min-h-screen mt-20 ">
        <div className={`relative max-w-md w-full mx-auto p-10 rounded-md shadow-md bg-blue-1000 text-white ${transparentBg} ${blueBorder}`}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className={`text-center text-2xl font-bold mb-4`}>Registro</h2>
            {!!errorResponse && <div className="bg-red-100 border border-red-600 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{errorResponse}</div>}
            <div className="mb-4">
              <label className={`block ${whiteText} text-sm font-bold mb-2`} htmlFor="name">Nombre</label>
              <input
                className={`shadow border ${whiteText} border-gray-400 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline hover:border-blue-500`}
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre"
              />
            </div>
            <div className="mb-4">
              <label className={`block ${whiteText} text-sm font-bold mb-2`} htmlFor="username">Correo</label>
              <input
                className={`shadow appearance-none border ${whiteText} border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-blue-500`}
                id="username"
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Correo"
              />
            </div>
            <div className="mb-4">
              <label className={`block ${whiteText} text-sm font-bold mb-2`} htmlFor="password">Contraseña</label>
              <input
                className={`shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline hover:border-blue-500`}
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
              />
            </div>
            <div className="mb-4">
              <label className={`block ${whiteText} text-sm font-bold mb-2`} htmlFor="roll">Tipo de usuario</label>
              <select
                className={`block bg-black text-white border-gray-400 appearance-none w-full border py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500 hover:border-blue-600`}
                id="roll"
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
              >
                <option value="">Selecione el tipo de usuario</option>
                <option value={client}>Cliente</option>
                <option value={Profesional}>Profesional</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <button
                className={`bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none `}
                type="submit"
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  ) as JSX.Element;
};
