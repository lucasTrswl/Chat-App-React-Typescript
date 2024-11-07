import { SocialService } from "../Services/SocialService";
import IsSameArray from "../Utility/IsSameArray";
import { IFriend } from "../Models/Social";
import { BaseBO } from "./BaseBO";
import { IServiceResponse } from "../Models/ServiceResponse";

export class SocialBO extends BaseBO {
    
    async LoadFriends() {
        const { friends, success } = await SocialService.GetFriends();
        if (!success) return;

        // If same messages, don't update store
        if (IsSameArray(this.store.getState().friends, friends, (friend: IFriend) => friend.userId)) {
            return;
        }

        this.store.getState().loadFriends(friends);
    }

    async LoadFriendRequests() {
        const { friendRequests, success } = await SocialService.GetFriendRequests();
        if (!success) return;
        this.store.getState().loadFriendRequest(friendRequests);
    }

    async SendFriendRequest(friendId: string): Promise<IServiceResponse> {
        const { success, message } = await SocialService.SendFriendRequest(friendId);

        
        return {success, message};
    }

    async AcceptFriendRequest(requestId: string): Promise<boolean> {
        const { success } = await SocialService.AcceptFriendRequest(requestId);
        
        return success;
    }
}