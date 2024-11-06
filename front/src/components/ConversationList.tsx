import React from "react";
import { AuthService } from "../Services/AuthService"; 
import { useNavigate } from "react-router-dom";

type Conversation = {
  id: number;
  name: string;
  time: string;
};

const conversations: Conversation[] = [
  { id: 1, name: "Lucas", time: "10:45 AM" },
  { id: 2, name: "Hugo", time: "9:30 AM" },
  { id: 3, name: "Marie", time: "12:30 PM" },
];

export default function ConversationsList() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const success = await AuthService.Logout();

    if (success) {
      console.log("Déconnexion réussie");
      navigate("/login");
    } else {
      console.log("Erreur");
    }
  };

  const handleConversationClick = (id: number, name: string) => {
    navigate(`/conversation/${id}`, { state: { name }});
  }; 

  return (
    <div className="flex flex-col w-80 h-screen bg-gray-100 border-r">
      <h2 className="p-4 text-2xl font-semibold text-gray-700 border-b">Conversations</h2>
      <div className="overflow-y-auto flex-grow">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className="flex items-center justify-between p-4 hover:bg-gray-200 cursor-pointer transition-colors duration-200"
            onClick={() => handleConversationClick(conversation.id, conversation.name)}
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
      <button
        type="button"
        onClick={handleLogout}
        className="p-4 w-full bg-red-500 cursor-pointer hover:text-white"
      >
        Se déconnecter
      </button>
    </div>
  );
}
