// src/components/transaction-details-form.jsx

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const TransactionDetailsForm = ({ onSubmit }) => {
  const [transactionData, setTransactionData] = useState({
    transaction_id: "",
    name: "",
    date: "",
    amount: "",
    status: "pending", // default status
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransactionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(transactionData);
    if (onSubmit) onSubmit(transactionData); // Pass the form data to parent onSubmit handler
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="transaction_id" className="block">Transaction ID</label>
        <Input
          id="transaction_id"
          name="transaction_id"
          value={transactionData.transaction_id}
          onChange={handleChange}
          placeholder="Transaction ID"
        />
      </div>

      <div>
        <label htmlFor="name" className="block">Name</label>
        <Input
          id="name"
          name="name"
          value={transactionData.name}
          onChange={handleChange}
          placeholder="Name"
        />
      </div>

      <div>
        <label htmlFor="date" className="block">Date</label>
        <Input
          id="date"
          name="date"
          value={transactionData.date}
          onChange={handleChange}
          placeholder="Date"
        />
      </div>

      <div>
        <label htmlFor="amount" className="block">Amount</label>
        <Input
          id="amount"
          name="amount"
          value={transactionData.amount}
          onChange={handleChange}
          placeholder="Amount"
        />
      </div>

      <div>
        <label htmlFor="status" className="block">Status</label>
        <select
          id="status"
          name="status"
          value={transactionData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
};
