import { addDoc, collection, doc, getFirestore } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { ChatContext } from "../../../../context/ChatProvider";

const InputForm = () => {
	const { user } = useContext(ChatContext);

	const messageInitialData = {
		body: "",
		date: 0,
		owner: user.uid,
		state: true,
	};

	const [message, setMessage] = useState("");

	const sendMessage = async () => {
		const payload = {
			...messageInitialData,
			body: message,
			date: Date.now(),
		};

		const db = getFirestore();
		// Add a new document in collection "chat"
		await addDoc(collection(db, "chat"), payload);
	};

	const handleMessageUpdate = (e) => {
		setMessage(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		sendMessage();
	};

	return (
		<div className="position-absolute bottom-0 w-100">
			{/* text input form */}
			<div className="w-100 px-3 py-1 border-top pt-3">
				<form className="d-flex" onSubmit={handleSubmit}>
					<input
						type="text"
						className="w-100 form-control me-1"
						value={message}
						onChange={(e) => {
							handleMessageUpdate(e);
						}}
					/>
					<button className="btn btn-success px-4">
						<i className="bi bi-send"></i>
					</button>
				</form>
			</div>
		</div>
	);
};

export default InputForm;
