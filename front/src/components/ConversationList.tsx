import React from "react";
import { AuthService } from "../Services/AuthService"; 
import { useNavigate } from "react-router-dom";
import friendsRequest from "../img/friendsRequest.png"
import { useStore } from "../Store/Store";
import { OrderDatesDescending } from "../Utility/Dates";
import { IFriend } from "../Models/Social";
import { SocialBO } from "../business/SocialBO";
import { useState, useEffect } from 'react';

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

	const BO = new SocialBO(useStore);

	BO.LoadFriends();

	const friends = OrderDatesDescending(useStore((state) => state.friends), (a: IFriend) => a.startedAt);

	const friendRequestsCount = useStore((state) => state.friendRequests.length);

	const handleLogout = async () => {
		const success = await AuthService.Logout();

		if (success) {
			console.log("Déconnexion réussie");
			navigate("/login");
		} else {
			console.log("Erreur");
		}
	};

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

	// Gérer la détection de la largeur d'écran
	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 900);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handleConversationClick = (id: string | number, name: string) => {
		navigate(`/conversation/${id}`, { state: { name }});
	};

	return (

		<div className="flex flex-col w-80 h-screen bg-gray-100 border-r">
			<div className="flex flex-row justify-between w-full">
				{isMobile ? (
					<h2 className="p-4 text-lg font-semibold text-gray-700 border-b">Conversations</h2>
				) : (
					<h2 className="p-4 text-2xl font-semibold text-gray-700 border-b">Conversations</h2>
				)}
				<div className="relative"> {/* Conteneur pour positionner la bulle */}
					{isMobile ? (
						<button
							type="button"
							className="p-4 hover:scale-105 transition-transform"
							onClick={() => navigate("/friendsRequest")}
						>
							<img
								alt="accept"
								src={friendsRequest}
								className="w-9 h-9 mx-auto"
							/>
						</button>
					) : (
						<button
							type="button"
							className="p-4 hover:scale-105 transition-transform pl-5"
							onClick={() => navigate("/friendsRequest")}
						>
							<img
								alt="accept"
								src={friendsRequest}
								className="w-9 h-9 mx-auto"
							/>
						</button>
					)}


					{/* Bulle de notification en haut à droite du bouton */}
					{friendRequestsCount > 0 && (
						<span
							className="absolute top-5 right-1 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
						>
                			{friendRequestsCount}
            			</span>)}
				</div>
			</div>

			{false &&
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
			}
			<div className="overflow-y-auto flex-grow">
				{friends.map((friend) => (
					<div
						key={friend.userId}
						className="flex items-center justify-between p-4 hover:bg-gray-200 cursor-pointer transition-colors duration-200"
						onClick={() => handleConversationClick(friend.userId, friend.username)}
					>
						<div>
							<h3 className="text-lg font-medium text-gray-800">{friend.username}</h3>
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
