import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Register from "../components/Register";
import Login from "../components/Login";
const Router: React.FC = () => (
	<BrowserRouter>
		<Routes>
			<Route path='/register' element={<Register />} />
			<Route path='/login' element={<Login />} />

		</Routes>
	</BrowserRouter>
);

export default Router;
