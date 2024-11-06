import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ConversationsList from './ConversationList';
import { IMessage } from '../Models/Message';
import { useStore } from '../Store/Store';

import Linkify from 'linkify-react';

const messages:  IMessage[] = [
  { id: "1", content: 'Salut ! Comment ça va ?', emitterId: 'Lucas', sendAt: '10:45 AM' },
  { id: "2", content: 'Très bien, merci ! Et toi ?', emitterId: 'Hugo', sendAt: '10:46 AM' },
  { id: "3", content: 'Ça va aussi !', emitterId: 'Lucas', sendAt: '10:47 AM' },
]

export default function ConversationPage() {
  const { id } = useParams();
  const location = useLocation();
  const { name } = location.state || {};

  const messages = useStore((state) => state.messages);
  const addMessage = useStore((state) => state.addMessage);


  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  // Gérer la détection de la largeur d'écran
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const [message, setMessage] = useState<string>('');

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: IMessage = {
        id: Date.now().toString(),
        content: message,
        emitterId: 'Hugo',
        sendAt: new Date().toLocaleTimeString(),
      };
      addMessage(newMessage);  
      setMessage('');          
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {isMobile ? (
          <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-4 bg-blue-500 text-white"
          >
            ☰
          </button>
      ) : (
          // Affiche ConversationList sur les grands écrans
          <div className="w-80 bg-gray-200">
            <ConversationsList />
          </div>
      )}

      {/* Afficher le menu ConversationList en tant que overlay si mobile */}
      {isMobile && isMenuOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex">
            <div className="w-64 bg-white flex flex-row">
              <ConversationsList/>
              <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-4 bg-blue-500 text-white"
              >
                X
              </button>
            </div>
          </div>
      )}

      <div className="flex flex-col w-full h-full ">
        <div className="p-4 bg-white shadow-md ">
          <h1 className="text-xl font-bold text-gray-800">Conversation avec {name}</h1>
        </div>

        <div className="flex-grow overflow-y-auto p-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.emitterId === 'Hugo' ? 'justify-end' : 'justify-start'} mb-2`}>
              <div className={`max-w-xs rounded-lg p-3 ${msg.emitterId === 'Hugo' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}>

               
               <Linkify>
                <p>{msg.content}</p>
                </Linkify>

                <span className="text-xs text-gray-500">{msg.sendAt}</span>
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
