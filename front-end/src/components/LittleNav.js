import React from "react";
import { Nav } from "react-bootstrap";

// Nav that allows you to navigate between Home and Movements
function LittleNav() {
  return (
    <Nav className="justify-content-center">
      <Nav.Item>
        <Nav.Link href="/" eventKey="/">
          Home
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/movements">Movements</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default LittleNav;
