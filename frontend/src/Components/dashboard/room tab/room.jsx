import { Plus } from "lucide-react";
import AddRoomForm from "./addroomform.jsx";
import RoomCard from "./roomcard.jsx";
import RoomStatusForm from "./roomstatusform.jsx";
import { useState } from "react";

function Rooms() {
  const [showForm, setShowForm] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  /* const [showPopup, setShowPopup] = useState(false); */

  const [rooms, setRooms] = useState([
    { id: 1, roomNo: 3, capacity: 2, status: "Available"},
    { id: 2, roomNo: 2, capacity: 4, status: "Available"},
    { id: 3, roomNo: 4, capacity: 4, status: "Available"},
    { id: 4, roomNo: 1, capacity: 1, status: "Available"},
  ]);

  const changeRoomStatus = (id, status) => {
    setRooms(prev =>
      prev.map(room =>
        room.id === id
          ? { ...room, status }
          : room
      )
    );
  };

  const deleteRoom = (id) => {
    setRooms(prev => prev.filter( room=>room.id !== id ))
  }

  return (
    <div className="flex-1 min-h-screen p-8 bg-gray-50">

      {/* Header */}
      <div className="flex justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">
            Room Management
          </h1>

          <p className="text-sm md:text-[15px] text-gray-400 font-medium mt-1">
            Manage room availability  
          </p>      
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center
            gap-1 hover:bg-blue-700">
            <Plus className="w-5 h-5" />
            <p className="font-medium text-sm md:text-[16px]">Add Room</p>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg w-full shadow-sm font-medium">
          <p className="text-gray-600 text-[17px] mb-1 ">Total Rooms</p>
          <p className="text-gray-900 text-[17px]">{rooms.length}</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg w-full shadow-sm font-medium">
          <p className="text-green-700 text-[17px] mb-1">Available</p>
          <p className="text-green-900 text-[17px]">{rooms.filter((t) => t.status === "Available").length}</p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg w-full shadow-sm font-medium">
          <p className="text-blue-700 text-[17px] mb-1">Reserved</p>
          <p className="text-blue-900 text-[17px]">{rooms.filter((t) => t.status === "Reserved").length}</p>
        </div>

        <div className="bg-red-50 p-4 rounded-lg w-full shadow-sm font-medium">
          <p className="text-red-700 text-[17px] mb-1">Occupied</p>
          <p className="text-red-900 text-[17px]">{rooms.filter((t) => t.status === "Occupied").length}</p>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg w-full shadow-sm font-medium">
          <p className="text-orange-700 text-[17px] mb-1">Cleaning</p>
          <p className="text-orange-900 text-[17px]">{rooms.filter((t) => t.status === "Cleaning").length}</p>
        </div>
      </div>

      {/* Room Info Form */}
      {showForm && (
        <AddRoomForm
          close={() => setShowForm(false)}
        />
      )}

      <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">

        {/* Title and index */}
        <div className="flex items-center gap-15 justify-between mb-12">
          <h3 className="font-bold text-[16px] md:text-[19px]">
            All rooms
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

            <div className="flex items-center justify-center gap-1">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-orange-400 rounded-sm"></div>
              <p className="font-medium text-xs md:text-sm">Cleaning</p>
            </div>
          </div>
        </div>
        
        {/* Room Cards */}
        <RoomCard
          rooms={rooms}
          deleteRoom={deleteRoom}
          selectedRoom={(room) => setSelectedRoom(room)}
        />   
      </div>

      {/* Status Update Form */}
      {selectedRoom && (
        <RoomStatusForm
          room={selectedRoom}
          changeRoomStatus={changeRoomStatus}
          close={() => setSelectedRoom(null)}
        />
      )}
      
     {/*  {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-5 rounded-xl shadow-lg text-center h-40 w-80 flex flex-col items-center justify-center">
            <p className="font-medium text-lg mb-6">
              Room already exists
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-slate-500 hover:bg-slate-600 text-white text-sm mt-1 font-medium px-4 py-2 rounded-lg"
            >
              OK
            </button>
          </div>
        </div>
      )} */}
    
    </div>
  );
}

export default Rooms