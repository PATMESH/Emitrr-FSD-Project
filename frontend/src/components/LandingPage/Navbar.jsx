import React from "react";
import { Navbar, Nav, Button, NavDropdown } from "react-bootstrap";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";

const CustomNavbar = ({ page }) => {
  const name = localStorage.getItem("name");
  const isAuthenticated = !!name;
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/login");
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      fixed="top"
      className="custom-navbar"
    >
      <Navbar.Brand>LangVerse</Navbar.Brand>
      <Navbar.Collapse id="navbar-nav">
        {page === "home" ? (
          <Nav className="ml-auto">
            <Link
              to="learnmore"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              <Nav.Link>About Us</Nav.Link>
            </Link>
            <Link
              to="contact"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              <Nav.Link>Contact</Nav.Link>
            </Link>
            <Link
              to="login"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              <Button
                className="btn-get-started"
                variant="outline-info"
                onClick={handleGetStartedClick}
              >
                Get Started
              </Button>
            </Link>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            {isAuthenticated ? (
              <NavDropdown title="Custom Dropdown" id="basic-nav-dropdown">
                {/* Dropdown items go here */}
              </NavDropdown>
            ) : (
              <>
                <Link
                  to="login"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  <Button
                    className="btn-get-started"
                    variant="outline-info"
                    onClick={() => navigate("/")}
                  >
                    Home
                  </Button>
                </Link>
              </>
            )}
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
