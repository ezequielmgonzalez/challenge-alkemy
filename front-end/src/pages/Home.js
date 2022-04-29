import React from "react";
// import PreviewMovements from "../components/PreviewMovements";
import CurrentBalance from "../components/CurrentBalance";
import { Container } from "react-bootstrap";

function Home() {
  return (
    <Container>
      <div className="App">
        <h1>Home</h1>
        <CurrentBalance />
        {/* <PreviewMovements /> */}
      </div>
    </Container>
  );
}

export default Home;
