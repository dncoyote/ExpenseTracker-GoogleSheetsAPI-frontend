import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const result = await axios.get("http://localhost:8080/getData");
      if (Array.isArray(result.data.data)) {
        setExpenses(result.data.data);
      } else {
        console.error("Invalid API response:", result.data);
      }
    } catch (error) {
      console.error("Error loading expenses:", error);
    }
  };

  return (
    <div className="container">
        <div className="row">
        <div className="col-md-3">
          {/* Vertical Tab / Navigation */}
          <div className="vertical-tab">
            {/* Add your tab items here */}
            <div className="tab-item">August 2023</div>
            <div className="tab-item">September 2023</div>
            <div className="tab-item">October 2023</div>
          </div>
        </div>
        <div className="col-md-9">
          {/* Content */}
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Category</th>
              <th scope="col">Type</th>
              <th scope="col">Amount</th>
              <th scope="col">Description</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{expense.category}</td>
                <td>
                  {expense.type === "DEBIT" ? (
                    <FontAwesomeIcon
                      icon={faArrowDown}
                      style={{ color: "red" }} 
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faArrowUp}
                      style={{ color: "green" }} 
                    />
                  )}
                </td>
                <td>{expense.amount}</td>
                <td>{expense.description}</td>
                <td>{expense.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>
  );
}