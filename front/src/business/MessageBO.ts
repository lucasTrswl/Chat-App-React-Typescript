import { MessageService } from "../Services/MessageService";
import { IMessage, IMessageSendQueue } from "../Models/Message";
import { v4 as uuid } from 'uuid'
import IsSameArray from "../Utility/IsSameArray";
import { BaseBO } from "./BaseBO";

export class MessageBO extends BaseBO {
    async LoadMessages(friendId: string) {
        const { messages, success } = await MessageService.GetMessages(friendId);
        if (!success) return;

        // If same messages, don't update store
        if (IsSameArray(this.store.getState().messages, messages, (message: IMessage) => message.id)) {
            console.log("no new")
            return;
        }


        this.store.getState().loadMessages(messages);
    }

    async ResendMessage(messageId: string) {
        const message = this.store.getState().messageQueue.find(m => m.id == messageId);
        if (message == undefined) return;

        const success = await this.SendMessage(message.receiverId, message.content);

        if (success) {
            this.store.getState().removeMessageQueue(message.id);
        }
    }

    async SendMessage(friendId: string, message: string): Promise<boolean> {
        const { success } = await MessageService.SendMessage(friendId, message);
        
        const newUuid = uuid()

        if (!success) {
            const messageObject: IMessageSendQueue = {
                id: newUuid,
                receiverId : friendId,
                content: message,
            }
            
            this.store.getState().addMessageQueue(messageObject);
            console.log("fallback to queue", this.store.getState().messageQueue)
        } else {
            const { success, messages } = await MessageService.GetMessages(friendId);

            if (success) {
                this.store.getState().loadMessages(messages);
                console.log("loaded messages", messages)
            }
        }

        return success;
    }
}