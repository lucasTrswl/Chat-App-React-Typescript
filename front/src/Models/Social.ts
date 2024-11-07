export interface IFriend {
    userId: string
    username: string
    startedAt: string
}

export interface IFriendRequest {
    id: string
    senderId: string
    requestedAt: string
}

export interface IFriendRequestSend {
    receiverId: string
}

export interface IFriendRequestReceive {
    userId: string
}