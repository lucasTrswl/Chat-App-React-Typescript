import { v4 as uuid } from 'uuid'
import { IServiceResponse } from "../Models/ServiceResponse";
import { IFriend, IFriendRequest, IFriendRequestSend } from "../Models/Social";
import { SOCIAL_GET_FRIENDS, SOCIAL_GET_FRIEND_REQUESTS, SOCIAL_SEND_FRIEND_REQUEST, SOCIAL_ACCEPT_FRIEND_REQUEST } from "../Routes/Routes";
import { BaseService } from "./BaseService";
import { HTTP_HEADERS_JSON, HTTP_STATUS_NOT_FOUND } from "../Constants/Http";

export class SocialService {
    static async GetFriends(): Promise<{success: boolean, friends: IFriend[]}> {
        const url = SOCIAL_GET_FRIENDS;
        const { success, entities: friends } = await BaseService.All<IFriend>(url);
        return { success, friends }
    }

    static async GetFriendRequests(): Promise<{success: boolean, friendRequests: IFriendRequest[]}> {
        const url = SOCIAL_GET_FRIEND_REQUESTS;
        const { success, entities: friendRequests } = await BaseService.All<IFriendRequest>(url);
        return { success, friendRequests }
    }

    static async SendFriendRequest(userId: string): Promise<IServiceResponse> {
        const newUuid = uuid();
        const url = SOCIAL_SEND_FRIEND_REQUEST(newUuid);
        const data: IFriendRequestSend = {
            receiverId: userId
        }
        const { success, message } = await BaseService.Send(url, data);
        return { success, message }
    }

    static async AcceptFriendRequest(requestId: string): Promise<IServiceResponse> {
        const url = SOCIAL_ACCEPT_FRIEND_REQUEST(requestId);
        let success = true;
        let message = "";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: HTTP_HEADERS_JSON,
                credentials: "include"
            });

            if (response.status == HTTP_STATUS_NOT_FOUND) {
                message = "Cette demande d'ami n'existe pas."
                success = false;
            }
        } catch(error) {
            message = "Problème de connexion."
            success = false;
        }

        return { success, message }
    }
}