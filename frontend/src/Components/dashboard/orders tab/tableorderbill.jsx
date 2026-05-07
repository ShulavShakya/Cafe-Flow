import { Percent, QrCode, Banknote, X } from "lucide-react";
import { useState } from "react";
import PrintTableBill from "./printtablebill";

function TableOrderBill({selectedOrder, changeStatus, close}) {

    const [showQR, setShowQR] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [discount, setDiscount] = useState(0);

    const calculateFinalAmount = (total, discount) => {
      return total - ((total * discount) / 100);
    };

    const handlePrint = () => {
      window.print();
    };
    
    return(
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h3>Generate Bill</h3>
            <button
              onClick={close}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 space-y-4">
            {/* Order summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-500 text-sm border-b border-gray-200 pb-2 mb-1">
                Order #{selectedOrder.id}
              </p>
              <p className="text-gray-900 mb-3">
                Table {selectedOrder.tableNumber} — {" "}
                {selectedOrder.customerName}
              </p>

              <div className="space-y-2 mb-3">
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-[15.5px]">
                    <span className="text-gray-700">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="text-gray-700">
                      Rs {item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Subtotal</span>
                  <span className="text-gray-900">
                    Rs {selectedOrder.total}
                  </span>
                </div>

                {/* Discount */}
                <div className="flex items-center gap-2">
                  <Percent className="w-4 h-4 text-gray-400 shrink-0" />
                  <input
                    type="number"
                    value={discount || ""}
                    onChange={(e) =>
                      setDiscount(
                        Math.min(100, Math.max(0, Number(e.target.value))),
                      )
                    }
                    className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    placeholder="Discount %"
                    min="0"
                    max="100"
                  />
                </div>

                {discount > 0 && (
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Discount ({discount}%)</span>
                    <span>
                      − Rs{" "}
                      {((selectedOrder.total * discount) / 100).toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-gray-200 pt-2">
                  <span className="text-gray-900">Final Amount</span>
                  <span className="text-red-500">
                    Rs {(calculateFinalAmount(selectedOrder.total, discount)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

              {/* Payment method */}
            <div>
              <p className="text-gray-700 text-sm mb-3">
                Select Payment Method:
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPaymentMethod("Cash")}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === "Cash"
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Banknote
                    className={`w-7 h-7 ${paymentMethod === "Cash" ? "text-purple-600" : "text-gray-500"}`}
                  />
                  <span
                    className={`text-sm ${paymentMethod === "Cash" ? "text-purple-700" : "text-gray-600"}`}
                  >
                    Cash
                  </span>
                </button>

                <button
                  onClick={() => {setPaymentMethod("QR");
                      setShowQR(true);
                  }}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === "QR"
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <QrCode
                    className={`w-7 h-7 ${paymentMethod === "QR" ? "text-purple-600" : "text-gray-500"}`}
                  />
                  <span
                    className={`text-sm ${paymentMethod === "QR" ? "text-purple-700" : "text-gray-600"}`}
                  >
                    QR
                  </span>
                </button>
              </div>
            </div>
            
              <div className="border border-purple-100 rounded-xl bg-purple-50">
                <div className="px-4 py-4 text-center">
                  <p className="text-purple-700 text-sm">
                    Amount to collect: {" "}
                    <span className="text-purple-900">
                      Rs {(calculateFinalAmount(selectedOrder.total, discount)).toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>

            {/* Confirm payment button */}
            <button
              disabled={!paymentMethod} 
              onClick={()=>{changeStatus(selectedOrder.id,"completed");
                handlePrint();
              }}
              className={`w-full py-3 rounded-lg transition-colors text-white ${
                paymentMethod
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {paymentMethod
                ? "Generate Bill"
                : "Choose a payment method"}
            </button>
          </div>
        </div>

        {showQR && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <div className="bg-white border border-slate-200 shadow-sm rounded-lg flex flex-col items-center p-6">
                  <div className="bg-white rounded-lg w-50 h-50">
                      <img src="" alt="Payment QR" className="w-full h-full object-contain"/>
                  </div>
                  <button 
                  onClick={()=>setShowQR(false)}
                  className="bg-green-400 hover:bg-green-500 text-white font-medium text-lg rounded-xl px-4 py-1.5 mt-4">
                      Done
                  </button>
              </div>
          </div>
        )}

        <PrintTableBill/>
      </div>
    )
}

export default TableOrderBill