import { useState } from "react";
import OrderCard from "./ordercard";
import { ChefHat } from "lucide-react";
import TableOrderBill from "./tableorderbill";

function WaiterOrders({ waiterOrders, setOrdersData, onCancel, changeStatus }) {
    const [billModal, setBillModal] = useState(null);

    const sortedWaiterOrders = [...waiterOrders].sort((o1, o2) => {
    const priority = (status) => {
        if (status === "prepared") return 0;
        if (status === "preparing") return 1;
        return 2;
    };
    return priority(o1.status) - priority(o2.status);
    });

   const openTableBill = (tableNumber, customerName) => {
    const tableOrders = waiterOrders.filter(
        o =>
        o.locationType === "table" &&
        o.tableNumber === tableNumber &&
        o.customerName === customerName &&
        o.status === "prepared"
    );

    setBillModal({
        tableNumber,
        customerName,
        orders: tableOrders,
    });
    };

    const markOrdersCompleted = (orders) => {
    setOrdersData(prev =>
        prev.map(order =>
        orders.some(o => o.id === order.id)
            ? { ...order, status: "completed" }
            : order
        )
    );
    };

    return(
    <div className="flex-1 min-h-screen bg-gray-50 p-4 lg:p-6">

        {waiterOrders.length === 0 ? 
        (
        <div className="bg-white font-medium rounded-xl shadow-sm p-14 text-center">
            <ChefHat className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No active orders right now</p>
            <p className="text-gray-400 text-sm mt-1">
            New order will appear here when customers place order
            </p>
        </div>
        ) : 
        (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedWaiterOrders.map((order) => (
                <OrderCard
                    order={order}
                    view="waiter"
                    onCancel={onCancel}
                    changeStatus={changeStatus}
                    openTableBill={openTableBill}
                />
            ))}
            </div>
        )}

        {/* Bill & Payment Modal */}
        {billModal && (
        <TableOrderBill
            selectedOrder={billModal}
            close={() => setBillModal(null)}
            completeTableOrders={markOrdersCompleted}
        />
        )}
    </div>
    )
}

export default WaiterOrders