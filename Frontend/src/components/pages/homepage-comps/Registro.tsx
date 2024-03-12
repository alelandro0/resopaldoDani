import React,{ useState } from 'react';
import Header from './Header';
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from '../../../Autentication/constanst';
import { useAuth } from '../../../Autentication/AutProvider';
import type { AuthResponseError } from "../../../types/types";

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
      console.log('este es el usuario', auth.getUser()?.name);
 console.log('este es registro ', response);
      if (response.ok) {
        console.log("el usuario se creó correctamente");
        setErrorResponse("");
        goto("/iniciar-sesion");
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
    <>
      <Header />
      <section  className="relative z-10 mt-12 flex items-center justify-center h-screen  shado-md min-h-screen mt-20 ">
        <div className="relative max-w-md w-full mx-auto p-10  bg-white rounded-md shadow-md shadow-purple-600">
          <form onSubmit={handleSubmit} className="">
            <h2 className="text-center text-2xl font-bold mb-4 text-black">Registro</h2>
            {!!errorResponse && <div className="bg-red-100 border border-red-600 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{errorResponse}</div>}
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="name">Nombre</label>
              <input
                className="shadow border text-black border-gray-400 appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline hover:border-purple-600"
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre"
              />
            </div>
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="username">Correo</label>
              <input
                className="shadowappearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-purple-600"
                id="username"
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Correo"
              />
            </div>
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="password">Contraseña</label>
              <input
                className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline hover:border-purple-600"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
              />
            </div>
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="roll">Tipo de usuario</label>
              <select
                className="block border-gray-400 appearance-none w-full border  py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500 hover:border-purple-600"
                id="roll"
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
              >
                <option value="">Tipo de Usuario</option>
                <option value={client}>Cliente</option>
                <option value={Profesional}>Profesional</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  )as JSX.Element;
};
