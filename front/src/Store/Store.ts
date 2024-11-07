import { create } from 'zustand';
import { IStore } from '../Models/Store';
import { IAuthMe } from '../Models/Auth';
import { IMessage, IMessageSendQueue } from '../Models/Message';
import { IFriend, IFriendRequest } from '../Models/Social';
import FriendsRequest from '../components/FriendsRequest';

const messages = [
    { id: '1', content: 'Salut ! Comment ça va ?', emitterId: 'Lucas', sendAt: '10:45 AM' },
    { id: '2', content: 'Très bien, merci ! Et toi ?', emitterId: 'Hugo', sendAt: '10:46 AM' },
    { id: '3', content: 'Ça va aussi !', emitterId: 'Lucas', sendAt: '10:47 AM' },
]

export const useStore = create<IStore>((set)=>({

    // States //
    logged: false,
    user: undefined,
    messages,
    messageQueue: [],
    friends: [],
    friendRequests: [],

    // Methods //
    setLoggedUser: (user: IAuthMe) => set({ logged: true, user }),
    removeLoggerUser: () => set({ logged: false, user: undefined }),

    loadMessages: (messages: IMessage[]) => set({ messages }),

    addMessage: (message: IMessage) => set((state) => {
        if (state.messages.find(m => m.id == message.id)) return {}

        return {
            messages: [...state.messages, message]
        }
    }),

    addMessageQueue: (message: IMessageSendQueue) => set((state) => {
        if (state.messageQueue.includes(message)) return {}
        return {
            messageQueue: [...state.messageQueue, message]
        }
    }),

    removeMessageQueue: (messageId: string) => set((state) => ({
        messageQueue: state.messageQueue.filter(m => m.id != messageId)
    })),

    loadFriends: (friends: IFriend[]) => set({ friends }),

    loadFriendRequest: (friendRequests: IFriendRequest[]) => set({ friendRequests }),

    removeFriendRequest: (userId: string) => set((state) => {
        if (!state.friendRequests.find(r => r.senderId == userId)) return {}
        return {
            friendRequests: state.friendRequests.filter(r => r.senderId != userId)
        }
    })
}))