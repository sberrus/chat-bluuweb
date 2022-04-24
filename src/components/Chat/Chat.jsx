import React from "react";
import { Badge, Container, ListGroup } from "react-bootstrap";

const Chat = () => {
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
					<div className="text-end m-2">
						<span className="badge bg-success p-2">mensaje usuario activo</span>
					</div>
					<div className="text-start m-2">
						<span className="badge bg-warning p-2">mensaje usuario externo</span>
					</div>
				</div>
				<div className="position-absolute bottom-0 w-100">
					{/* text input form */}
					<div className="w-100 px-3 py-1 border-top pt-3">
						<form className="d-flex">
							<input type="text" className="w-100 form-control me-1" />
							<button className="btn btn-success px-4">
								<i className="bi bi-send"></i>
							</button>
						</form>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default Chat;
