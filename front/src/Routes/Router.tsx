import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Register from "../components/Register";
import Login from "../components/Login";
import ConversationPage from "../components/ConversationPage";
import ConversationsList from "../components/ConversationList";
import FriendsRequest from "../components/FriendsRequest";


const Router: React.FC = () => (
	<BrowserRouter>
		<Routes>
			<Route path='/register' element={<Register />}/>;
			<Route path='/' element={<Login />}/>
			<Route path='/chat' element={< ConversationsList/>}/>
			<Route path="/conversation/:id" element={<ConversationPage/>}/>
			<Route path='/login' element={<Login />}/>
			<Route path='/' element={< ConversationsList/>}/>
			<Route path='/friendsRequest' element={<FriendsRequest/>}/>
		</Routes>
	</BrowserRouter>
);

export default Router;
