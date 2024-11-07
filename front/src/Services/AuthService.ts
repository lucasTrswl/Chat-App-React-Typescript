import { HTTP_HEADERS_JSON, HTTP_STATUS_CREATED, HTTP_STATUS_OK } from "../Constants/Http";
import { IAuthCredentials, IAuthMe } from "../Models/Auth";
import { AUTH_LOGIN, AUTH_REGISTER, AUTH_LOGOUT, AUTH_ME } from "../Routes/Routes";
import { BaseService } from "./BaseService";


export class AuthService {
    static async Me(): Promise<IAuthMe | undefined> {

        let authObject: IAuthMe | undefined = undefined;

        try {
            const response = await fetch(AUTH_ME, {
                method: "get",
                headers: HTTP_HEADERS_JSON,
                credentials: "include"
            });

            if (response.status == HTTP_STATUS_OK) {
                authObject = (await response.json()) as IAuthMe;
            }
            
        } catch (ex) {
            console.log('ERREUR AUTH ME',ex);
        }
        
        return authObject;
    }

    static async Register(username: string, password: string): Promise<string> {
        const userRegister: IAuthCredentials = {
            username,
            password
        }
        const { success, message } = await BaseService.Send(AUTH_REGISTER, userRegister);

        return message;
    }

    // AuthService.ts

static async Login(username: string, password: string): Promise<{ success: boolean, message: string }> {
    try {
        const response = await fetch(AUTH_LOGIN, {
            method: "post",
            headers: HTTP_HEADERS_JSON,
            credentials: "include",
            body: JSON.stringify({ username, password })
        });

        console.log(response, HTTP_HEADERS_JSON, JSON.stringify({ username, password }));

        if (response.status === HTTP_STATUS_CREATED) {
            // Login successful

            return { success: true, message: "Login successful!" };
        }  else {
            // Other error
            return { success: false, message: "Login failed. Please try again" };
        }
    } catch (error) {
        console.log("Login error:", error);
        return { success: false, message: "An unexpected error occurred. Please try again." };
    }
}


    static async Logout(): Promise<boolean> {
        try {
            const response = await fetch(AUTH_LOGOUT, {
                method: "post",
                credentials: "include"
            });
    
            const success = response.status == HTTP_STATUS_CREATED;
    
            return success;
        } catch(error) {
            console.log("ERREUR AUTH LOGOUT",error);
        }
        return false;
    }
}