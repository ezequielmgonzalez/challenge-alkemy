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
    category: {},
    categoryId: 1,
    typeM: "I",
    dateM: new Date().toISOString(),
  },
}) {
  const [show, setShow] = React.useState(false);

  const [amount, setAmount] = React.useState(list.amount);
  const [concept, setConcept] = React.useState(list.concept);
  const [category, setCategory] = React.useState(list.category);
  const [categoryId, setCategoryId] = React.useState(list.categoryId);
  const [typeM, setTypeM] = React.useState(list.typeM);
  const [dateM, setDateM] = React.useState(list.dateM.substring(0, 10));

  const [categories, setCategories] = React.useState([]);

  // Gets all the categories
  const getCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/categories");
      const jsonData = await response.json();
      setCategories(jsonData);
    } catch (e) {
      console.error(e.message);
    }
  };

  React.useEffect(() => {
    getCategories();
  }, []);

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
            onSubmit={(e) => {
              console.log("ONSUBMITTT");
              onSubmitForm(e, { amount, concept, categoryId, typeM, dateM });
            }}
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
            <Form.Label>Category</Form.Label>
            <Form.Select
              className="mb-3"
              defaultValue={categoryId}
              onChange={(e) => {
                console.log(e.target);
                setCategoryId(e.target.value);
              }}
            >
              {categories.map((category) => (
                <option value={category.category_id}>{category.name}</option>
              ))}
            </Form.Select>
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
