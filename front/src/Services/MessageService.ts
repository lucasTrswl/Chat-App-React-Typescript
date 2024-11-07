import { v4 as uuid } from 'uuid'
import { IMessage, IMessageSend } from '../Models/Message';
import { CHAT_SEND, MESSAGES_GET } from '../Routes/Routes';
import { BaseService } from './BaseService';
import { IServiceResponse } from '../Models/ServiceResponse';

export class MessageService {
    static async GetMessages(friendId: string): Promise<{ success: boolean, messages: IMessage[]}> {
        const url = MESSAGES_GET(friendId);
        const { success, entities: messages } = await BaseService.All<IMessage>(url);

        return { success, messages }
    }

    static async SendMessage(friendId: string, content: string): Promise<IServiceResponse> {
        const newUUID = uuid();
        const url = CHAT_SEND(newUUID);

        const bodyObject: IMessageSend = {
            receiverId: friendId,
            content
        };

        const { success, message } = await BaseService.Send<IMessageSend>(url, bodyObject);

        return { success, message }
    }
}