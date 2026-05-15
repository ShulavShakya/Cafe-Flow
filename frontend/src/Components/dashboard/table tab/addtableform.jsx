import { useState } from "react";
import { useTables } from "../../../hooks/usetable";
import { privateAPI } from "../../../auth/config/api.js";

function AddTableForm({ close }) {
  const [capacity, setCapacity] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [msg, setMsg] = useState("");

  const { fetchTables } = useTables();

  const resetForm = () => {
    setTableNumber("");
    setCapacity("");
    setMsg("");
    close();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tableNumber.trim() || !capacity.trim()) {
      setMsg("All fields are required");
      return;
    }
    if (isNaN(tableNumber) || Number(tableNumber) <= 0) {
      setMsg("Table number must be a positive number");
      return;
    }
    if (isNaN(capacity) || Number(capacity) <= 0) {
      setMsg("Capacity must be a positive number");
      return;
    }

    try {
      await privateAPI.post("/tables/", {
        table_number: tableNumber,
        capacity: capacity,
        status: "Available",
      });
      resetForm();
      fetchTables();
    } catch (error) {
      setMsg("Error occurred while adding the table");
    }
    // On error:
    // setMsg("Error occurred while adding the table");
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl w-80">
        <h2 className="text-[19px] font-bold mb-4">Add New Table</h2>

        <p className="font-medium mb-2 text-[16px] text-gray-600">
          Table Number
        </p>

        <input
          type="number"
          value={tableNumber}
          placeholder="Enter table number"
          onChange={(e) => setTableNumber(e.target.value)}
          className="w-full border p-2 mb-3 rounded-lg"
        />

        <p className="font-medium mb-2 text-[16px] text-gray-600">
          Seating Capacity
        </p>

        <input
          type="number"
          value={capacity}
          placeholder="Enter seating capacity"
          onChange={(e) => setCapacity(e.target.value)}
          className="w-full border p-2 mb-3 rounded-lg"
        />

        <p className="text-red-500 font-medium text-sm mb-6">{msg}</p>

        <div className="flex justify-between items-center">
          <button
            onClick={resetForm}
            className="bg-red-400 text-white font-medium rounded-xl 
            px-3 py-2 hover:bg-red-500"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-3 py-2 bg-green-400 text-white font-medium 
            rounded-xl hover:bg-green-500"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTableForm;
