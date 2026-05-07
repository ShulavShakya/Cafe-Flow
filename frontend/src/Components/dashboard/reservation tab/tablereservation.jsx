import { BookCheck, SlidersHorizontal, LogIn, Trash2 } from "lucide-react";
import {useState, useEffect} from "react";
import Filter from "../../layouts/filter";

function TableReservations({ tableReservations, deleteTableReservation, formatTime }) {
    
    const [showFilter, setShowFilter] = useState(false);
    const [filteredData, setFilteredData] = useState(tableReservations);

    useEffect(() => {
        setFilteredData(tableReservations);
    }, [tableReservations]);

    const [popUp,setPopUp]=useState(false);
    const [selectedTable, setSelectedTable] = useState(null);
  
    return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200 mb-6">
        <div className='flex justify-between p-6 border-b border-gray-100 '>
            <div className="flex items-center gap-2">
                <BookCheck className="w-4.5 h-4.5 md:w-5 md:h-5 text-red-500" />
                <h3  className="font-bold text-[17px] md:text-[19px] ">
                Table Reservations
                </h3>
            </div>

            <button 
                onClick={() => setShowFilter(true)}
                className='flex items-center gap-1 text-gray-600 hover:text-black'>
                Filter
                <SlidersHorizontal className='w-5 h-5'/>
            </button>
        </div>

        <div className="w-full overflow-x-auto">
        {filteredData.length===0 ? (
            <div className='text-gray-500 font-medium text-center text-lg p-4 mb-3'>
                No reservations made yet.
            </div>
        ):(
        <table className="min-w-full table-auto">
            <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm">
                        #TR
                    </th>
                    <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm">
                        Table
                    </th>
                    <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm">
                        Customer Name
                    </th>
                    <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm ">
                        Reservation Date
                    </th>
                    <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm ">
                        Arrival time
                    </th>
                    <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm ">
                        Contact
                    </th>
                    <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm ">
                        Proceed
                    </th>
                    <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm ">
                        Cancel
                    </th>
                </tr>
            </thead>

            <tbody>
            {filteredData.map((table,index)=>(
                <tr key={table.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-3 text-gray-600 text-sm">
                        {index + 1}
                    </td>
                    <td className="px-6 py-3 text-gray-600 text-sm">
                        Table {table.tableNo}
                    </td>
                    <td className="px-6 py-3 text-gray-600 text-sm">
                        {table.name}
                    </td>
                    <td className="px-6 py-3 text-gray-600 text-sm">
                        {table.resvDate}
                    </td>
                    <td className="px-6 py-3 text-gray-600 text-sm">
                        {formatTime(table.time)}
                    </td>
                    <td className="px-6 py-3 text-gray-600 text-sm">
                        {table.contact}
                    </td>
                    <td className="px-6 py-3 text-gray-600 text-sm">
                        <button className='flex items-center justify-center text-blue-500 gap-1
                        hover:text-blue-700 rounded-4xl'>
                            <LogIn className='w-5 h-5'/>
                            Assign
                        </button>
                    </td>
                    <td className="px-6 py-3 text-gray-600 text-sm">
                        <button 
                        onClick={()=>{setPopUp(true);
                            setSelectedTable(table);
                        }}
                        className='flex items-center justify-center text-red-500 gap-1
                        hover:text-red-700 rounded-4xl'>
                            <Trash2 className='w-5 h-5'/>
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
        )}
        </div>

        {popUp && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                <div className="bg-white p-7 rounded-xl shadow-lg text-center w-100 flex flex-col items-center justify-center">
                    <p className="font-medium text-lg mb-6">
                    Do you want to remove reservation details of {selectedTable.name} from the system?
                    </p>
                    <div className='flex items-center justify-center gap-4'>
                    <button
                        onClick={() => setPopUp(false)}
                        className="bg-slate-500 hover:bg-slate-600 text-white text-sm mt-1 font-medium px-4 py-2 rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => {setPopUp(false);
                        deleteTableReservation(selectedTable.id);
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm mt-1 font-medium px-4 py-2 rounded-lg"
                    >
                        Confirm
                    </button>
                    </div>
                </div>
            </div>
        )}

        {showFilter && (
        <Filter
            data={tableReservations}
            nameField="name"
            dateField="resvDate"
            onApply={setFilteredData}
            onReset={() => setShowFilter(false)}
        />
        )}
    </div>
  )
}

export default TableReservations