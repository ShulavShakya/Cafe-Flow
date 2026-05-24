import { SlidersHorizontal, ReceiptText } from "lucide-react";
import Filter from "../../layouts/filter";
import { useState, useEffect } from "react";
import { privateAPI } from "../../../auth/config/api";

function RoomPayment({ roomPayments }) {
  const [showFilter, setShowFilter] = useState(false);
  const [payments, setPayments] = useState([]);
  const [filteredData, setFilteredData] = useState(roomPayments);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await privateAPI.get("/billing");
      const roomBills = res.data.data.filter((b) => b.bill_type === "Room");

      setPayments(roomBills);
      setFilteredData(roomBills);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <ReceiptText className="w-4.5 h-4.5 md:w-5 md:h-5 text-red-500" />
          <h3 className="font-bold text-[17px] md:text-[19px]">
            Room Payment Records
          </h3>
        </div>

        <button
          onClick={() => setShowFilter(true)}
          className="flex items-center gap-1 text-gray-600 hover:text-black"
        >
          Filter
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Payment Records */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          {filteredData.length === 0 ? (
            <div className="text-gray-500 font-medium text-center text-lg p-4 mb-3">
              No records to display
            </div>
          ) : (
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-gray-600 font-medium text-sm">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-gray-600 font-medium text-sm">
                    Room
                  </th>
                  <th className="px-6 py-3 text-left text-gray-600 font-medium text-sm">
                    Guest
                  </th>
                  <th className="px-6 py-3 text-left text-gray-600 font-medium text-sm">
                    Final payment
                  </th>
                  <th className="px-6 py-3 text-left text-gray-600 font-medium text-sm">
                    Payment type
                  </th>
                  <th className="px-6 py-3 text-left text-gray-600 font-medium text-sm ">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {[...filteredData].reverse().map((roomPayRec, index) => (
                  <tr
                    key={roomPayRec.bill_id ?? index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-6 py-3 text-gray-600 text-sm">
                      {index + 1}
                    </td>
                    <td className="px-6 py-3 text-gray-600 text-sm">
                      Room {roomPayRec.room_number}
                    </td>
                    <td className="px-6 py-3 text-gray-600 text-sm">
                      {roomPayRec.customer_name}
                    </td>
                    <td className="px-6 py-3 text-gray-600 text-sm">
                      Rs {roomPayRec.total_amount}
                    </td>
                    <td className="px-6 py-3 text-gray-600 text-sm">
                      {roomPayRec.payment_method}
                    </td>
                    <td className="px-6 py-3 text-gray-600 text-sm">
                      {new Date(roomPayRec.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showFilter && (
        <Filter
          data={roomPayments}
          nameField="customer_name"
          dateField="created_at"
          onApply={setFilteredData}
          onReset={() => setShowFilter(false)}
        />
      )}
    </div>
  );
}

export default RoomPayment;
