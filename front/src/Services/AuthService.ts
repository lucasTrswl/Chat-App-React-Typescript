import { IAuthMe, IAuthRegister } from "../Models/Auth";
import { AUTH_LOGIN, AUTH_REGISTER, AUTH_LOGOUT, AUTH_ME } from "../Routes/Routes";

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CREATED = 201;

export class AuthService {
    static async Me(): Promise<IAuthMe | undefined> {

        let authObject: IAuthMe | undefined = undefined;

        try {
            const response = await fetch(AUTH_ME, {
                method: "get",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });

            const success = response.status == HTTP_STATUS_OK;

            if (!success) {
                return;
            }

            const authObject: IAuthMe = (await response.json()) as IAuthMe;

            return authObject

        } catch (ex) {
            console.log('ERREUR AUTH ME',ex);
        }
            
        return undefined;
    }

    static async Register(username: string, password: string): Promise<string> {
        let message = "";

        try {
            const response = await fetch(AUTH_REGISTER, {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            if (response.status == HTTP_STATUS_CREATED) {
                try {
                    const authObject: IAuthRegister = (await response.json()) as IAuthRegister;
                    message = authObject.message;
                } catch(ex) {
                    console.log("ERREUR AUTH REGISTER JSON", ex);
                }
            }
        } catch(ex) {
            console.log("ERR AUTH REGISTER REQUEST",ex);
            message = "Problème de connexion, vérifier votre accès internet.";
        }

        return message;
    }

    static async Login(username: string, password: string) {
        const response = await fetch(AUTH_LOGIN, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        
        
        const success = response.status == HTTP_STATUS_CREATED;

        return success;
    }

    static async Logout() {
        const response = await fetch(AUTH_LOGOUT, {
            method: "post"
        });

        const success = response.status == HTTP_STATUS_CREATED;

        return success;
    }
}