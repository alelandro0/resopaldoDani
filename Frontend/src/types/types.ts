export interface AuthResponse{
    body: {
        user: User;
        accessToken: string;
        refreshToken: string;
    };

}

export interface AuthResponseError{
    body:{
        error: string;
    }
}


export interface User{
    id: string;
    name: string;
    username: string;
    roll: string;
    publication:{
        _id:string,
        image: string,
        decripcion:string,
        estado: string,   
    }[];   
}

export interface AccessTokenResponse{
    statusCode: number;
    body: {
        accesToken: string;
    };
    error?: string;
    
}