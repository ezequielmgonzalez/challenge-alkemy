import React from "react";
import { Table, Button, Form } from "react-bootstrap";
import EditMovement from "./EditMovement";
import { FaTrashAlt } from "react-icons/fa";

// Creates a table with the requested movements (either all or filtered)
const ListMovements = () => {
  const [list, setList] = React.useState([]);

  // Get a list of all movements
  const getMovements = async () => {
    try {
      const response = await fetch("http://localhost:5000/movements");
      const jsonData = await response.json();
      setList(jsonData);
    } catch (e) {
      console.error(e.message);
    }
  };

  // Get a list with only movements of requested type
  const getMovementsByType = async (t) => {
    try {
      const response = await fetch(`http://localhost:5000/movements/type/${t}`);
      const jsonData = await response.json();
      setList(jsonData);
    } catch (e) {
      console.error(e);
    }
  };

  // Deletes the selected movement
  const deleteMovement = async (id) => {
    try {
      await fetch(`http://localhost:5000/movements/${id}`, {
        method: "DELETE",
      });
      setList(list.filter((list) => list.movement_id !== id));
    } catch (e) {
      console.error(e.message);
    }
  };

  // Makes a fetch request tou our REST api everytime this is component is rendered
  React.useEffect(() => {
    getMovements();
  }, []);

  return (
    <React.Fragment>
      <Form.Select
        className="justify-content-end"
        aria-label="Default select example"
        onChange={(e) => {
          e.target.value !== "none"
            ? getMovementsByType(e.target.value)
            : getMovements();
        }}
      >
        <option value="none">Choose a type...</option>
        <option value="I">Incomes</option>
        <option value="O">Outcomes</option>
      </Form.Select>{" "}
      <Table borderless hover responsive="md">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Concept</th>
            <th>Date</th>
            <th>Type</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list.map((list) => (
            <tr key={list.movement_id}>
              <td className={list.typem === "O" ? "negative" : "positive"}>
                {list.typem === "O" ? "-" : ""}${list.amount}
              </td>
              <td>{list.concept}</td>
              <td>{list.datem.substring(0, 10)}</td>
              <td>{list.typem === "O" ? "Outcome" : "Income"}</td>
              <td>
                <EditMovement list={list} />
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => deleteMovement(list.movement_id)}
                >
                  <FaTrashAlt /> Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </React.Fragment>
  );
};

export default ListMovements;
