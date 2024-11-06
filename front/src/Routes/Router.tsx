import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "../components/Register";
import Login from "../components/Login";
import ConversationPage from "../components/ConversationPage";
import ConversationsList from "../components/ConversationList";
import RequireAuth from "../components/RequireAuth";

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
			<Route 
				path="/conversation/:id" element={<ConversationPage />} />
		</Routes>
	</BrowserRouter>
);

export default Router;
