/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useContext, createContext, useState, useEffect } from "react";
import type { AccessTokenResponse, AuthResponse, User  } from "../types/types";
import { API_URL } from "../Autentication/constanst";
import './spinnerPage.css'
import ParticlesBackground from "../components/ParticlesBackground";



interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext({
    esAutentico: false,
    setUserName: (nombreUsuario: string) => {},
    nombreUsuario:'',
    getAccessToken: () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    saveUser: (_userData: AuthResponse) => {},
    getRefreshToken:()=>{},
    getUser: ()=>({} as User | undefined),
    signOut: ()=>{},
});

export function AuthProvider({ children }: AuthProviderProps) {

    const [esAutentico, setEsAutentico] = useState(false);
    const [accessToken, setAccessToken] = useState<string>();
    const [user, setUser] = useState<User>();
    const [isLoading,setIsLoading]=useState(true);
    const [nombreUsuario, setNombreUsuario] = useState<string>(() => {
        const storedUserName = localStorage.getItem('userName');
        return storedUserName || ''; // Inicializa con el valor del almacenamiento local o una cadena vacía
    });
    
    useEffect(() => {
        // Actualiza el nombre de usuario en el almacenamiento local cuando cambie
        localStorage.setItem('userName', nombreUsuario);
    }, [nombreUsuario]);
    //const [refreshToken, setRefreshToken] = useState<string>("");

    useEffect(()=>{
        checkAuth();
        
    },[]);
    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        if (storedUserName) {
            setNombreUsuario(storedUserName);
        }
    }, [nombreUsuario]);
    function setUserName(nombreUsuario: string) {
        console.log('nombre de usuario de provider', nombreUsuario);
        localStorage.setItem('userName', nombreUsuario);
        setNombreUsuario(nombreUsuario);
    }
    useEffect(()=>{
       setUserName(nombreUsuario);
        
    },[nombreUsuario]);
    async function requestNewAccessToken(refreshToken: string) {
        try {
            const response = await fetch(`${API_URL}/refresh-token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${refreshToken}`
                }
            });
            console.log('respuesta del refres token', response);
    
            if (response.ok) {
                const json = await response.json() as AccessTokenResponse;
                console.log('valor del token  ', json);
    
                if (json.error) {
                    throw new Error(json.error);
                }
                return json.body.accesToken;
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.error('Error al solicitar un nuevo token de acceso:', error);
            return null;
        }
    }
    
    async function getUserInfo(accessToken: string) {
        try {
            const response = await fetch(`${API_URL}/user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                }
            });
    
    
            if (response.ok) {
                const json = await response.json();
                console.log('datos de el user getUserInfo: ', json.publicacion);
                if (json.error) {
                    throw new Error(json.error);
                }
                return json.body;
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.error('Error al obtener información del usuario:', error);
            return null;
        }
    }
    

    async function checkAuth() {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");
    
            if (accessToken) {
                const userInfo = await getUserInfo(accessToken);
                if (userInfo) {
                    saveSessionInfo(userInfo, accessToken, refreshToken!);
                    setIsLoading(false);
                    return;
                }
            } else if (refreshToken) {
                const newAccessToken = await requestNewAccessToken(refreshToken);
                if (newAccessToken) {
                    const userInfo = await getUserInfo(newAccessToken);
                    if (userInfo) {
                        saveSessionInfo(userInfo, newAccessToken, refreshToken);
                        setIsLoading(false);
                        return;
                    }
                }
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error en la verificación de autenticación:', error);
            setIsLoading(false);
        }
    }
    function signOut(){
        setEsAutentico(false);
        setAccessToken("");
        setUser(undefined);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userName");
    }
    
    
    function saveSessionInfo(userInfo: User, accessToken: string, refreshToken: string) {
        setAccessToken(accessToken);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setEsAutentico(true);
        setUser(userInfo);
    }
    
    

    function getAccessToken() {
        return accessToken;
    }
   

    function getRefreshToken():string | null {
        const tokenData = localStorage.getItem("token",);
        if(tokenData){
            const token = JSON.parse(tokenData);
            return token;
        }
        return null;
    }
 

    function saveUser(userData: AuthResponse) {
        saveSessionInfo(
            userData.body.user, 
            userData.body.accessToken, 
            userData.body.refreshToken );
    }

    function getUser(){
        return user;
    }

    return (
        <AuthContext.Provider value={{ esAutentico,nombreUsuario,setUserName, getAccessToken, saveUser, getRefreshToken, getUser, signOut }}>
            {isLoading?  <div className="spinner-container relative w-full md:h-screen p-4 text-white h-unset flex justify-center items-center Z-10">
            <ParticlesBackground/>
                <div style={{display:'flex', alignItems:'center'}} className="Z-10">
               <img src="../../../../public/images/logoMulti.png" 
                className="logo scale-x-[-1] filter invert "
               alt="" /> <h1 style={{marginLeft:'-100px', fontSize:100,marginTop:30}}>ultiServicios</h1></div>
            <div className="spinner"></div>
            <h1 style={{padding:20, fontSize:30}}>Loading...</h1>
        </div>: children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => useContext(AuthContext);