import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider, LoaderFunction } from "react-router-dom";

import Register from "../components/Register";
import Login from "../components/Login";
import ConversationPage from "../components/ConversationPage";
import ConversationsList from "../components/ConversationList";
import FriendsRequest from "../components/FriendsRequest";

import { useStore } from "../Store/Store";
import { MessageBO } from "../business/MessageBO";
import { SocialBO } from "../business/SocialBO";
import { AuthBO } from "../business/AuthBO";

import RequireAuth from "../components/RequireAuth";
import AuthRedirect from "../components/AuthRedirect";
import Redirect from "../components/Redirect";

const conversationLoader: LoaderFunction = async (parameters) => {
	await authenticationLoader(parameters);
	
	const id = parameters.params.id;
	if (id == undefined) return 0;

	const BO = new MessageBO(useStore);
	BO.LoadMessages(id);

	return 0;
};

const friendLoader: LoaderFunction = async (parameters) => {
	await authenticationLoader(parameters);
	const BO = new SocialBO(useStore);
	BO.LoadFriends();

	return 0;
}

const friendRequestLoader: LoaderFunction = async (parameters) => {
	await authenticationLoader(parameters);

	const BO = new SocialBO(useStore);
	BO.LoadFriendRequests();

	return 0;
}



const authenticationLoader: LoaderFunction = async () => {
	const BO = new AuthBO(useStore);
	await BO.LoadUser();

	return 0;
}

  
const router = createBrowserRouter([
	{
		path: "/register",
		element: (
		<AuthRedirect>
			<Register />
		</AuthRedirect>
		),
	},
	{
		path: "/login",
		element: (
		<AuthRedirect>
			<Login />
		</AuthRedirect>
		),
	},
	{
		path: "/conversation",
		element: (
		<RequireAuth>
			<ConversationsList />
		</RequireAuth>
		),
		loader: friendLoader
	},
	{
		path: "/conversation/:id",
		element: (
		<RequireAuth>
			<ConversationPage />
		</RequireAuth>
		),
		loader: conversationLoader,
	},
	{
		path: "/",
		element: <Redirect/>,
		loader: authenticationLoader,
	},
	{
		path: "/friendsRequest",
		element: (
		<RequireAuth>
			<FriendsRequest />
		</RequireAuth>
		),
		loader: friendRequestLoader
	},
]);

const Router: React.FC = () => (
	<RouterProvider router={router} />
);
  
export default Router;