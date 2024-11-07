import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider, LoaderFunction } from "react-router-dom";

import Register from "../components/Register";
import Login from "../components/Login";
import ConversationPage from "../components/ConversationPage";
import ConversationsList from "../components/ConversationList";
import RequireAuth from "../components/RequireAuth";

import FriendsRequest from "../components/FriendsRequest";
import { useStore } from "../Store/Store";
import { MessageBO } from "../business/MessageBO";
import { SocialBO } from "../business/SocialBO";

const conversationLoader: LoaderFunction = async ({ params }) => {
	const id = params.id;
	if (id == undefined) return 0;

	const BO = new MessageBO(useStore);
	BO.LoadMessages(id);

	return 0;
};

const friendLoader: LoaderFunction = async ({ params }) => {
	const BO = new SocialBO(useStore);
	BO.LoadFriends();

	return 0;
}

const friendRequestLoader: LoaderFunction = async ({ params }) => {
	const BO = new SocialBO(useStore);
	BO.LoadFriendRequests();

	return 0;
}

  
const router = createBrowserRouter([
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/chat",
		element: (
		<RequireAuth>
			<ConversationsList />
		</RequireAuth>
		),
		loader: friendLoader
	},
	{
		path: "/conversation/:id",
		element: <ConversationPage />,
		loader: conversationLoader,
	},
	{
		path: "/",
		element: <ConversationsList />,
	},
	{
		path: "/friendsRequest",
		element: <FriendsRequest />,
		loader: friendRequestLoader
	},
]);

const Router: React.FC = () => (
	<RouterProvider router={router} />
);
  
export default Router;