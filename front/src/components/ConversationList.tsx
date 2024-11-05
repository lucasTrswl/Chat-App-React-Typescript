import React from "react";

type Conversation = {
  id: number;
  name: string;
  time: string;
  
};

const conversations: Conversation[] = [
  { id: 1, name: "Lucas",  time: "10:45 AM"},
  { id: 2, name: "Hugo", time: "9:30 AM" },
  { id: 3, name: "Marie",  time: "12:30 PM" },
];

export default function ConversationsList() {
  return (
    <div className="w-80 h-screen bg-gray-100 border-r">
      <h2 className="p-4 text-2xl font-semibold text-gray-700 border-b">Conversations</h2>
      <div className="overflow-y-auto">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className="flex items-center justify-between p-4 hover:bg-gray-200 cursor-pointer transition-colors duration-200"
          >
            <div>
              <h3 className="text-lg font-medium text-gray-800">{conversation.name}</h3>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Last message: {conversation.time}</p>
              
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
