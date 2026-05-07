/* admin view of orders */
import { useState } from "react";
import KitchenOrders from "./kitchenorders";
import WaiterOrders from "./waiterorders";

function OrdersView() {

  const [ordersData, setOrdersData] = useState([
    {
      id: 1,
      locationType: "table",
      tableNumber: "3",
      customerName: "John Doe",
      customization: "no tomatoes in the sandwich",
      items: [
        { name: "Cappuccino", quantity: 2, price: 150 },
        { name: "Club Sandwich", quantity: 1, price: 280 },
      ],
      total: 580,
      status: "preparing",
      time: "10:30 AM",
    },
    {
      id: 2,
      locationType: "room",
      roomNumber: "7",
      customerName: "Sarah Smith",
      items: [
        { name: "Espresso", quantity: 1, price: 120 },
        { name: "Chocolate Cake", quantity: 2, price: 180 },
      ],
      total: 480,
      status: "preparing",
      time: "10:25 AM",
    },
  ]);

  //on cancel just give an alert and delete order
  const [view,setView]=useState("kitchen");//kitchen or waiter
  const [cancelledOrders, setCancelledOrders]=useState(0);
  const role="admin";
 
  const kitchenOrders = ordersData.filter(o => o.status === "preparing");
  const waiterOrders = ordersData.filter(o => o.status === "preparing" || o.status === "prepared");
  const completedOrders = ordersData.filter(o => o.status === "completed");

  const cancelOrder = (id) => {
    //counter
    setCancelledOrders(prev => prev + 1);

    //remover
    setOrdersData(prev =>
      prev.filter(order => order.id !== id)
    );
  }

  const changeStatus = (id, status) => {
    setOrdersData(prev =>
      prev.map(order =>
        order.id === id
          ? { ...order, status }
          : order
      )
    );
  };

  return (
    <div className="flex-1 min-h-screen bg-gray-50 p-8">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold">
          Orders Management
        </h1>
        
        <p className="text-sm md:text-[15px] text-gray-400 font-medium mt-1">
          View and Manage all orders
        </p>
      </div>

      {/* View Selection */}
      {role==="admin" && (
      <div>
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg font-medium shadow-sm">
              <p className="text-gray-700 text-[17px] mb-1">Pending orders</p>
              <p className="text-gray-900 text-[17px]">{kitchenOrders.length}</p>
              </div>

              <div className="bg-red-50 p-4 rounded-lg font-medium shadow-sm">
              <p className="text-red-700 text-[17px] mb-1">Cancelled orders</p>
              <p className="text-red-900 text-[17px]">{cancelledOrders}</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg font-medium shadow-sm">
              <p className="text-green-700 text-[17px] mb-1">Completed orders</p>
              <p className="text-green-900 text-[17px]">{completedOrders.length}</p>
              </div>
        </div>

        <div className="flex items-center gap-5 w-50 md:w-100 mb-6">
          <button 
            onClick={()=>setView("kitchen")}
            className={`px-8 py-3 rounded-2xl shadow-sm border border-slate-200 text-xl font-medium
            ${view === "kitchen" ? "bg-blue-100 border-blue-200" : "bg-white hover:bg-gray-200"}`}
          >
            Kitchen
          </button>

          <button 
            onClick={()=>setView("waiter")}
            className={`px-8 py-3 rounded-2xl shadow-sm border border-slate-200 text-xl font-medium
            ${view === "waiter" ? "bg-blue-100 border-blue-200" : "bg-white hover:bg-gray-200"}`}
          >
            Waiter
          </button>
        </div>
      </div>
      )}

      {/* kitchen View */}
      {view==="kitchen" && (
        <KitchenOrders
          kitchenOrders={kitchenOrders} 
          onCancel={cancelOrder} 
          changeStatus={changeStatus}
        />
      )}

      {/*waiter view */}
      {view==="waiter" && (
        <WaiterOrders 
          waiterOrders={waiterOrders}
          onCancel={cancelOrder}
          changeStatus={changeStatus}
        />
      )}
      
    </div>
  );
}

export default OrdersView