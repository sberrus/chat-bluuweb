import React, { useEffect, useState } from "react";

//Firebase
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { onSnapshot, getFirestore, query, collection, orderBy, where } from "firebase/firestore";

export const ChatContext = React.createContext();

const ChatProvider = ({ children }) => {
	// user state
	const userInitialData = { uid: null, email: null, state: false, loading: false };
	const [user, setUser] = useState(userInitialData);

	// chat
	const [messages, setMessages] = useState([]);

	/**
	 * Detects if user is loged-in and save the sesion.
	 */
	const isLoggedIn = () => {
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
				setUser({ ...user, loading: false });
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

	/**
	 * Carga todos los mensajes del chat de firebase en tiempo real.
	 */
	const loadMessages = () => {
		const db = getFirestore();
		const chatCollection = query(collection(db, "chat"), orderBy("date", "asc"));
		const unsubscribe = onSnapshot(chatCollection, (chatColectionSnapshot) => {
			const chat = [];

			// pushin mesages to the chat
			chatColectionSnapshot.forEach((doc) => {
				chat.push(doc.data());
			});

			// Updating state
			setMessages(chat);
		});
	};

	useEffect(() => {
		// Dispatch every time the user interact with this provider.
		isLoggedIn();
		loadMessages();

		return () => {};
	}, []);

	return (
		<ChatContext.Provider value={{ user, googleLogInWithPopUp, logOutUser, messages }}>
			{children}
		</ChatContext.Provider>
	);
};

export default ChatProvider;
