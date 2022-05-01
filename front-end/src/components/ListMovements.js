import React from "react";
import { Table, Button, Form } from "react-bootstrap";
import EditMovement from "./EditMovement";
import { FaTrashAlt } from "react-icons/fa";
// import TableRow from "./TableRow";

// Creates a table with the requested movements (either all or filtered)
const ListMovements = () => {
  const [list, setList] = React.useState([]);
  const [categories, setCategories] = React.useState([]);

  // Save filters on states
  const [filterType, setFilterType] = React.useState("none");
  const [filterCategory, setFilterCategory] = React.useState("none");

  // Get a list of all movements (NOT NEEDED ANYMORE)
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
  const getMovementsByType = async (type, category) => {
    try {
      let conditions = {};
      if (type !== "none" && type !== undefined) {
        conditions["type"] = type;
      }
      if (category !== "none" && category !== undefined) {
        conditions["category"] = category;
      }
      console.log(conditions);
      const response = await fetch(
        "http://localhost:5000/movements/filters?" +
          new URLSearchParams({
            ...conditions,
          })
      );
      const jsonData = await response.json();
      console.log(jsonData);
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

  // Makes a fetch request tou our REST api everytime this is component is rendered
  React.useEffect(() => {
    getMovements();
    getCategories();
  }, []);

  return (
    <React.Fragment>
      <Form.Select
        className="justify-content-end mb-3"
        aria-label="Default select example"
        onChange={(e) => {
          setFilterType(e.target.value);
          getMovementsByType(e.target.value, filterCategory);
        }}
      >
        <option value="none">Incomes and Outcomes</option>
        <option value="I">Incomes</option>
        <option value="O">Outcomes</option>
      </Form.Select>{" "}
      <Form.Select
        className="justify-content-end mb-3"
        aria-label="Default select example"
        onChange={(e) => {
          setFilterCategory(e.target.value);
          getMovementsByType(filterType, e.target.value);
        }}
      >
        <option value="none">Choose a category...</option>
        {categories.map((category) => (
          <option value={category.category_id}>{category.name}</option>
        ))}
      </Form.Select>{" "}
      <Table borderless hover responsive="md">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Concept</th>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list.map((list) => (
            <tr key={list.movement_id}>
              <td className={list.typeM === "O" ? "negative" : "positive"}>
                {list.typeM === "O" ? "-" : ""}${list.amount}
              </td>
              <td>{list.concept}</td>
              <td>{list.dateM.substring(0, 10)}</td>
              <td>{list.typeM === "O" ? "Outcome" : "Income"}</td>
              <td>{list.category.name}</td>
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
            // <TableRow
            //   complete="true"
            //   list={list}
            //   onRemove={() => deleteMovement(list.movement_id)}
            // />
          ))}
        </tbody>
      </Table>
    </React.Fragment>
  );
};

export default ListMovements;
