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
    getAccessToken: () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    saveUser: (_userData: AuthResponse) => {},
    getRefreshToken:()=>{},
    getUser: ()=>({} as User | undefined),
    signOut: ()=>{},
});

export function AuthProvider({ children }: AuthProviderProps) {

    const [esAutentico, setEsAutentico] = useState(false);
    const [accessToken, setAccessToken] = useState<string>("");
    const [user, setUser] = useState<User>();
    const [isLoading,setIsLoading]=useState(true);
    //const [refreshToken, setRefreshToken] = useState<string>("");

    useEffect(()=>{
        checkAuth();
        
    },[]);

    async function requestNewAccessToken(refreshToken: string){
        try {
            const response = await fetch(`${API_URL}/refresh-token`,{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    authorization: `Bearer ${refreshToken}`
                }  
            });
            console.log('respuesta del refres token',response);
            
            if(response.ok){
                const json = await response.json() as AccessTokenResponse;
                console.log('valor del token ', json);
                
                if(json.error){
                    throw new Error(json.error);
                }
                return json.body.accesToken;
            }else{
                throw new Error(response.statusText);
            }
        } catch (error) {
        console.log(error);
        return null;
        }
    }

    async function getUserInfo(accessToken:string) {
        try {
            const response = await fetch(`${API_URL}/user`,{
                method: "GET",
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                }  
            });
            
            
            if(response.ok){
                const json = await response.json();
                console.log('datos de el user getUserInfo: ',json.publicacion);
                if(json.error){
                    throw new Error(json.error);
                }
                return json.body;
            }else{
                throw new Error(response.statusText);
            }
        } catch (error) {
        console.log(error);
        return null;
        } 
    }

    async function checkAuth() {
        if(accessToken){
            const userInfo  = await getUserInfo(accessToken);
            if(userInfo){
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                saveSessionInfo(userInfo.user, accessToken, getRefreshToken()!);
                setIsLoading(false);
                return; 
            }
        }else{
            const token = getRefreshToken();
            if(token){
                const newAccessToken = await requestNewAccessToken(token);
                if(newAccessToken){
                  const userInfo  = await getUserInfo(newAccessToken);
                  console.log('onformacion de acceso ', userInfo);
                    if(userInfo){
                        saveSessionInfo(userInfo.user, newAccessToken,token);
                        setIsLoading(false);
                        return; 
                    }
                }
            }
        }
        setIsLoading(false);
    }

    function signOut(){
        setEsAutentico(false);
        setAccessToken("");
        setUser(undefined);
        localStorage.removeItem("token");
    }
    
    function saveSessionInfo(userInfo: User, accessToken: string, refreshToken: string) {
        setAccessToken(accessToken);
        localStorage.setItem("token", JSON.stringify(refreshToken));
        setEsAutentico(true);
        setUser(userInfo);
        console.log('informacion del usuario authProvider :', userInfo);
    }
    

    function getAccessToken() {
        return accessToken;
    }

    function getRefreshToken():string | null {
        const tokenData = localStorage.getItem("token");
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
        <AuthContext.Provider value={{ esAutentico, getAccessToken, saveUser, getRefreshToken, getUser, signOut }}>
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