import { IAuthMe } from "./Auth"
import { IMessage, IMessageSendQueue } from "./Message"
import { IFriend, IFriendRequest } from "./Social"

export interface IStore {

    // States //
    logged: boolean
    user: IAuthMe | undefined
    
    messages: IMessage[]
    messageQueue: IMessageSendQueue[]
    
    friends: IFriend[]
    friendRequests: IFriendRequest[]


    // Methods //
    setLoggedUser: (user: IAuthMe) => void
    removeLoggerUser: () => void

    loadMessages: (messages: IMessage[]) => void
    addMessage: (message: IMessage) => void
    addMessageQueue: (message: IMessageSendQueue) => void
    removeMessageQueue: (uuid: string) => void

    loadFriends: (friend: IFriend[]) => void
    loadFriendRequest: (friendRequests: IFriendRequest[]) => void
    removeFriendRequest: (userId: string) => void
}