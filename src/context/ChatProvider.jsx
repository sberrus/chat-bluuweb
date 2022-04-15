import React, { useEffect, useState } from "react";
//Firebase
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";

export const ChatContext = React.createContext();

const ChatProvider = ({ children }) => {
	const userInitialData = { uid: null, email: null, state: false, loading: false };
	const [user, setUser] = useState(userInitialData);

	const detectUser = () => {
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				const uid = user.uid;
				const email = user.email;
				const state = true;
				setUser({ uid, email, state: state });
			} else {
				// User is signed out
				setUser(userInitialData);
			}
		});
	};

	const logInUser = () => {
		//Loading
		setUser({ ...user, loading: true });
		//
		const auth = getAuth();
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then((result) => {
				// The signed-in user info.
				const user = result.user;

				setUser({ ...user, state: true, loading: false });
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				console.error({ errorCode, errorMessage });
			});
	};
	const logOutUser = () => {
		setUser({ ...user, loading: true });
		const auth = getAuth();
		signOut(auth)
			.then(() => {
				// Sign-out successful.
				setUser(userInitialData);
			})
			.catch((error) => {
				// An error happened.
				console.error(error);
			});
	};

	useEffect(() => {
		detectUser();

		return () => {};
	}, []);

	return <ChatContext.Provider value={{ user, logInUser, logOutUser }}>{children}</ChatContext.Provider>;
};

export default ChatProvider;
