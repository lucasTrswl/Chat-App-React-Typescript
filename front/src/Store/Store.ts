import { create } from 'zustand';
import { IStore } from '../Models/Store';
import { IAuthMe } from '../Models/Auth';
import { IMessage } from '../Models/Message';
import { IFriend, IFriendRequest } from '../Models/Social';

export const useStore = create<IStore>((set)=>({

    // States //
    logged: false,
    user: undefined,
    messages: [],
    friends: [],
    friendRequests: [],

    // Methods //
    setLoggedUser: (user: IAuthMe) => set({ logged: true, user }),
    removeLoggerUser: () => set({ logged: false, user: undefined }),

    loadMessages: (messages: IMessage[]) => set({ messages }),

    addMessage: (message: IMessage) => set((state) => ({
        messages: [...state.messages, message]
    })),

    addFriend: (friend: IFriend) => set((state) => ({
        friends: [...state.friends, friend]
    })),

    addFriendRequest: (friendRequest: IFriendRequest) => set((state) => ({
        friendRequests: [...state.friendRequests, friendRequest]
    }))
}))