import { useState } from "react";
import {
  QrCode,
  Banknote,
  TrendingUp,
  Receipt,
  DollarSign,
} from "lucide-react";
import MetricCard from "../../layouts/metric";
import TablePayment from "./tablepaymentrec";
import RoomPayment from "./roompaymentrec";
import { useFinance } from "../../../hooks/useFinance";
function Finance() {
  const {
    tablePayments,
    roomPayments,
    totalRevenue,
    cashCount,
    qrCount,
    allPayments,
  } = useFinance();

  const [view, setView] = useState("tablePayment");

  const totalPayments = allPayments?.length || 0;

  return (
    <div className="flex-1 min-h-screen p-8 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Finance View</h1>
        <p className="text-sm md:text-[15px] text-gray-400 font-medium mt-1">
          Records all completed and paid orders
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <MetricCard
          title="Total Revenue"
          value={`Rs ${totalRevenue}`}
          icon={TrendingUp}
          msg="Table and Room payment records combined "
          color="blue"
        />

        <MetricCard
          title="Cash Payments"
          value={cashCount}
          icon={Banknote}
          msg={`${
            totalPayments ? ((cashCount / totalPayments) * 100).toFixed(0) : 0
          }% of total`}
          color="green"
        />

        <MetricCard
          title="QR Payments"
          value={qrCount}
          icon={QrCode}
          msg={`${
            totalPayments ? ((qrCount / totalPayments) * 100).toFixed(0) : 0
          }% of total`}
          color="purple"
        />
      </div>

      {/* View Selection */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setView("tablePayment")}
          className={`px-8 py-3 rounded-2xl shadow-sm border border-slate-200 text-[15px] md:text-lg font-medium
              ${view === "tablePayment" ? "bg-blue-100 border-blue-200" : "bg-white hover:bg-gray-200"}`}
        >
          Table Finance
        </button>
        <button
          onClick={() => setView("roomPayment")}
          className={`px-8 py-3 rounded-2xl shadow-sm border border-slate-200 text-[15px] md:text-lg font-medium
              ${view === "roomPayment" ? "bg-blue-100 border-blue-200" : "bg-white hover:bg-gray-200"}`}
        >
          Room Finance
        </button>
      </div>

      {/* Table Payment Records */}
      {view === "tablePayment" && (
        <TablePayment tablePayments={tablePayments} />
      )}

      {/* Room Payment Records */}
      {view === "roomPayment" && (
        <RoomPayment roomPayments={roomPayments} />
      )}
    </div>
  );
}

export default Finance;
