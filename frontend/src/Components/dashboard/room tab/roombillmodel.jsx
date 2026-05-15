import { X, Percent, Banknote, QrCode, SquarePen } from "lucide-react";
import { useState } from "react";
import PrintBill from "./printablebill";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useOrders } from "../../../hooks/useorder";

function Bill({checkedOutRoom, close})
{
    const [discount, setDiscount]=useState(0);
    const [paymentMethod, setPaymentMethod]=useState("");
    const [showQR, setShowQR]=useState(false);
    const [checkOutDate,setCheckOutDate]=useState(null);
    const [nights,setNights]=useState(0);
    const [rate,setRate]=useState(0);
    const [editDate,setEditDate]=useState(false);
    const [editNights,setEditNights]=useState(false);
    const [editRate,setEditRate]=useState(false);
    const [confirmComplete, setConfirmComplete] = useState(false);
    
    const { ordersData, completeRoomOrders } = useOrders();

    const roomOrders = ordersData.filter(
      o =>
          o.locationType === "room" &&
          o.roomNumber === checkedOutRoom.roomNo &&
          o.status === "delivered" &&
          o.customerName === "Sarah Smith"//later put customerName here
    );

    const getOrderTotal = (order) => {
      return order.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    };

    const ordersTotal = roomOrders.reduce(
      (sum, order) => sum + getOrderTotal(order),
      0
    );

    const roomCost = nights * rate;
    const subtotal = ordersTotal + roomCost;

    const discountAmount = (subtotal * discount) / 100;
    const finalAmount = subtotal - discountAmount;

    const handlePrint = () => {
      window.print();
      setConfirmComplete(true);
    };

    const formatDate = (date) => {
      if (!date) return "Enter date";

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}/${month}/${day}`;
    };

    return(
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
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
              {/* Room Cost Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-500 text-sm border-b border-gray-200 pb-2 mb-1">
                  Guest - guestName here
                </p>
                <p className="text-gray-900 mb-3">
                  Room {checkedOutRoom.roomNo}
                </p>

                {/* date and time */}
                <div className="space-y-2 mb-3">
                    <div
                      className="flex items-center justify-between text-[15.5px]"
                    >
                      <span className="text-gray-700">
                        Check-in
                      </span>
                      <span className="text-gray-700">
                        Date, Time
                      </span>
                    </div>

                    <div
                      className="flex items-center justify-between text-[15.5px]"
                    >
                      <span className="text-gray-700">
                        Check-out
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-700">
                          {formatDate(checkOutDate)}
                        </span>
                        <SquarePen onClick={()=>setEditDate(true)} 
                        className="w-4 h-4"/>

                        {editDate && (
                          <div className="fixed inset-0 flex items-center justify-center z-50"> 
                            <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
                              <p className="font-medium">Enter date:</p>
                              <DatePicker
                                selected={checkOutDate}
                                onChange={(date) => setCheckOutDate(date)}
                                onBlur={()=>setEditDate(false)}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Select date"
                                className="border-2 p-2 mt-2 mb-3 rounded-lg w-full"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Number of Nights */}
                    <div
                      className="flex items-center justify-between text-[15.5px]"
                    >
                      <span className="text-gray-700">
                        Night(s)
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-700">
                          {nights}
                        </span>
                        <SquarePen onClick={()=>setEditNights(true)}
                        className="w-4 h-4"/>
                      </div>

                      {editNights && (
                          <div className="fixed inset-0 flex items-center justify-center z-50"> 
                            <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
                              <p className="font-medium">Enter nights stayed:</p>
                              <input
                                value={nights}
                                onChange={(e) => setNights(e.target.value)}
                                onBlur={() => setEditNights(false)}
                                className="border-2 p-2 mt-2 mb-3 rounded-lg w-full"
                              />
                            </div>
                          </div>
                        )}
                    </div>

                    {/* Per night rate */}
                    <div
                      className="flex items-center justify-between text-[15.5px]"
                    >
                      <span className="text-gray-700">
                        Per night rate
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-700">
                          Rs {rate}
                        </span>
                        <SquarePen 
                        onClick={()=>setEditRate(true)}
                        className="w-4 h-4"/>
                      </div>

                      {editRate && (
                          <div className="fixed inset-0 flex items-center justify-center z-50"> 
                            <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
                              <p className="font-medium">Enter rate per night:</p>
                              <input
                                value={rate}
                                onChange={(e) => setRate(e.target.value)}
                                onBlur={() => setEditRate(false)}
                                className="border-2 p-2 mt-2 mb-3 rounded-lg w-full"
                              />
                            </div>
                          </div>
                        )}
                    </div>
                </div>

                {/* orders details gotten any */}
                <div className="border-t border-gray-200 pt-3 mb-3 space-y-2">
                  <span className="text-gray-700">
                      Guest Orders ({roomOrders.length} order(s))
                  </span>
                  
                  {roomOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between m-1 text-[15.5px]"
                  >
                    <span className="text-gray-700">
                      - Order #{order.id}
                    </span>
                    <span className="text-gray-900">
                      Rs {getOrderTotal(order)}
                    </span>
                  </div>
                  ))}
                </div>

                {/* total calculation */}
                <div className="border-t border-gray-200 pt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Subtotal</span>
                    <span className="text-gray-900">
                      Rs {subtotal}
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
                        - Rs {discountAmount}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between border-t border-gray-200 pt-2">
                    <span className="text-gray-900">Final Amount</span>
                    <span className="text-red-500">
                      Rs {finalAmount}
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
                        Rs {finalAmount}
                      </span>
                    </p>
                  </div>
                </div>

              {/* Confirm payment button */}
              <button
                disabled={!paymentMethod}
                onClick={handlePrint}
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

          {confirmComplete && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
            <div className="bg-white rounded-lg p-6 shadow-lg w-75 text-center">
              
              <p className="text-gray-800 font-medium mb-4">
                Was the payment successful?
              </p>

              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={() => setConfirmComplete(false)}
                  className="px-4 py-1.5 bg-red-500 text-white rounded-lg"
                >
                  No
                </button>

                <button
                  onClick={() => {
                    completeRoomOrders(checkedOutRoom.roomNo, "Sarah Smith");
                    setConfirmComplete(false);
                    close();
                  }}
                  className="px-4 py-1.5 bg-green-500 text-white rounded-lg"
                >
                  Yes
                </button>
              </div>

            </div>
          </div>
          )}

          <PrintBill
            room={checkedOutRoom}
            roomOrders={roomOrders}
            getOrderTotal={getOrderTotal}
            nights={nights}
            rate={rate}
            subtotal={subtotal}
            discountAmount={discountAmount}
            finalAmount={finalAmount}
            paymentMethod={paymentMethod}
            checkOutDate={checkOutDate}
          />
        </div>
)}

export default Bill