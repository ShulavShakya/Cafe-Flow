import { useContext, useEffect, useState } from "react";
import { Plus, Minus } from "lucide-react";
import NewItemForm from "./newitemform";
import MenuItemCard from "./menuitemcard";
import KitchenOrderTicket from "./kitchenorderticket";
import { privateAPI } from "../../../auth/config/api.js";

function MenuView() {
  const [menuItemsData, setMenuItemsData] = useState([]);
  // const [menuItemsData, setMenuItemsData] = useState([
  //   {
  //     id: 1,
  //     name: "Espresso",
  //     category: "Hot Beverage",
  //     price: 120,
  //     available: true,
  //   },
  //   {
  //     id: 2,
  //     name: "Cappuccino",
  //     category: "Hot Beverage",
  //     price: 150,
  //     available: true,
  //   },
  //   {
  //     id: 3,
  //     name: "Club Sandwich",
  //     category: "Food",
  //     price: 280,
  //     available: true,
  //   },
  //   {
  //     id: 4,
  //     name: "Pasta Carbonara",
  //     category: "Food",
  //     price: 320,
  //     available: true,
  //   },
  //   { id: 5, name: "Burger", category: "Food", price: 300, available: true },
  //   {
  //     id: 6,
  //     name: "Sprite",
  //     category: "Soft Drinks",
  //     price: 100,
  //     available: true,
  //   },
  //   {
  //     id: 7,
  //     name: "Cheesecake",
  //     category: "Dessert",
  //     price: 200,
  //     available: true,
  //   },
  //   {
  //     id: 8,
  //     name: "Whisky",
  //     category: "Hard Drinks",
  //     price: 200,
  //     available: true,
  //   },
  // ]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);

  const categories = [
    "All",
    "Food",
    "Dessert",
    "Hot Beverage",
    "Soft Drinks",
    "Hard Drinks",
  ];

  const [orderSlip, setOrderSlip] = useState([]);

  const fetchMenuItems = async () => {
    try {
      const res = await privateAPI.get("/menu-items/");
      setMenuItemsData(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch menu items:", err);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const toggleItemAvailability = async (id) => {
    try {
      const item = menuItemsData.find((i) => i.id === id);
      await privateAPI.put(`/menu-items/${id}/`, {
        ...item,
        available_status: item.available_status ? "available" : "unavailable",
      });
      fetchMenuItems();
    } catch (err) {
      console.error("Failed to update item availability:", err);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await privateAPI.delete(`/menu-items/${id}/`);
      fetchMenuItems();
    } catch (err) {
      console.error("Failed to delete menu item:", err);
    }
  };

  const filteredItems =
    selectedCategory === "All"
      ? menuItemsData
      : menuItemsData.filter((item) => item.category.name === selectedCategory);

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-8">
      {/* Header */}
      <div className="flex justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Menu View</h1>

          <p className="text-sm md:text-[15px] text-gray-400 font-medium mt-1">
            Select items to create that perfect order
          </p>
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center
            gap-1 hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            <p className="font-medium text-sm md:text-[16px]">Add New Item</p>
          </button>
        </div>
      </div>

      <div className="mb-6 flex gap-3 w-full overflow-x-auto scrollbar-hide p-1">
        {/* Menu item categories */}
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-2 rounded-lg font-medium shadow-sm text-[16px] ${
              selectedCategory === category
                ? "bg-red-500 border border-red-600 text-white"
                : "bg-white border border-gray-100 text-gray-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <MenuItemCard
        menuItemsData={filteredItems}
        toggleAvailability={toggleItemAvailability}
        deleteItem={handleDeleteItem}
        addToOrder={(item) => setOrderSlip([...orderSlip, item])}
      />

      {/* Order Placing */}
      <KitchenOrderTicket orderSlip={orderSlip} setOrderSlip={setOrderSlip} />

      {/* Adding new item */}
      {showAddModal && (
        <NewItemForm
          close={() => setShowAddModal(false)}
          categories={categories}
        />
      )}
    </div>
  );
}

export default MenuView;
