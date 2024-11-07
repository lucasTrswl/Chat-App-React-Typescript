import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ConversationsList from './ConversationList';
import { useStore } from '../Store/Store';

import Linkify from 'linkify-react';
import { MessageBO } from '../business/MessageBO';
import { OrderDatesAscending, RelativeTimeString } from '../Utility/Dates';
import { IMessage } from '../Models/Message';
import { AuthService } from '../Services/AuthService';
import Notification from "./Notification";
import FriendAccept from "./FriendAccept";


export default function ConversationPage() {
  const { id } = useParams();
  const location = useLocation();
  const { name } = location.state || {};

  const messages = OrderDatesAscending(useStore((state) => state.messages), (message: IMessage) => message.sendAt);
  const user = useStore((state) => state.user);
  const userId = user != undefined ? user.id : "";
  console.log(user);
  const BO = new MessageBO(useStore);


  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  // Gérer la détection de la largeur d'écran
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await AuthService.Me();
        console.log("Utilisateur récupéré:", fetchedUser); // Vérifie si l'utilisateur est bien récupéré
        // Assigne fetchedUser à l'état utilisateur du store, ou dans un état local
        useStore.setState({ user: fetchedUser });
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur:", error);
      }
    };
    
    fetchUser();

    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);




  const [message, setMessage] = useState<string>('');

  const handleSendMessage = () => {
    if (message.trim()) {
      // const newMessage: IMessage = {
      //   id: Date.now().toString(),
      //   content: message,
      //   emitterId: 'Hugo',
      //   sendAt: new Date().toLocaleTimeString(),
      // };
      const friendId = id!;
      BO.SendMessage( friendId,  message);  
      setMessage('');          
    }
  };

  const linkifyOptions = {
    target: '_blank',
    rel: 'noopener noreferrer',
    className: 'underline',
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
            <div key={msg.id} className={`flex ${msg.emitterId === userId ? 'justify-end' : 'justify-start'} mb-2`}>
              <div className={`max-w-xs rounded-lg p-3 ${msg.emitterId === userId ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}>

               
              <Linkify options={linkifyOptions}>
                <p>{msg.content}</p>
                </Linkify>

                <span className="text-xs text-black">{RelativeTimeString(msg.sendAt)}</span>
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
