import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer} from 'recharts';

import { revenueData } from "../../../data/cafeData.jsx";

function LineGraph(){
    return(
        <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-start justify-between mb-6 gap-1">
                <div>
                    <h3 className="text-[15px] md:text-lg font-semibold text-slate-900">
                        Weekly Revenue
                    </h3>
                    <p className="mb-4 text-sm md:text-[15px] text-gray-500">
                        Track daily revenue throughout the week
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
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#64748b" />
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
                        labelFormatter={(value, payload) => {
                        const date = payload?.[0]?.payload?.date;

                        if (!date) return value;

                        return new Date(date).toLocaleDateString("en-CA");
                        }}
                    />
                    <Area type="monotone" dataKey="Revenue" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#revenueGradient)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default LineGraph