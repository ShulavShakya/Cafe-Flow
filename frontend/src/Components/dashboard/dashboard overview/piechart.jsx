import { 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell} from 'recharts';

import { menuPopularity, colors } from "../../../data/cafeData.jsx";

function Piechart() {
    return(
        <div className="bg-white rounded-2xl shadow-md p-4">
            <div className="flex items-start justify-between mb-1 gap-1">
              <div>
                <h3 className="text-[14px] md:text-[16px] font-semibold text-slate-900">
                  Menu Category Popularity
                </h3>
                <p className="mb-6 text-sm md:text-[14px] text-gray-500">
                  Identify the categories customers prefer most
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-[#F59E0B]"></div>
                  <span className="text-[#0F172A] text-[11px]">Food</span>
                </div>

                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-[#FACC15]"></div>
                  <span className="text-[#0F172A] text-[11px]">Dessert</span>
                </div>

                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-[#F6AD55]"></div>
                  <span className="text-[#0F172A] text-[11px]">Drinks</span>
                </div>

                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-[#EAB676]"></div>
                  <span className="text-[#0F172A] text-[11px]">Hot Beverage</span>
                </div>

              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={menuPopularity}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius="90%"
                  innerRadius="40%"
                  paddingAngle={3}
                  dataKey="value"
                  //for positioning the label
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                    const RADIAN = Math.PI / 180;

                    // reduce this gap to move label closer inward
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);

                    return (
                      <text
                        x={x}
                        y={y}
                        fill="#0F172A" //text color
                        fontWeight="bold"   
                        fontSize={14}
                        textAnchor="middle"
                        dominantBaseline="central"
                      >
                        {(percent * 100).toFixed(1)}%
                      </text>
                    );
                  }}
                >
                  {menuPopularity.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border: "none",
                    backgroundColor: "#0F172A",
                    fontWeight: 500,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
    )
}

export default Piechart