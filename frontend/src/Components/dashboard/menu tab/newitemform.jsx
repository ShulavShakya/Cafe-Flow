import { useState } from "react";
import { privateAPI } from "../../../auth/config/api.js"; // was missing

function NewItemForm({ close, categories }) {
  const [itemName, setItemName] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [available_status, setAvailableStatus] = useState("available");
  const [msg, setMsg] = useState("");
  const nameRegx = /^[a-zA-Z\s]+$/;

  const resetForm = () => {
    setMsg("");
    setItemName("");
    setItemCategory("");
    setPrice(0);
    setAvailableStatus("available");
    close();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!itemName.trim() || !itemCategory) {
      setMsg("All fields are required");
      return;
    }
    if (price <= 0) {
      setMsg("Enter a valid price for the item");
      return;
    }
    if (!nameRegx.test(itemName)) {
      setMsg("Item Name can only contain letters and spaces");
      return;
    }
    try {
      await privateAPI.post("/menu-items/", {
        name: itemName,
        category_name: itemCategory,
        price: price,
        available_status: available_status,
      });
      resetForm();
    } catch (error) {
      setMsg("Error occurred while adding the item");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl w-90">
        <h2 className="text-[19px] font-bold mb-4">Add New Item</h2>

        <form onSubmit={handleSubmit}>
          <p className="text-[17px] font-medium text-gray-600 mb-2">
            Item Name:
          </p>
          <input
            type="text"
            value={itemName}
            placeholder="Enter Item Name"
            className="border rounded-xl p-2 mb-3 w-full"
            onChange={(e) => setItemName(e.target.value)}
            required
          />
          <p className="text-[17px] font-medium text-gray-600 mb-2">
            Available Status:
          </p>
          <select
            value={available_status}
            onChange={(e) => setAvailableStatus(e.target.value)}
            className="w-full mb-3 border rounded-xl p-2"
            required
          >
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>

          <p className="text-[17px] font-medium text-gray-600 mb-2">
            Item Category:
          </p>
          <select
            value={itemCategory}
            onChange={(e) => setItemCategory(e.target.value)}
            className="w-full mb-3 border rounded-xl p-2"
            required
          >
            <option value="" hidden>
              Select Category
            </option>
            {categories
              .filter((category) => category !== "All")
              .map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
          </select>

          <p className="text-[17px] font-medium text-gray-600 mb-2">
            Price (Rs)
          </p>
          <input
            type="number"
            value={price}
            placeholder="Set price of the item"
            className="border rounded-xl p-2 mb-3 w-full"
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />

          <p className="text-red-500 font-medium text-sm mb-6">{msg}</p>

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
              className="px-3 py-2 bg-green-400 text-white font-medium rounded-xl hover:bg-green-500"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewItemForm;
