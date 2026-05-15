import { useState } from "react";
import { privateAPI } from "../auth/config/api.js";

export function useOrders() {
  // const [ordersData, setOrdersData] = useState([
  //   {
  //     id: 1,
  //     locationType: "table",
  //     tableNumber: 3,
  //     customerName: "John Doe",
  //     customization: "no tomatoes in the sandwich",
  //     items: [
  //       {
  //         name: "Cappuccino",
  //         category: "Hot Beverage",
  //         quantity: 2,
  //         price: 150,
  //       },
  //       { name: "Club Sandwich", category: "Food", quantity: 1, price: 280 },
  //     ],
  //     total: 580,
  //     status: "preparing",
  //     time: "10:30 AM",
  //   },
  //   {
  //     id: 2,
  //     locationType: "room",
  //     roomNumber: 3,
  //     customerName: "Sarah Smith",
  //     items: [
  //       { name: "Espresso", category: "Hot Beverage", quantity: 1, price: 120 },
  //       {
  //         name: "Chocolate Cake",
  //         category: "Hot Beverage",
  //         quantity: 2,
  //         price: 180,
  //       },
  //     ],
  //     total: 480,
  //     status: "preparing",
  //     time: "10:25 AM",
  //   },
  //   {
  //     id: 3,
  //     locationType: "table",
  //     tableNumber: 3,
  //     customerName: "John Cena",
  //     items: [
  //       { name: "Espresso", category: "Hot Beverage", quantity: 1, price: 120 },
  //       {
  //         name: "Chocolate Cake",
  //         category: "Hot Beverage",
  //         quantity: 2,
  //         price: 180,
  //       },
  //     ],
  //     total: 480,
  //     status: "preparing",
  //     time: "10:25 AM",
  //   },
  //   {
  //     id: 4,
  //     locationType: "room",
  //     roomNumber: 3,
  //     customerName: "Sarah Smith",
  //     items: [
  //       {
  //         name: "Cappuccino",
  //         category: "Hot Beverage",
  //         quantity: 2,
  //         price: 150,
  //       },
  //       { name: "Club Sandwich", category: "Food", quantity: 1, price: 280 },
  //     ],
  //     total: 580,
  //     status: "preparing",
  //     time: "10:30 AM",
  //   },
  // ]);

  const [ordersData, setOrdersData] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await privateAPI.get("/food-orders/");
      setOrdersData(res.data.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  const changeStatus = async (id, status) => {
    try {
      await privateAPI.put(`/food-orders/${id}/status`, { status });
      fetchOrders();
    } catch (err) {
      console.error("Failed to update order status:", err);
    }
  };

  const completeRoomOrders = (roomNumber, customerName) => {
    setOrdersData((prev) =>
      prev.map((order) =>
        order.locationType === "room" &&
        order.roomNumber === roomNumber &&
        order.customerName === customerName &&
        order.status === "delivered"
          ? { ...order, status: "completed" }
          : order,
      ),
    );
  };

  const getMenuPopularity = (orders) => {
    const categoryCount = {};

    orders
      .filter((order) => order.status === "completed")
      .forEach((order) => {
        order.items.forEach((item) => {
          if (!categoryCount[item.category]) {
            categoryCount[item.category] = 0;
          }

          categoryCount[item.category] += item.quantity;
        });
      });

    return Object.entries(categoryCount).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const menuPopularity = getMenuPopularity(ordersData);

  const completedOrders = ordersData.filter((o) => o.status === "completed");

  const kitchenOrders = ordersData.filter((o) => o.status === "preparing");
  return {
    ordersData,
    fetchOrders,
    changeStatus,
    completeRoomOrders,
    menuPopularity,
    completedOrders,
    kitchenOrders,
  };
}
