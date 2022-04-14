import React, { useEffect, useState } from "react";
//Firebase
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const ChatContext = React.createContext();

const ChatProvider = ({ children }) => {
	const userInitialData = { uid: null, email: null, estado: null };
	const [user, setUser] = useState(userInitialData);

	const detectUser = () => {
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				const uid = user.uid;
				const email = user.email;
				const estado = true;
				setUser({ uid, email, estado });
			} else {
				// User is signed out
				setUser(userInitialData);
			}
		});
	};

	const logInUser = () => {
		setUser({ ...user, estado: true });
	};
	const logOutUser = () => {
		setUser({ ...user, estado: false });
	};

	useEffect(() => {
		detectUser();

		return () => {};
	}, []);

	return <ChatContext.Provider value={{ user, logInUser, logOutUser }}>{children}</ChatContext.Provider>;
};

export default ChatProvider;
