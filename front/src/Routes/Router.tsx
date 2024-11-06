import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "../components/Register";
import Login from "../components/Login";
import ConversationPage from "../components/ConversationPage";
import ConversationsList from "../components/ConversationList";
import RequireAuth from "../components/RequireAuth";

import FriendsRequest from "../components/FriendsRequest";

const Router: React.FC = () => (
	<BrowserRouter>
		<Routes>
			<Route path='/register' element={<Register />} />
			<Route path='/login' element={<Login />} />
			<Route 
				path="/chat" 
				element={
					<RequireAuth>
						<ConversationsList />
					</RequireAuth>
				} 
			/>
			<Route path="/conversation/:id" element={<ConversationPage/>}/>
			<Route path='/' element={< ConversationsList/>}/>
			<Route path='/friendsRequest' element={<FriendsRequest/>}/>
		</Routes>
	</BrowserRouter>
);

export default Router;
