import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { format } from 'date-fns';

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [monthlystatement, setMonthlyStatement] = useState([]);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/expensetracker/api/v1/monthlystatement?month=september&year=2023`);
      console.log("API response:", result.data.data);
      if (Array.isArray(result.data.data)) {
        setExpenses(result.data.data[0].data);
        setMonthlyStatement(result.data.data);
      } else {
        console.error("Invalid API response:", result.data);
      }
    } catch (error) {
      console.error("Error loading expenses:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd-MMMM-yyyy'); // Format the date as '31-July-2023'
  };

  return (
    <div className="container">
        <div className="row">
        
      
      <div className="py-4">
      <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">Credit <FontAwesomeIcon
                      icon={faArrowUp}
                      style={{ color: "green" }} 
                    /></th>
              <th scope="col">Debit <FontAwesomeIcon
                      icon={faArrowDown}
                      style={{ color: "red" }} 
                    /></th>
              <th scope="col">Remaining</th>
            </tr>
          </thead>
          <tbody>
            {monthlystatement.map((statement, index) => (
              <tr key={index}>
                <td>{statement.creditAmount}</td>
                <td>{statement.debitAmount}</td>
                <td>{statement.remainingAmount}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
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
                <td>{formatDate(expense.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  
    </div>
  );
}