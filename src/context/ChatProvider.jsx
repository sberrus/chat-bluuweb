import React, { useEffect, useState } from "react";
//Firebase
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";

export const ChatContext = React.createContext();

const ChatProvider = ({ children }) => {
	// initial state of the data
	const userInitialData = { uid: null, email: null, state: false, loading: false };

	// states
	const [user, setUser] = useState(userInitialData);

	/**
	 * Detects if user is signed in and save the sesión.
	 */
	const detectUser = () => {
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) {
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

	/**
	 * Firebase´s google log-in system with pop up.
	 */
	const googleLogInWithPopUp = () => {
		//Loading.
		setUser({ ...user, loading: true });

		//Firebase Log in.
		const auth = getAuth();
		const provider = new GoogleAuthProvider();

		signInWithPopup(auth, provider)
			.then((result) => {
				// The signed-in user info.
				const user = result.user;

				//Update State.
				setUser({ ...user, state: true, loading: false });
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				console.error({ errorCode, errorMessage });
			});
	};

	/**
	 * Firebase`s google log-out system.
	 */
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
		// Dispatch every time the user interact with this provider.
		detectUser();

		return () => {};
	}, []);

	return (
		<ChatContext.Provider value={{ user, googleLogInWithPopUp, logOutUser }}>
			{children}
		</ChatContext.Provider>
	);
};

export default ChatProvider;
