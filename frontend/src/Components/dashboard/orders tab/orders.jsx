/* admin view of orders */
import { useState } from "react";
import KitchenOrders from "./kitchenorders";
import WaiterOrders from "./waiterorders";
import { useOrders } from "../../../hooks/useorder";
import Cookies from "js-cookie";

function OrdersView() {
  const {
    ordersData,
    setOrdersData,
    changeStatus,
    kitchenOrders,
    completedOrders,
  } = useOrders();
  
  //on cancel just give an alert and delete order
  const [view, setView] = useState("kitchen"); //kitchen or waiter
  const user = JSON.parse(Cookies.get("user") || "{}");
  const role = user?.role?.role_name || role;

  const waiterOrders = ordersData.filter(
    (o) => o.status === "preparing" || o.status === "prepared",
  );

  const deliveredOrders = ordersData.filter((o) => o.status === "delivered");
  const cancelledOrders = ordersData.filter((o) => o.status === "cancelled");

  return (
    <div className="flex-1 min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Orders Management</h1>

        <p className="text-sm md:text-[15px] text-gray-400 font-medium mt-1">
          View and Manage all orders
        </p>
      </div>

      {/* View Selection */}
      {role === "admin" && (
        <div>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg font-medium shadow-sm">
              <p className="text-gray-700 text-[17px] mb-1">Pending orders</p>
              <p className="text-gray-900 text-[17px]">
                {kitchenOrders.length}
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg font-medium shadow-sm">
              <p className="text-blue-700 text-[17px] mb-1">Delivered orders</p>
              <p className="text-blue-900 text-[17px]">
                {deliveredOrders.length}
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg font-medium shadow-sm">
              <p className="text-green-700 text-[17px] mb-1">
                Completed orders
              </p>
              <p className="text-green-900 text-[17px]">
                {completedOrders.length}
              </p>
            </div>

            <div className="bg-red-50 p-4 rounded-lg font-medium shadow-sm">
              <p className="text-red-700 text-[17px] mb-1">Cancelled orders</p>
              <p className="text-red-900 text-[17px]">
                {cancelledOrders.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 w-50 md:w-100 mb-6">
            <button
              onClick={() => setView("kitchen")}
              className={`px-8 py-3 rounded-2xl shadow-sm border border-slate-200 text-[15px] md:text-lg font-medium
            ${view === "kitchen" ? "bg-blue-100 border-blue-200" : "bg-white hover:bg-gray-200"}`}
            >
              Kitchen
            </button>

            <button
              onClick={() => setView("waiter")}
              className={`px-8 py-3 rounded-2xl shadow-sm border border-slate-200 text-[15px] md:text-lg font-medium
            ${view === "waiter" ? "bg-blue-100 border-blue-200" : "bg-white hover:bg-gray-200"}`}
            >
              Waiter
            </button>
          </div>
        </div>
      )}

      {/* kitchen View */}
      {(view === "kitchen" || role === "kitchen") && (
        <KitchenOrders
          kitchenOrders={kitchenOrders}
          changeStatus={changeStatus}
        />
      )}

      {/*waiter view */}
      {(view === "waiter" || role === "waiter") && (
        <WaiterOrders
          waiterOrders={waiterOrders}
          setOrdersData={setOrdersData}
          changeStatus={changeStatus}
        />
      )}
    </div>
  );
}

export default OrdersView;
