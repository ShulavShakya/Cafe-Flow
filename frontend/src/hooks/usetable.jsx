import { useState } from "react";

export function useTables(){

    const [tables, setTables] = useState([
    { id: 1, tableNo: 4, capacity: 2, status: "Available", details: null},
    { id: 2, tableNo: 2, capacity: 4, status: "Available", details: null},
    { id: 3, tableNo: 3, capacity: 4, status: "Available", details: null},
    { id: 4, tableNo: 1, capacity: 1, status: "Available", details: null},
  ]);

  const changeTableStatus = (id, status) => {
    setTables(prev =>
      prev.map(table =>
        table.id === id
          ? { ...table, status }
          : table
      )
    );
  };

  const assignTable = (tableNo, reservationData) => {
    setTables(prev =>
      prev.map(table =>
        table.tableNo === tableNo
          ? {
              ...table,
              status: "Reserved",
              details: reservationData,
            }
          : table
      )
    );
  };

  const deleteTable = (id) => {
    setTables(prev => prev.filter( table=>table.id !== id ))
  }

  return {tables, setTables, changeTableStatus, deleteTable, assignTable};
} 