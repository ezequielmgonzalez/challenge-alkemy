import React from "react";
import { Modal, Button, Form, InputGroup, FormControl } from "react-bootstrap";
import { FaPlusCircle, FaEdit } from "react-icons/fa";

// Modal with a form that will render depending on the props.
function ModalMovement({
  btnLabel,
  title,
  onSubmitForm,
  disableMovementType,
  list = {
    amount: 0,
    concept: "",
    typem: "I",
    datem: new Date().toISOString(),
  },
}) {
  const [show, setShow] = React.useState(false);

  const [amount, setAmount] = React.useState(list.amount);
  const [concept, setConcept] = React.useState(list.concept);
  const [typeM, setTypeM] = React.useState(list.typem);
  const [dateM, setDateM] = React.useState(list.datem.substring(0, 10));

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        className="mb-3"
        variant={btnLabel === "+" ? "primary" : "secondary"}
        onClick={handleShow}
      >
        {btnLabel === "+" ? (
          <>
            <FaPlusCircle /> New{" "}
          </>
        ) : (
          <>
            <FaEdit /> {btnLabel}
          </>
        )}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => onSubmitForm(e, { amount, concept, typeM, dateM })}
          >
            <Form.Label>Amount</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text>$</InputGroup.Text>
              <FormControl
                value={amount}
                type="number"
                onChange={(e) => setAmount(e.target.value)}
                aria-label="Amount (to the nearest dollar)"
              />
            </InputGroup>

            <Form.Label>Concept</Form.Label>
            <InputGroup className="mb-3">
              <FormControl
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            <Form.Label>Type of Operation</Form.Label>
            <div
              key={`inline-radio`}
              className="mb-3"
              value={typeM}
              onChange={(e) => setTypeM(e.target.value)}
            >
              <Form.Check
                inline
                disabled={disableMovementType}
                checked={typeM === "I"}
                label="Income"
                name="group1"
                type="radio"
                id={`inline-radio-1`}
                value="I"
              />
              <Form.Check
                inline
                disabled={disableMovementType}
                checked={typeM === "O"}
                label="Outcome"
                name="group1"
                type="radio"
                id={`inline-radio-2`}
                value="O"
              />
            </div>

            <Form.Label>Date</Form.Label>
            <FormControl
              className="mb-3"
              type="date"
              value={dateM}
              onChange={(e) => setDateM(e.target.value)}
            ></FormControl>

            <Button className="mb-3" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalMovement;
