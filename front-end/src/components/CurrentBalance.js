import React from "react";

// Displays the current balance resulting from all transactions
function CurrentBalance() {
  const [balance, setBalance] = React.useState(0);
  // Get the account by doing a fetch to the back-end
  const getBalance = async () => {
    try {
      const response = await fetch("http://localhost:5000/movements/balance");
      const jsonData = await response.json();
      setBalance(jsonData);
    } catch (e) {
      console.error(e.message);
    }
  };

  // Makes a fetch request tou our REST api everytime this is component is rendered
  React.useEffect(() => {
    getBalance();
  }, []);

  return (
    <div>
      <h2 className="smallText mb-0">Current Balance</h2>
      <h2 className={`mt-0 balance ${balance <= 0 ? "negative" : "positive"}`}>
        {balance <= 0 ? `-$${Math.abs(balance)}` : `$${balance}`}
      </h2>
    </div>
  );
}

export default CurrentBalance;
