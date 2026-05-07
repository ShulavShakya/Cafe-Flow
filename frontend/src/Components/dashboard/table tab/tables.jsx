import { Plus } from "lucide-react";
import AddTableForm from "./addtableform.jsx";
import { useState } from "react";
import StatusForm from "./tablestatusform.jsx";
import TableCard from "./tablecard"

function Tables() {
  const [showForm, setShowForm] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);

  const [tables, setTables] = useState([
    { id: 1, tableNo: 4, capacity: 2, status: "Available"},
    { id: 2, tableNo: 2, capacity: 4, status: "Available"},
    { id: 3, tableNo: 3, capacity: 4, status: "Available"},
    { id: 4, tableNo: 1, capacity: 1, status: "Available"},
  ]);

  const changeTableStatus = (id, status) => {
    setTables(prev =>
      prev.map(table =>
        table.id === id
          ? { ...table, status }
          : table
      )
    );
  };

  const deleteTable = (id) => {
    setTables(prev => prev.filter( table=>table.id !== id ))
  }
  
  return (
    <div className="flex-1 min-h-screen p-8 bg-gray-50">

      {/* Header */}
      <div className="flex justify-between mb-6 gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">
            Table Management
          </h1>

          <p className="text-sm md:text-[15px] text-gray-400 font-medium mt-1">
            Manage table availability
          </p>      
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center
            gap-1 hover:bg-blue-700">
            <Plus className="w-5 h-5" />
            <p className="font-medium text-sm md:text-[16px]">Add Table</p>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg w-full shadow-sm font-medium">
          <p className="text-gray-600 text-[17px] mb-1 ">Total Tables</p>
          <p className="text-gray-900 text-[17px]">{tables.length}</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg w-full shadow-sm font-medium">
          <p className="text-green-700 text-[17px] mb-1">Available</p>
          <p className="text-green-900 text-[17px]">{tables.filter((t) => t.status === "Available").length}</p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg w-full shadow-sm font-medium">
          <p className="text-blue-700 text-[17px] mb-1">Reserved</p>
          <p className="text-blue-900 text-[17px]">{tables.filter((t) => t.status === "Reserved").length}</p>
        </div>

        <div className="bg-red-50 p-4 rounded-lg w-full shadow-sm font-medium">
          <p className="text-red-700 text-[17px] mb-1">Occupied</p>
          <p className="text-red-900 text-[17px]">{tables.filter((t) => t.status === "Occupied").length}</p>
        </div>

      </div>

      {/* Table Info Form */}
      {showForm && (
        <AddTableForm
          close={() => setShowForm(false)}
        />
      )}

      <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
        
        {/* Title and Index */}
        <div className="flex items-center gap-15 justify-between mb-12">
            <h3 className="font-bold text-[16px] md:text-[19px] ">
                All tables
            </h3>

            <div className="flex flex-wrap gap-3">
                <div className="flex items-center justify-center gap-1">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-green-400 rounded-sm"></div>
                <p className="font-medium text-xs md:text-sm">Available</p>
                </div>

                <div className="flex items-center justify-center gap-1">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-blue-400 rounded-sm"></div>
                <p className="font-medium text-xs md:text-sm">Reserved</p>
                </div>
                
                <div className="flex items-center justify-center gap-1">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-red-400 rounded-sm"></div>
                <p className="font-medium text-xs md:text-sm">Occupied</p>
                </div>
            </div>
        </div>

        {/* Table Cards */}
        <TableCard 
          tables={tables} 
          deleteTable={deleteTable}
          selectedTable={(table) => setSelectedTable(table)}
        />
      </div>

      {/* Status Update Form */}
      {selectedTable && (
        <StatusForm
          table={selectedTable}
          changeTableStatus={changeTableStatus}
          close={() => setSelectedTable(null)}
        />
      )} 
    

     {/*  {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                <div className="bg-white p-5 rounded-xl shadow-lg text-center h-40 w-80 flex flex-col items-center justify-center">
                    <p className="font-medium text-lg mb-6">
                        Table already exists
                    </p>
                    <button
                        onClick={() => setShowPopup(false)}
                        className="bg-slate-500 text-white text-sm mt-1 font-medium px-4 py-2 rounded-lg hover:bg-slate-600"
                    >
                        OK
                    </button>
                </div>
                </div>
            )} */}
    </div>
  );
}

export default Tables