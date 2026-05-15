import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function LineGraph({ revenueData }) {
  const hasData = revenueData && revenueData.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-start justify-between mb-6 gap-1">
        <div>
          <h3 className="text-[15px] md:text-lg font-semibold text-slate-900">
            Daily Revenue
          </h3>
          <p className="mb-4 text-sm md:text-[15px] text-gray-500">
            Track your everyday revenue
          </p>
        </div>
        <div className="flex items-center gap-1 pt-1 md:gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-500"></div>
          <p className="text-slate-600 text-xs md:text-sm">Revenue per day</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={revenueData}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="date"
            stroke="#64748b"
            interval={0} // IMPORTANT: force all labels
            tick={{ fontSize: 12 }}
            angle={0} // prevent overlap
            textAnchor="center"
          />
          <YAxis stroke="#64748b" />
          <Tooltip
            contentStyle={{
              borderRadius: "10px",
              border: "none",
              backgroundColor: "#ffffff",
              color: "#111827",
              fontWeight: 500,
              boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
            }}
            labelFormatter={(value) =>
              new Date(value).toLocaleDateString("en-CA")
            }
          />
          <Area
            type="monotone"
            dataKey="Revenue"
            stroke="#8b5cf6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#revenueGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineGraph;
