import { ChefHat, X, Percent, QrCode, Banknote, CircleCheck } from "lucide-react";
import TableOrderBill from "./tableorderbill";
import { useState } from "react";

function OrderCard({ order, view, onCancel, changeStatus }) {

  const [billModal, setBillModal] = useState(null);

  return (
    <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
      
      {/* Header */}
      <div className="bg-red-500 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="opacity-90 text-sm">Order #{order.id}</p>
            <p>
              {order.locationType === "table" ? `Table ${order.tableNumber}` : `Room ${order.roomNumber}`}
            </p>
          </div>
          <div className="text-right">
            <p className="opacity-90 text-sm">{order.time}</p>
            <p className="text-sm">{order.customerName}</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        
        {/* Items */}
        <p className="text-gray-600 text-sm mb-2">Order Items:</p>
        <div className="space-y-2 mb-4">
          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 p-2 rounded"
            >
              <span className="text-gray-700">{item.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-gray-500 text-sm">
                  x{item.quantity}
                </span>
                <span className="text-gray-700">Rs {item.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="border-t border-gray-200 pt-3 mb-4">
          <div className="flex justify-between">
            <span>Total Amount</span>
            <span className="text-red-500">Rs {order.total}</span>
          </div>
        </div>

        {/* Status + Actions */}
        <div className="flex items-center justify-between mb-4">
          
          {/* Status Badge */}
          {order.status === "preparing" ? (
            <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700 flex items-center gap-1">
              <ChefHat className="w-4 h-4" />
              Preparing
            </span>
          ) : 
          (
            <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700 flex items-center gap-1">
              <CircleCheck className="w-4 h-4" />
              Prepared
            </span>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            
            {view === "kitchen" && order.status === "preparing" && (
              <button
                onClick={() => changeStatus( order.id, "prepared" )}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded text-sm"
              >
                Mark Ready
              </button>
            )}

            {order.status === "prepared" && (
              <>
                {order.locationType === "table" && (
                  <button
                    onClick={() => setBillModal(order)}
                    className="bg-purple-600 text-white px-4 py-1 rounded text-sm hover:bg-purple-700"
                  >
                    Pay
                  </button>
                )}

                {order.locationType === "room" && (
                  <button
                    onClick={() => changeStatus( order.id, "completed" )}
                    className="bg-blue-500 text-white px-4 py-1 rounded text-sm hover:bg-blue-600"
                  >
                    Room Service
                  </button>
                )}
              </>
            )}

            <button
              onClick={() => onCancel(order.id)}
              className="text-red-500 border border-red-500 px-4 py-1 rounded text-sm hover:text-red-600 hover:border-red-600 hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Customization */}
        {order.customization && (
          <>
            <h1 className="border-t border-gray-200 text-gray-600 pt-3">Customization Request:</h1>
            <p className="p-2 text-gray-600 pt-1">{order.customization}</p>
          </>
        )}

        {/* Table bill */}
        {billModal && 
          <TableOrderBill
            selectedOrder = {billModal}
            changeStatus = {changeStatus}
            close= {()=>setBillModal(null)}
          />
        }
      </div>
    </div>
  )
};

export default OrderCard