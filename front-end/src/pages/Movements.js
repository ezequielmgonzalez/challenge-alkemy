import React from "react";
import InputMovement from "../components/InputMovement";
import ListMovements from "../components/ListMovements";
import { Container } from "react-bootstrap";

function Movements() {
  return (
    <Container>
      <div className="App">
        <h1>Movements</h1>
        <InputMovement />
        <ListMovements />
      </div>
    </Container>
  );
}

export default Movements;
