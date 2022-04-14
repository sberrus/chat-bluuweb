import React, { useEffect } from "react";
//Components
import NavbarComponent from "./components/NavbarComponent/NavbarComponent";
//Contexts
import { ChatContext } from "./context/ChatProvider";

function App() {
	const { user } = React.useContext(ChatContext);

	useEffect(() => {
		console.log(user);
		return () => {};
	}, []);
	return (
		<div className="vh-100 bg-dark text-light">
			<NavbarComponent />
			<div className="d-flex align-items-center justify-content-center h-100 "> hola</div>
		</div>
	);
}

export default App;
