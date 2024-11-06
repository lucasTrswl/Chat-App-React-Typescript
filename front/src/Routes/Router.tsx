import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "../components/Register";
import Login from "../components/Login";
import ConversationPage from "../components/ConversationPage";
import ConversationsList from "../components/ConversationList";

const Router: React.FC = () => (
	<BrowserRouter>
		<Routes>
			<Route path='/register' element={<Register />}/>;
			<Route path='/login' element={<Login />}/>;
			<Route path="/chat" element={<ConversationsList/>}/>
			<Route path="/conversation/:id" element={<ConversationPage/>}/>
		</Routes>
	</BrowserRouter>
);
export default Router;