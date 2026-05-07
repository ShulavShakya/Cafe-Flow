import { useState } from "react";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function StatusForm({ table, changeTableStatus, close }) {
  const [status, setStatus] = useState(table.status);
  const [customerName, setCustomerName] = useState("");
  const [guestArrivalDate,setGuestArrivalDate]=useState(null);
  const [msg, setMsg] = useState("");

  const nameRegex=/^[a-zA-Z\s]+$/;

  const resetForm = () => {
    setMsg("");
    setCustomerName("");
    setGuestArrivalDate(null);
    setStatus(table.status);
    close();
  }

  const validateStatusForm = () => {
    if(status === "Occupied") {
      if(!customerName.trim() || !guestArrivalDate)
        {
          setMsg("All fields are required");
          return;
        }

      if (!nameRegex.test(customerName))
        {
          setMsg("Name field should only contain letters and spaces");
          return;
        }
    }
    
    /*send data to backend */
    changeTableStatus(table.id, status)
    resetForm();
  }


  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">

      <div className="bg-white p-6 rounded-2xl w-90">
        <h2 className="text-xl font-bold mb-4">Select Table Status</h2>

        {/* Status Selection */}
        <div className="flex items-center gap-3 mb-5"> 
            <div className="flex items-center gap-1">
                <input
                    type="radio"
                    name="status"
                    value="Available"
                    checked={status === "Available"}
                    onChange={(e) => setStatus(e.target.value)}
                />
                <p>Available</p>
            </div>

            <div className="flex items-center gap-1">
                <input
                    type="radio"
                    name="status"
                    value="Occupied"
                    checked={status === "Occupied"}
                    onChange={(e) => setStatus(e.target.value)}
                />
                <p>Occupied</p>
            </div>

        </div>

        {/*Customer details */}
        {(status === "Occupied") && (
          <div className="mb-5">
            <p className="font-medium ">Occupied by:</p>
            <input
              type="text"
              placeholder="Customer name"
              className="border-2 p-2 mt-2 mb-3 rounded-lg w-full"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />

            <p className="font-medium">Date: </p>
            <DatePicker
                selected={guestArrivalDate}
                onChange={(date) => setGuestArrivalDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select date"
                className="border-2 p-2 mt-2 mb-3 rounded-lg w-full"
                wrapperClassName="w-full"
            />

            <p className="text-red-500 font-medium text-sm mt-2">{msg}</p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <button
            onClick={resetForm}
            className="bg-red-400 text-white font-medium rounded-xl 
            px-3 py-2 hover:bg-red-500">
            Cancel
          </button>

          <button
            onClick={validateStatusForm}
            className="px-3 py-2 bg-green-400 text-white font-medium 
            rounded-xl hover:bg-green-500">
            Confirm
          </button>
        </div>

      </div>

    </div>
  );
}

export default StatusForm