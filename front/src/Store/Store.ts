import { create } from 'zustand';
import { IStore } from '../Models/Store';
import { IAuthMe } from '../Models/Auth';
import { IMessage } from '../Models/Message';
import { IFriend, IFriendRequest } from '../Models/Social';

const loadMessagesFromStorage = (): IMessage[] => {
  const savedMessages = localStorage.getItem('messages');
  return savedMessages ? JSON.parse(savedMessages) : [];
};

const saveMessagesToStorage = (messages: IMessage[]) => {
  localStorage.setItem('messages', JSON.stringify(messages));
};

export const useStore = create<IStore>((set) => ({
  // States
  logged: false,
  user: undefined,
  messages: loadMessagesFromStorage(),
  friends: [],
  friendRequests: [],

  // Methods
  setLoggedUser: (user: IAuthMe) => set({ logged: true, user }),
  removeLoggerUser: () => set({ logged: false, user: undefined }),

  loadMessages: (messages: IMessage[]) => {
    saveMessagesToStorage(messages);
    set({ messages });
  },

  addMessage: (message: IMessage) => set((state) => {
    const updatedMessages = [...state.messages, message];
    saveMessagesToStorage(updatedMessages);
    return { messages: updatedMessages };
  }),

  addFriend: (friend: IFriend) => set((state) => ({
    friends: [...state.friends, friend],
  })),

  addFriendRequest: (friendRequest: IFriendRequest) => set((state) => ({
    friendRequests: [...state.friendRequests, friendRequest],
  })),
}));
