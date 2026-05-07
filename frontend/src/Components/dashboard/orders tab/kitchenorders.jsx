import { useState } from "react";
import { ChefHat } from "lucide-react";
import OrderCard from "./ordercard";

function KitchenOrders({ kitchenOrders, onCancel, changeStatus }) {
    
    return(
        <div className="flex-1 min-h-screen bg-gray-50 p-8">

            {kitchenOrders.length === 0 ? 
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
                {kitchenOrders.map((order) => (
                <OrderCard
                    order={order}
                    view="kitchen"
                    onCancel={onCancel}
                    changeStatus={changeStatus}
                />
                ))}
            </div>
            )}
        </div>
    )
}

export default KitchenOrders