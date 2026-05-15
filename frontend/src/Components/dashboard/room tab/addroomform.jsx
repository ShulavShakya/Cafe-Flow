import { useState } from "react";
import { privateAPI } from "../../../auth/config/api";

const VALID_STATUSES = ["Available", "Occupied", "Cleaning", "Reserved"];

function AddRoomForm({ close }) {
  const [roomNumber, setRoomNumber] = useState("");
  const [category, setCategory] = useState("");
  const [capacity, setCapacity] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [status, setStatus] = useState("Available");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setRoomNumber("");
    setCategory("");
    setCapacity("");
    setPricePerNight("");
    setStatus("available");
    setMsg("");
    close();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!roomNumber || !pricePerNight || !capacity) {
      setMsg("All fields are required.");
      return;
    }
    if (isNaN(pricePerNight) || Number(pricePerNight) <= 0) {
      setMsg("Price must be a positive number.");
      return;
    }
    if (isNaN(capacity) || Number(capacity) <= 0) {
      setMsg("Capacity must be a positive number.");
      return;
    }

    try {
      setLoading(true);
      const res = await privateAPI.post("/rooms/", {
        room_number: roomNumber,
        category: category || undefined,
        capacity: capacity ? Number(capacity) : undefined,
        price_per_night: Number(pricePerNight),
        status:
          status?.charAt(0).toUpperCase() + status?.slice(1).toLowerCase() ||
          undefined,
      });
      console.log("Success:", res.data);
      resetForm();
    } catch (err) {
      console.log("Error:", err.response?.data); // ← and this
      setMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl w-80">
        <h2 className="text-[19px] font-bold mb-4">Add New Room</h2>

        <form onSubmit={handleSubmit}>
          <p className="font-medium mb-2 text-[16px] text-gray-600">
            Room Number
          </p>
          <input
            type="number"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            required
            className="w-full border-2 p-2 mb-3 rounded-lg"
          />

          <p className="font-medium mb-2 text-[16px] text-gray-600">Category</p>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border-2 p-2 mb-3 rounded-lg"
          />

          <p className="font-medium mb-2 text-[16px] text-gray-600">
            Number of Beds
          </p>

          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="w-full border-2 p-2 mb-3 rounded-lg"
          />

          <p className="font-medium mb-2 text-[16px] text-gray-600">
            Price per Night (Rs)
          </p>
          <input
            type="number"
            value={pricePerNight}
            onChange={(e) => setPricePerNight(e.target.value)}
            required
            className="w-full border-2 p-2 mb-3 rounded-lg"
          />

          <p className="font-medium mb-2 text-[16px] text-gray-600">Status</p>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border-2 p-2 mb-3 rounded-lg"
          >
            {VALID_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <p className="text-red-500 font-medium text-sm mb-4">{msg}</p>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={resetForm}
              className="bg-red-400 text-white font-medium rounded-xl px-3 py-2 hover:bg-red-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-3 py-2 bg-green-400 text-white font-medium rounded-xl hover:bg-green-500 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRoomForm;
