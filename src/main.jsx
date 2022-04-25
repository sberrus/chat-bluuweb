import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
//Firebase
import "./firebase/firebase";
//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
//Contexts
import ChatProvider from "./context/ChatProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ChatProvider>
			<App />
		</ChatProvider>
	</React.StrictMode>
);
