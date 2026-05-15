import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  KeySquare,
  ShoppingCart,
} from "lucide-react";

import LineGraph from "./linegraph.jsx";
import Piechart from "./piechart.jsx";
import MetricCard from "../../layouts/metric.jsx";
import { MdTableRestaurant } from "react-icons/md";
import { useOrders } from "../../../hooks/useorder.jsx";
import { useFinance } from "../../../hooks/useFinance.jsx";

function Overview() {
  const { kitchenOrders, completedOrders } = useOrders();
  const { todayRevenue, revenueChange, last6Days } = useFinance();

  const formattedChange = revenueChange.toFixed(1);

  return (
    <div className="flex-1 min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-sm md:text-[15px] text-gray-400 font-medium mt-1">
          Monitor your cafe performance
        </p>
      </div>

      {/* Today's status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <MetricCard
          title="Today's Total Revenue"
          value={`Rs ${todayRevenue}`}
          msg={`${formattedChange}% from yesterday`}
          change={revenueChange >= 0 ? "positive" : "negative"}
          icon={TrendingUp}
          color="purple"
        />

        <MetricCard
          title="Completed Orders"
          value={completedOrders.length}
          msg={`${kitchenOrders.length} pending orders`}
          change="negative"
          icon={ShoppingCart}
          color="orange"
        />
        <MetricCard
          title="Total Check-outs"
          value="0"
          msg=""
          change=""
          icon={KeySquare}
          color="teal"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-8">
        {/*line graph */}
        <LineGraph revenueData={last6Days} />

        {/* Pie-chart */}
        <Piechart />
      </div>
    </div>
  );
}

export default Overview;
