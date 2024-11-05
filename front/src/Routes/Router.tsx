import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Register from "../components/Register";
import Login from "../components/Login";
import ConversationsList from "../components/ConversationList";

const Router: React.FC = () => (
	<BrowserRouter>
		<Routes>
			<Route path='/register' element={<Register />}/>;
			<Route path='/' element={<Login />}/>
			<Route path='/chat' element={< ConversationsList/>}/>


		</Routes>
	</BrowserRouter>
);

export default Router;
