import React from "react";
import ModalMovement from "./ModalMovement";

// Allows you to create new transactions that will be added to the list and will impact the current balance.
const InputMovement = () => {
  const onSubmitForm = async (e, movement) => {
    // Handle the form submitted

    // Prevent from refresh
    e.preventDefault();
    try {
      // const body = { amount, concept, typeM, dateM };
      await fetch("http://localhost:5000/movements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movement),
      });
      //  Once the response has been sent, itś going to refresh and show the changes
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <React.Fragment>
      <ModalMovement
        btnLabel="+"
        title="Input movement"
        onSubmitForm={onSubmitForm}
        disableMovementType={false}
      />
    </React.Fragment>
  );
};

export default InputMovement;
