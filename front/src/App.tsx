import React from "react";
import "./App.css";
import "./";
import Router from "./Routes/Router";
import { Notifications } from "./Notifications/Notification";
import { useStore } from "./Store/Store";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 

function App() {

	const notification = new Notifications(useStore)
	
	
	return (
		<><ToastContainer /><Router /></>
		
	) 
	

}

export default App;
