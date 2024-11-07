import imgValidate from '../img/valide.png';
import { AuthService } from "../Services/AuthService"; // Adjust path as necessary
import { useNavigate } from "react-router-dom";
import ConversationList from "../components/ConversationList";
import { useState, useEffect } from "react";
import {IFriendRequest} from '../Models/Social';
import {useStore} from "../Store/Store";
import { SocialBO } from '../business/SocialBO';
import FriendNotification from "../components/FriendNotification";
import FriendAccept from "../components/FriendAccept";

const people2: IFriendRequest[] = [
    {id: '1', senderId: 'Joe', requestedAt : '2024-11-06T14:22:56.709Z'},
    {id: '2', senderId: 'Marc', requestedAt: '2024-11-06T15:22:56.709Z'},
    {id: '3', senderId: 'Bob', requestedAt: '2024-11-06T16:22:56.709Z'},
    {id: '4', senderId: 'Stéphanie', requestedAt: '2024-11-06T17:22:56.709Z'},
    {id: '5', senderId: 'Diego', requestedAt: '2024-11-06T17:22:56.709Z'},
    {id: '6', senderId: 'Jacques', requestedAt: '2024-11-06T18:22:56.709Z'},
];

function FriendsRequest() {

    const BO = new SocialBO(useStore);

    //BO.LoadFriendRequests();

    const people = useStore((state) => state.friendRequests);
    const user = useStore((state) => state.user);
    if(user !== undefined){
        console.log(user);
    }

    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

    // Gérer la détection de la largeur d'écran
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 900);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    const [friendId, setFriendId] = useState('');

    const  handleAddFriend = async () => {
        const {success, message} = await BO.SendFriendRequest(friendId);

        if(success){
            console.log("Ami ajouté")
        } else {
            console.log("Erreur lors de l'ajout d'ami")
        }

        

    };

    // Accepter une demande d'ami
    const handleAddAcceptRequest = async (requestId: string) => {
        const success = await BO.AcceptFriendRequest(requestId);
        if (success) {
            console.log("Demande d'ami acceptée");
            navigate("/chat");
        } else {
            console.log("Erreur lors de l'acceptation de la demande d'ami");
        }
    };

    return (
        <>
            {/* Conteneur principal en flex pour ConversationList et la table des demandes */}
            <div className="flex">
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
                        <ConversationList />
                    </div>
                )}

                {/* Afficher le menu ConversationList en tant que overlay si mobile */}
                {isMobile && isMenuOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex">
                        <div className="w-64 bg-white flex flex-row">
                            <ConversationList/>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="p-4 bg-blue-500 text-white"
                            >
                                X
                            </button>
                        </div>
                    </div>
                )}
                <div className="w-full">
                    <header className="bg-white p-4 pb-12 shadow-md flex items-center justify-center">
                        <div className="flex items-center w-full max-w-lg space-x-4">
                            <input
                                type="text"
                                placeholder="Ajouter un ami"
                                className="flex-grow p-2 border border-gray-300 rounded w-16 md:w-32 lg:w-48"
                                value={friendId}
                                onChange={(e) => setFriendId(e.target.value)}
                            />
                            <button
                                type="button"
                                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
                                onClick={handleAddFriend}
                            >
                                Ajouter
                            </button>
                        </div>
                    </header>
                    <div className="flex-grow flex justify-center items-center bg-gray-100"
                         style={{height: 'calc(100vh - 110px)'}}>
                        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4 max-h-[80vh] overflow-y-auto">
                            <h1 className="text-2xl font-bold text-center mb-4">Mes demandes d'amis</h1>
                            <table className="table-auto w-full text-center border-collapse">
                                <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6">#</th>
                                    <th className="py-3 px-6">Identifiant Utilisateur</th>
                                    <th className="py-3 px-6">Accepter ?</th>
                                </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                {people.sort((a,b) => Date.parse(b.requestedAt) - Date.parse(a.requestedAt)).map((person, index) => (
                                    <tr key={person.id} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6">{index + 1}</td>
                                        <td className="py-3 px-6 font-semibold">{person.senderId}</td>
                                        <td className="py-3 px-6">
                                            <button
                                                type="submit"
                                                className="hover:scale-110 transition-transform"
                                                onClick={() => handleAddAcceptRequest(person.id)}

                                            >
                                                <img
                                                    alt="accept"
                                                    src={imgValidate}
                                                    className="w-9 h-9 mx-auto"
                                                />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <FriendNotification/>
                        <FriendAccept/>
                    </div>

                </div>
            </div>
        </>
    );
}

export default FriendsRequest;
