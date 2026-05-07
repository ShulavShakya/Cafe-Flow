import { X, DoorClosed, DoorClosedLocked, DoorOpen} from "lucide-react";
import { useState } from "react";
import Bill from "./roombillmodel";

function RoomCard({ rooms, deleteRoom, selectedRoom}) {

  const [deletePopUp, setDeletePopUp] = useState(null);
  const [confirmation,setConfirmation]=useState(null);
  const [billModal,setBillModal]=useState(null);

  return (
    <div className="flex flex-wrap gap-5">
      {rooms.length === 0 ? 
      (
        <div className='text-gray-500 font-medium w-full text-center text-lg p-4 mb-3'>
          No rooms added yet
        </div>
      ) : 
      (
        [...rooms]
        .sort((r1 , r2) => r1.roomNo - r2.roomNo)
        .map((room) => (
        <div key={room.id} className="relative group">

          {/* Delete button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDeletePopUp(room);
            }}
            className="absolute -top-2.5 -right-2.5 z-10 
            w-6 h-6 rounded-full bg-gray-700 hover:bg-red-500 text-white
            opacity-0 group-hover:opacity-100 transition-opacity shadow-md
            grid place-items-center"
          >
            <X className="w-3 h-3" />
          </button>

          {/* Card */}
          <div 
            onClick={() => selectedRoom(room)}
            className={`w-32 h-44 aspect-square rounded-lg flex flex-col items-center 
            justify-center p-4 hover:scale-103 transition-all shadow-sm
              ${room.status === "Available" 
              ? "bg-green-400" 
              : room.status === "Reserved" 
              ? "bg-blue-400"
              : room.status === "Occupied" 
              ? "bg-red-400" 
              : "bg-orange-400"}`}
          >
            {/* Check-out button */}
            {room.status==="Occupied" && (
              <button 
              onClick={(e)=>{e.stopPropagation();
                setConfirmation(room);}}
              className="bg-white rounded-xl font-medium text-sm mb-1.5 py-0.5 px-2 
              text-gray-800 hover:bg-gray-50 hover:text-gray-600">
                Check-out
              </button>
            )}

            {room.status === "Available" 

              ? <DoorOpen className="w-8 h-8 text-white" /> 

              : (room.status === "Reserved" || room.status === "Occupied")

              ? <DoorClosedLocked className="w-8 h-8 text-white" /> 
              
              : <DoorClosed className="w-8 h-8 text-white" />
            }

            <p className="text-white font-medium mt-0.5">
              Room {room.roomNo}
            </p>

            <p className="text-white font-medium text-sm">
              {room.capacity===1? `${room.capacity} bed`:`${room.capacity} beds`}
            </p>

            <p className="text-white mt-2 mb-1 font-medium text-sm">
              {room.status}
            </p>

          </div>

          <div class="absolute top-25 -left-6 opacity-0 z-50 group-hover:opacity-90 transition-opacity 
          duration-600 border border-gray-200 shadow-sm font-medium bg-gray-100 text-gray-800 text-sm p-2 rounded-lg">
              {room.status ==="Available" && (
                <p>This room is available to be assigned to guests.</p>
              )}

              {room.status ==="Cleaning" && (
                <p>This room is getting cleaned.</p>
              )}

              {(room.status ==="Reserved" || room.status ==="Occupied") && (
                <div>
                  <p>Reserved by: Name</p>
                  <p>Contact No: 9999999999</p>
                  <p>Check-in Date: Date</p>
                  <p>Check-in Time: Time</p>
                </div>
              )}
            </div>
          </div>
        ))
      )}

      {deletePopUp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-5 rounded-xl shadow-lg text-center h-40 w-80 flex flex-col items-center justify-center">
            <p className="font-medium text-lg mb-6">
              Really want to delete Room {deletePopUp.roomNo}?
            </p>

            <div className="flex items-center gap-4"> 
              <button
                onClick={() => setDeletePopUp(null)}
                className="bg-gray-600 text-white text-sm mt-1 font-medium px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  deleteRoom(deletePopUp.id);
                  setDeletePopUp(null);
                }}
                className="bg-red-500 text-white text-sm mt-1 font-medium px-4 py-2 rounded-lg hover:bg-red-600"  
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-5 rounded-xl shadow-lg text-center h-40 w-80 flex flex-col items-center justify-center">
            <p className="font-medium text-lg mb-6">
              Want to extend stay?
            </p>

            <div className="flex items-center gap-6"> 
              <button
                onClick={() => {setBillModal(confirmation);
                  setConfirmation(null);
                }}
                className="bg-red-500 text-white text-sm mt-1 font-medium px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Decline
              </button>

              <button
                onClick={() => setConfirmation(null)}
                className="bg-green-500 text-white text-sm mt-1 font-medium px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {billModal && (
        <Bill
          close={() => setBillModal(null)}
        />
      )}
    </div>
  );
}

export default RoomCard