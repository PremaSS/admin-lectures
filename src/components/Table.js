import React from 'react';
import './Table.css';

function Table({ data, columns }) {
  if (!data || data.length === 0) {
    return <p>No data available.</p>;
  }

  return (
    <table className="custom-table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column.key}>{column.render ? column.render(item) : item[column.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
