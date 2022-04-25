import React, { useContext } from "react";
import { Badge, Container, ListGroup } from "react-bootstrap";
import { ChatContext } from "../../context/ChatProvider";
import InputForm from "./components/InputForm/InputForm";

const Chat = () => {
	const { messages, user } = useContext(ChatContext);

	return (
		<Container className="d-flex align-items-center justify-content-center h-100">
			{/* Chat container */}
			<div className="h-75 w-25 border">
				{/* contact list */}
				<ListGroup as="ol">
					<ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
						<div className="ms-2 me-auto">
							<div className="fw-bold">chat user 1</div>
							hola mundo!
						</div>
						<Badge bg="primary" pill>
							14
						</Badge>
					</ListGroup.Item>
					<ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
						<div className="ms-2 me-auto">
							<div className="fw-bold">chat user 1</div>
							hola mundo!
						</div>
						<Badge bg="primary" pill>
							14
						</Badge>
					</ListGroup.Item>
				</ListGroup>
			</div>

			<div className="h-75 w-75 border position-relative">
				{/* main chat */}
				<div>
					{/* conversation body */}

					{messages.map((message, idx) => {
						const owner = message.owner.slice(-5);
						const date = new Date(message.date);
						const hours = date.getHours();
						const minutes = date.getMinutes();

						return message.owner === user.uid ? (
							<div className="text-end m-2" key={idx}>
								{/* mensaje propio */}
								<p className="badge bg-success p-2 mt-1">
									<span className="text-end float-end">Yo</span> <br />
									<span className="text-dark">{message.body}</span> <br />
									<span className="float-end my-1">{`${hours}:${minutes}`}</span>
								</p>
							</div>
						) : (
							<div className="text-start m-2" key={idx}>
								{/* mensaje externo */}
								<p className="badge bg-warning p-2 mt-1">
									<span className="text-end float-end"> {`...${owner}`}</span> <br />
									<span className="text-dark">{message.body}</span> <br />
									<span className="float-end my-1">{`${hours}:${date.getMinutes()}`}</span>
								</p>
							</div>
						);
					})}
				</div>
				<InputForm />
			</div>
		</Container>
	);
};

export default Chat;
