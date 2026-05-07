import { useState } from "react";

function AddRoomForm({close }) {
  const [capacity, setCapacity] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [msg, setMsg] = useState("");

  const resetForm = () => {
    setRoomNumber("");
    setCapacity("");
    setMsg("");
    close();
  }
  
  const validateInput = () => {
    if (!capacity || !roomNumber) {
      setMsg("Must enter all the fields");
      return;
    }
    //send to backend
    resetForm();
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">

      <div className="bg-white p-6 rounded-2xl w-80">
        <h2 className="text-[19px] font-bold mb-4">Add New Room</h2>

        <p className="font-medium mb-2 text-[16px] text-gray-600">Room Number</p>

        <input
          type="number"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          className="w-full border-2 p-2 mb-3 rounded-lg"
        />
        
        <p className="font-medium mb-2 text-[16px] text-gray-600">Number of beds</p>

        <input
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          className="w-full border-2 p-2 mb-3 rounded-lg"
        />

        <p className="text-red-500 font-medium text-sm mb-6">{msg}</p>

        <div className="flex justify-between items-center">

          <button
            onClick={resetForm}
            className="bg-red-400 text-white font-medium rounded-xl 
            px-3 py-2 hover:bg-red-500">
            Cancel
          </button>

          <button
            onClick={validateInput}
            className="px-3 py-2 bg-green-400 text-white font-medium 
            rounded-xl hover:bg-green-500">
            Confirm
          </button>

        </div>

      </div>

    </div>
  );
}

export default AddRoomForm