import { IServiceResponse } from "../Models/ServiceResponse";
import { AuthService } from "../Services/AuthService";
import { BaseBO } from "./BaseBO";

export class AuthBO extends BaseBO {
    async Login(username: string, password: string): Promise<IServiceResponse> {
        const { success, message } = await AuthService.Login(username, password);
        const user = await AuthService.Me();

        if (success) {

            if (user != undefined) {
                this.store.getState().setLoggedUser(user)
            }
        }

        return { success, message };
    }

    async Logout(): Promise<boolean> {
        const success = await AuthService.Logout();

        if (success) {
            this.store.getState().removeLoggerUser();
        }

        return success;
    }
}