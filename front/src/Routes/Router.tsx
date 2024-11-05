import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Register from "../components/Register";

const Router: React.FC = () => (
	<BrowserRouter>
		<Routes>
			<Route path='/register' element={<Register />} />
		</Routes>
	</BrowserRouter>
);

export default Router;
