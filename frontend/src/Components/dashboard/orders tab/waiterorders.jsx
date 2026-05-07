import { useState } from "react";
import OrderCard from "./ordercard";
import { ChefHat } from "lucide-react";

function WaiterOrders({ waiterOrders, onCancel, changeStatus }) {

    const sortedWaiterOrders = [...waiterOrders].sort((o1, o2) => {
    const priority = (status) => {
        if (status === "prepared") return 0;
        if (status === "preparing") return 1;
        return 2;
    };

    return priority(o1.status) - priority(o2.status);
    });

    return(
    <div className="flex-1 min-h-screen bg-gray-50 p-8">

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
                />
            ))}
            </div>
        )}

        {/* Bill & Payment Modal */}
    </div>
    )
}

export default WaiterOrders