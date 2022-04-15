import React, { useEffect } from "react";
import Chat from "./components/Chat/Chat";
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
			{user.state ? (
				<Chat />
			) : (
				<>
					<div className="d-flex align-items-center justify-content-center h-100">
						<h1 className="display-1">Debes iniciar sesión primero</h1>
					</div>
				</>
			)}
		</div>
	);
}

export default App;
