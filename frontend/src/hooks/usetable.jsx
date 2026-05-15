import { useState } from "react";
import { privateAPI } from "../auth/config/api.js";

export function useTables() {
  //   const [tables, setTables] = useState([
  //   { id: 1, tableNo: 4, capacity: 2, status: "Available", details: null},
  //   { id: 2, tableNo: 2, capacity: 4, status: "Available", details: null},
  //   { id: 3, tableNo: 3, capacity: 4, status: "Available", details: null},
  //   { id: 4, tableNo: 1, capacity: 1, status: "Available", details: null},
  // ]);

  const [tables, setTables] = useState([]);

  const fetchTables = async () => {
    try {
      const res = await privateAPI.get("/tables/");
      setTables(res.data.data);
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };

  const changeTableStatus = (id, status) => {
    setTables((prev) =>
      prev.map((table) =>
        table.table_id === id ? { ...table, status } : table,
      ),
    );
  };

  const assignTable = (tableNo, reservationData) => {
    setTables((prev) =>
      prev.map((table) =>
        table.tableNo === tableNo
          ? {
              ...table,
              status: "Reserved",
              details: reservationData,
            }
          : table,
      ),
    );
  };

  const deleteTable = async (id) => {
    try {
      const res = await privateAPI.delete(`/tables/${id}`);
      fetchTables();
      // setTables((prev) => prev.filter((table) => table.id !== id));
    } catch (error) {
      console.error("Error deleting table:", error);
    }
  };

  return { tables, fetchTables, changeTableStatus, deleteTable, assignTable };
}
