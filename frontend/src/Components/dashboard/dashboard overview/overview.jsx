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

function Overview() {
  return (
    <div className="flex-1 min-h-screen bg-gray-50 p-8">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold"> 
            Dashboard Overview
          </h1>
          <p className="text-sm md:text-[15px] text-gray-400 font-medium mt-1">
            Monitor your cafe performance
          </p>
        </div>

        {/* Today's status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <MetricCard
            title="Total Revenue"
            value="Rs 0"
            msg="x% from yesterday"
            change="positive"
            icon={TrendingUp}
            color="purple"
          />
          {/* <MetricCard
            title="Expenses"
            value="Rs 0"
            msg="Less expenses"
            change="positive"
            icon={TrendingDown}
            color="red"
          />
          <MetricCard
            title="Net Earnings"
            value="Rs 0"
            msg="Profit"
            change="positive"
            icon={DollarSign}
            color="green"
          /> */}
          <MetricCard
            title="Completed Orders"
            value="0"
            msg="x pending orders"
            change="negative"
            icon={ShoppingCart}
            color="orange"
          />
          <MetricCard
            title="Total Check-outs"
            value="0"
            msg="x check-ins today"
            change=""
            icon={KeySquare}
            color="teal"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-8">
          {/*line graph */}
          <LineGraph/>

          {/* Pie-chart */}
          <Piechart/>
          
        </div>
    </div>

  );
}

export default Overview;
