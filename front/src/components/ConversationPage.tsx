import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ConversationsList from './ConversationList';

type Message = {
  id: number;
  text: string;
  sender: 'Lucas' | 'Hugo';
  time: string;
};

export default function ConversationPage() {
  const { id } = useParams();
  const location = useLocation();
  const { name } = location.state || {};

  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Salut ! Comment ça va ?', sender: 'Lucas', time: '10:45 AM' },
    { id: 2, text: 'Très bien, merci ! Et toi ?', sender: 'Hugo', time: '10:46 AM' },
    { id: 3, text: 'Ça va aussi !', sender: 'Lucas', time: '10:47 AM' },
  ]);

  const handleSendMessage = () => {
    //vérifie que le champ n'est pas vide
    if (message.trim()) {
      // création d'un nouveau message
      const newMessage: Message = {
        id: messages.length + 1,
        text: message,
        sender: 'Hugo',
        time: new Date().toLocaleTimeString(),
      };
      // le nouveau message est set et est envoyé dans le tchat
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
  
    <div className="flex h-screen bg-gray-100">

      <div className=" bg-white border-r overflow-y-auto">
        <ConversationsList />
      </div>

      <div className="flex flex-col w-2/3 h-full">
        <div className="p-4 bg-white shadow-md">
          <h1 className="text-xl font-bold text-gray-800">Conversation avec {name}</h1>
        </div>

        <div className="flex-grow overflow-y-auto p-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'Hugo' ? 'justify-end' : 'justify-start'} mb-2`}>
              <div className={`max-w-xs rounded-lg p-3 ${msg.sender === 'Hugo' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}>
                <p>{msg.text}</p>
                <span className="text-xs text-gray-500">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-white border-t flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tapez votre message..."
            className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mr-2"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}
