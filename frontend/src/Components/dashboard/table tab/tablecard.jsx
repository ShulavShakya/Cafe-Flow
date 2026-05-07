import { X, UtensilsCrossed} from "lucide-react";
import { useState } from "react";

function TableCard({ tables, deleteTable, selectedTable }) {

    const [deletePopup, setDeletePopup] = useState(null);

  return (
    <div className="flex flex-wrap gap-5">
        {tables.length === 0 ? 
        (
            <div className='text-gray-500 w-full font-medium text-center text-lg p-4 mb-3'>
            No tables added yet
            </div>
        ) : 
        (
            [...tables]
            .sort((t1, t2) => t1.tableNo - t2.tableNo)
            .map((table) => (
            <div key={table.id} className="relative group">

                {/* Delete button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setDeletePopup(table);
                    }}
                    className="absolute -top-2.5 -right-2.5 z-10 
                    w-6 h-6 rounded-full bg-gray-700 hover:bg-red-500 text-white
                    opacity-0 group-hover:opacity-100 transition-opacity shadow-md
                    grid place-items-center"
                >
                    <X className="w-3 h-3" />
                </button>

                {/* table Card */}
                <div 
                    onClick={() => selectedTable(table)}
                    className={`w-30 h-40 aspect-square rounded-lg flex flex-col items-center 
                    justify-center p-4 hover:scale-103 transition-all shadow-sm
                    ${table.status === "Available" 
                    ? "bg-green-400" 
                    : table.status === "Reserved" 
                    ? "bg-blue-400"
                    : "bg-red-400"}`}
                >
                    <UtensilsCrossed className="w-7.5 h-7.5 text-white" />
                    
                    <p className="text-white font-medium mt-0.5">
                        Table {table.tableNo}
                    </p>

                    <p className="text-white font-medium text-sm">
                        {table.capacity===1? `${table.capacity} seat`:`${table.capacity} seats`}
                    </p>

                    <p className="text-white mt-2 mb-1 font-medium text-sm">
                        {table.status}
                    </p>

                </div>

                <div className="absolute top-25 -left-6 opacity-0 z-50 group-hover:opacity-90 transition-opacity 
                duration-600 border border-gray-200 shadow-sm font-medium bg-gray-100 text-gray-800 text-sm p-2 rounded-lg">
                    {table.status ==="Available" && (
                    <p>This table is available to be assigned to customers.</p>
                    )}

                    {table.status ==="Occupied" && (
                    <div>
                        <p>Name: Name</p>
                        <p>Date: 2062-02-01</p>
                    </div>
                    )}

                    {table.status ==="Reserved" && (
                    <div>
                        <p>Name: Name</p>
                        <p>Contact No: 9999999999</p>
                        <p>Arrival Time: Time</p>
                        <p>Date: Date</p>
                    </div>
                    )}
                </div>

            </div>
            ))
        )}
        
        {deletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white p-5 rounded-xl shadow-lg text-center h-40 w-80 flex flex-col items-center justify-center">
                <p className="font-medium text-lg mb-6">
                    Really want to delete Table {deletePopup.tableNo}?
                </p>

                <div className="flex items-center gap-4"> 
                    <button
                        onClick={() => setDeletePopup(null)}
                        className="bg-gray-600 text-white text-sm mt-1 font-medium px-4 py-2 rounded-lg hover:bg-gray-700"  
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => {
                            deleteTable(deletePopup.id);
                            setDeletePopup(null);
                        }}
                        className="bg-red-500 text-white text-sm mt-1 font-medium px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
        )}
    </div>
  );
}

export default TableCard