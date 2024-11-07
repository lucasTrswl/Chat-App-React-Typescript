export interface IMessage {
    id: string
    emitterId: string
    content: string
    sendAt: string
}

export interface IMessageSendQueue {
    receiverId: string
    content: string
    id: string
}

export interface IMessageSend {
    receiverId: string
    content: string
}