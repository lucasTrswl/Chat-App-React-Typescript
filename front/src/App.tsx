import React from "react";
import "./App.css";
import "./";
import Router from "./Routes/Router";
import { Notifications } from "./Notifications/Notification";
import { useStore } from "./Store/Store";

function App() {

	const notification = new Notifications(useStore)
	
	return <Router />;
	

}

export default App;
