import { HTTP_HEADERS_JSON, HTTP_STATUS_CREATED, HTTP_STATUS_OK } from "../Constants/Http";
import { IErrorResponse } from "../Models/Error";
import { IServiceResponse } from "../Models/ServiceResponse";

export class BaseService {
    static async All<T>(url: string): Promise<{success: boolean, entities: T[]}> {
        let entities: T[] = []
        let success = true;
        try {
            const response = await fetch(url,{
                method: "GET",
                headers: HTTP_HEADERS_JSON,
                credentials: "include"
            })
            
            if (response.status == HTTP_STATUS_OK) {
                const json = await response.json();
                entities = json as T[];
            } else {
                success = false;
            }
        } catch (error) {
            console.log("ERREUR, PAS DE CONNEXION",error);
            success = false;
        }

        return { success, entities }
    }

    static async Send<T>(url: string, object: T): Promise<IServiceResponse> {
        let success = true;
        let message = "";
        try {
            const response = await fetch(url,{
                method: "POST",
                headers: HTTP_HEADERS_JSON,
                credentials: "include",
                body: JSON.stringify(object)
            })
            
            if (response.status != HTTP_STATUS_CREATED) {
                success = false;
                const json = await response.json() as IErrorResponse;
                message = json.message;
            }
        } catch (error) {
            console.log("ERREUR, PAS DE CONNEXION",error);
            success = false;
        }

        return { success, message }
    }
}