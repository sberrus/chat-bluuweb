import React, { useEffect, useState } from "react";
//Firebase
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";

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
		//
		const auth = getAuth();
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;
				// The signed-in user info.
				const user = result.user;
				// ...

				console.log(user);
				setUser({ ...user, estado: true });
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				console.error({ errorCode, errorMessage });
			});
	};
	const logOutUser = () => {
		const auth = getAuth();
		signOut(auth)
			.then(() => {
				// Sign-out successful.
				setUser({ ...user, estado: false });
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
