import { useEffect, useState } from "react";
import { supabase } from "./Supabase";
import "./expence.css";

function expence() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("expenses").select("*");

      if (error) {
        console.error("Error fetching expenses:", error);
      } else {
        setExpenses(data);
      }
      setLoading(false);
    };

    fetchExpenses();
  }, []);

  return (
    <>
      <h1>Expenses</h1>
    <div className="parent">

      {loading ? (<p>Loading...</p>) : (
        
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>To/From</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.Date}</td>
                <td>{item["To/From"]}</td>
                <td>${item.Amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

        <div className="insetBox">

        </div>
    </div>


    </>
  );
}

export default expence;
