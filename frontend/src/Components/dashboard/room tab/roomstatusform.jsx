import { useState } from "react";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function RoomStatusForm({ room, changeRoomStatus, close }) {
  const [status, setStatus] = useState(room.status);
  const [customerName, setCustomerName] = useState("");
  const [guestArrivalDate,setGuestArrivalDate]=useState(null);
  const [guestArrivalTime,setGuestArrivalTime]=useState("");
  const [contactNumber,setContactNumber]=useState("");
  const [msg, setMsg] = useState("");

  const nameRegex=/^[a-zA-Z\s]+$/;
  const contactRegex=/^9\d{9}$/;

  const resetForm = () => {
    setMsg("");
    setCustomerName("");
    setStatus(room.status);
    setGuestArrivalDate(null);
    setGuestArrivalTime("");
    setContactNumber("");
    close();
  }

  const validateStatusForm = () => {
    if(status==="Occupied")
    {
      if(!customerName.trim() || !guestArrivalDate || !contactNumber || !guestArrivalTime)
        {
          setMsg("All fields are required");
          return;
        }

      if (!nameRegex.test(customerName))
        {
          setMsg("Name field should contain only letters and spaces");
          return;
        }
      
        if (!contactRegex.test(contactNumber))
        {
          setMsg("Invalid contact number");
          return;
        }
    }
    //send data to backend here
    changeRoomStatus( room.id, status )
    resetForm();
  }


  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">

      <div className="bg-white p-6 rounded-2xl w-90">
        <h2 className="text-xl font-bold mb-4">Select Room Status</h2>

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

            <div className="flex items-center gap-1">
              <input
                  type="radio"
                  name="status"
                  value="Cleaning"
                  checked={status === "Cleaning"}
                  onChange={(e) => setStatus(e.target.value)}
              />
              <p>Cleaning</p>
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
            
            <p className="font-medium ">Contact Number:</p>
            <input
              type="tel"
              placeholder="9XXXXXXXXX"
              className="border-2 p-2 mt-2 mb-3 rounded-lg w-full"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />

            <p className="font-medium ">Check-in Time:</p>
            <input
              type="time"
              className="border-2 p-2 mt-2 mb-3 rounded-lg w-full"
              value={guestArrivalTime}
              onChange={(e) => setGuestArrivalTime(e.target.value)}
            />

            <p className="font-medium"> Check-in Date:</p>
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

export default RoomStatusForm