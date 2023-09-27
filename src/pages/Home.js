import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { format } from 'date-fns';
import './VerticalTabs.css';
import VerticalTabs from './VerticalTabs';
import HomeBanner from './HomeBanner';
import { css } from "@emotion/react";
import { SyncLoader } from "react-spinners";

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [monthlystatement, setMonthlyStatement] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [showTables, setShowTables] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

  useEffect(() => {
    setIsLoading(true);
    loadExpenses(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  const loadExpenses = async (month, year) => {
    try {
      const result = await axios.get(`http://localhost:8080/expensetracker/api/v1/monthlystatement?month=${month}&year=${year}`);
      console.log("Status response:", result.status);
      console.log("API response:", result.data.data);
      if (Array.isArray(result.data.data)) {
        setExpenses(result.data.data[0].data);
        setMonthlyStatement(result.data.data);
        setShowTables(true);
      } else {
        console.error("Invalid API response:", result.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setShowTables(false);
      } else {
        console.error('Error loading expenses:', error);
      }
    }finally{
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd-MMMM-yyyy');
  };

  return (
    <div className="container">
        <div className="row">
      <div className="col-md-3">
         <VerticalTabs
            onChange={(month, year) => {
              setSelectedMonth(month);
              setSelectedYear(year);
            }}
          />
          </div>
        <div className="col-md-9">
          <HomeBanner selectedMonth={selectedMonth} />
          {isLoading ? ( // Display loading indicator
            // <div>Loading...</div>
            <div className="spinner-container">
            <SyncLoader
              css={override}
              size={10} // Adjust the size as needed
              color={"#36D7B7"} // Set the color of the spinner
            />
          </div>
) : showTables ? ( // Conditionally render tables or message
            <>

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
                <td>₹{statement.creditAmount}</td>
                <td>₹{statement.debitAmount}</td>
                <td>₹{statement.remainingAmount}</td>
               
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
                <td>₹{expense.amount}</td>
                <td>{expense.description}</td>
                <td>{formatDate(expense.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </>
          ) : (
            <div className="alert alert-danger" role="alert">
              No Data Available
            </div>
          )}
      </div>
    </div>
 
    </div>
  );
}