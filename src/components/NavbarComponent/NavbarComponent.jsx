import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { ChatContext } from "../../context/ChatProvider";

const NavbarComponent = () => {
	const { user, logInUser, logOutUser } = React.useContext(ChatContext);

	return (
		<Navbar bg="dark" variant="dark" expand="lg" className="border-bottom">
			<Container fluid>
				<Navbar.Brand href="#home">Chat Bluuweb</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="w-100 d-flex justify-content-between">
						<div className="d-flex">
							<Nav.Link href="#home">Home</Nav.Link>
							<Nav.Link href="#link">Link</Nav.Link>
						</div>
						<div className="d-flex">
							{user.estado ? (
								<Button
									variant="danger"
									onClick={() => {
										logOutUser();
									}}
								>
									<i className="bi bi-power"></i>
								</Button>
							) : (
								<Button
									variant="success"
									onClick={() => {
										logInUser();
									}}
								>
									Iniciar Sesión
								</Button>
							)}
						</div>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavbarComponent;
