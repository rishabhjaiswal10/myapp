import React, { useState } from 'react';
import './App.css';

function App() {
  const categories = ['S-Jumbo', 'Jumbo', '1', '2', '3'];
  const [data, setData] = useState({
    'S-Jumbo': { totalKgs: 0, totalPrice: 0, count: 0, history: [] },
    'Jumbo': { totalKgs: 0, totalPrice: 0, count: 0, history: [] },
    '1': { totalKgs: 0, totalPrice: 0, count: 0, history: [] },
    '2': { totalKgs: 0, totalPrice: 0, count: 0, history: [] },
    '3': { totalKgs: 0, totalPrice: 0, count: 0, history: [] },
  });

  const [inputs, setInputs] = useState({
    'S-Jumbo': { rate: '', kgs: '' },
    'Jumbo': { rate: '', kgs: '' },
    '1': { rate: '', kgs: '' },
    '2': { rate: '', kgs: '' },
    '3': { rate: '', kgs: '' },
  });

  const handleInputChange = (category, field, value) => {
    setInputs({
      ...inputs,
      [category]: {
        ...inputs[category],
        [field]: value,
      },
    });
  };

  const handleAdd = (category) => {
    const { rate, kgs } = inputs[category];
    const parsedRate = parseFloat(rate);
    const parsedKgs = parseFloat(kgs);

    if (isNaN(parsedRate) || isNaN(parsedKgs) || parsedRate <= 0 || parsedKgs <= 0) {
      alert('Please enter valid positive numbers for rate and kgs.');
      return;
    }

    const currentData = data[category];
    const newTotalKgs = currentData.totalKgs + parsedKgs;
    const newTotalPrice = currentData.totalPrice + (parsedRate * parsedKgs) / 10;
    const newCount = currentData.count + 1;

    const newHistory = [...currentData.history, { rate: parsedRate, kgs: parsedKgs }];

    setData({
      ...data,
      [category]: {
        totalKgs: newTotalKgs,
        totalPrice: newTotalPrice,
        count: newCount,
        history: newHistory,
      },
    });

    setInputs({
      ...inputs,
      [category]: { rate: '', kgs: '' },
    });
  };

  const getTotalKgsPurchased = () => {
    return categories.reduce((sum, category) => sum + data[category].totalKgs, 0).toFixed(2);
  };

  return (
    <div className="App">
      <h1>Chickoo Auction</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Rate per 10kg</th>
              <th>Amount in kgs</th>
              <th>Actions</th>
              <th>Total Kgs Purchased</th>
              <th>Average Rate per 10kg</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => {
              const { totalKgs, totalPrice, count } = data[category];
              const averageRate = count > 0 ? (totalPrice / (totalKgs / 10)).toFixed(2) : 0;
              return (
                <tr key={category}>
                  <td>{category}</td>
                  <td>
                    <input
                      type="number"
                      value={inputs[category].rate}
                      onChange={(e) => handleInputChange(category, 'rate', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={inputs[category].kgs}
                      onChange={(e) => handleInputChange(category, 'kgs', e.target.value)}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleAdd(category)}>Add</button>
                  </td>
                  <td>{totalKgs.toFixed(2)}</td>
                  <td>{averageRate}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4"></td>
              <td>Total Kgs Purchased: {getTotalKgsPurchased()}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <h2>History</h2>
      <div className="history-section">
        {categories.map((category) => {
          const { history } = data[category];
          return (
            <div key={category}>
              {history.length > 0 && (
                <>
                  <h3>History for {category}</h3>
                  <div className="history-table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Rate per 10kg</th>
                          <th>Amount in kgs</th>
                        </tr>
                      </thead>
                      <tbody>
                        {history.map((entry, index) => (
                          <tr key={index}>
                            <td>{entry.rate}</td>
                            <td>{entry.kgs}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
