import { IAuthMe } from "./Auth"
import { IMessage } from "./Message"
import { IFriend, IFriendRequest } from "./Social"

export interface IStore {

    // States //
    logged: boolean
    user: IAuthMe | undefined
    
    messages: IMessage[]
    
    friends: IFriend[]
    friendRequests: IFriendRequest[]


    // Methods //
    setLoggedUser: (user: IAuthMe) => void
    removeLoggerUser: () => void

    loadMessages: (messages: IMessage[]) => void
    addMessage: (message: IMessage) => void

    addFriend: (friend: IFriend) => void
    addFriendRequest: (friendRequest: IFriendRequest) => void
}