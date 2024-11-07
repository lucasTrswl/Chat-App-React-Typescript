import { NOTIFICATIONS } from "../Routes/Routes";
import { INotification } from "../Models/INotification";
import { StoreApi, UseBoundStore } from "zustand";
import { IStore } from "../Models/Store";
import { BaseBO } from "../business/BaseBO";
import { IMessage } from "../Models/Message";
import { IFriendRequest, IFriendRequestReceive } from "../Models/Social";
import { SocialBO } from "../business/SocialBO";

function ParseNotificationData<T>(notification: INotification): T {
    const data = JSON.parse(notification.data) as T;
    return data;
}

export class Notifications extends BaseBO {

    EventSource: EventSource

    constructor(store: UseBoundStore<StoreApi<IStore>>,) {
        super(store);
        this.EventSource = new EventSource(NOTIFICATIONS, { withCredentials: true });

        this.EventSource.addEventListener('message-received', (notification) => 
            this.messageReceived(ParseNotificationData<IMessage>(notification))
        );
        
        this.EventSource.addEventListener('friend-request-received', (notification) => 
            this.friendRequestReceived(ParseNotificationData<IFriendRequestReceive>(notification))
        );

        this.EventSource.addEventListener('friend-request-accepted', (notification) => 
            this.friendRequestAccepted(ParseNotificationData<IFriendRequest>(notification))
        )
    }

    Stop() {
        this.EventSource.close();
    }

    Notify(title: string, message: string, url?: string) {
        console.log("notifications:", title, message, url)
    }

    private messageReceived(message: IMessage) {
        this.store.getState().addMessage(message);
        this.Notify("Nouveau message", `Utilisateur: ${message.emitterId}`, `/conversation/${message.emitterId}`);
    }

    private friendRequestReceived(request: IFriendRequestReceive) {
        const BO = new SocialBO(this.store);
        BO.LoadFriendRequests();
        this.Notify("Nouvelle demande d'ami", `Utilisateur: ${request.userId}`, "/friendsRequest");
    }
    
    private friendRequestAccepted(request: IFriendRequest) {
        this.store.getState().removeFriendRequest(request.senderId);
        const BO = new SocialBO(this.store);
        BO.LoadFriends();
        this.Notify("Demande d'ami accepté", `Utilisateur: ${request.senderId}` , "/conversations");
    }
}