import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import VerticalTab from './VerticalTab';
import { format } from 'date-fns';



export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  useEffect(() => {
    loadExpenses();
  }, [selectedTabIndex]);

  const loadExpenses = async () => {
    try {

      const monthNames = [
        'January 2023',
        'February 2023',
        'March 2023',
        'April 2023',
        'May 2023',
        'June 2023',
        'July 2023',
        'August 2023',
        'September 2023',
      ];

      const selectedMonth = monthNames[selectedTabIndex];

      const result = await axios.get("http://localhost:8080/expensetracker/v1/getData");
      if (Array.isArray(result.data.data)) {
        setExpenses(result.data.data);
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

  const handleTabChange = (tabIndex) => {
    setSelectedTabIndex(tabIndex); // Update the selected tab index
  };

  return (
    <div className="container">
      <div className="py-4">
      <VerticalTab onChangeTab={handleTabChange} selectedTabIndex={selectedTabIndex} />
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
  );
}