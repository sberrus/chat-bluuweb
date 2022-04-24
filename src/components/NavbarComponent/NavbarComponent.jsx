import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { ChatContext } from "../../context/ChatProvider";

const NavbarComponent = () => {
	const { user, googleLogInWithPopUp, logOutUser } = React.useContext(ChatContext);

	return (
		<Navbar bg="dark" variant="dark" expand="lg" className="border-bottom fixed-top w-100">
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
							<div>
								{user.state ? (
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
										disabled={user.loading}
										onClick={() => {
											googleLogInWithPopUp();
										}}
									>
										Iniciar Sesión
									</Button>
								)}
							</div>
						</div>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavbarComponent;
