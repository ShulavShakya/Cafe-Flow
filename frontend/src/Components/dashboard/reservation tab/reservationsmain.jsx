import { useState } from 'react';
import { Plus } from 'lucide-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import TableReservations from "./tablereservation";
import RoomReservations from "./roomreservation";

function Reservations(){

    const [reservationForm,setReservationForm]=useState(false);
    const [reservationType,setReservationType]=useState("");
    const [customerName,setCustomerName]=useState("");
    const [contactNumber,setContactNumber]=useState("");
    const [arrivalTime,setArrivalTime]=useState("");
    const [arrivalDate,setArrivalDate]=useState("");
    const [roomNumber,setRoomNumber]=useState("");
    const [tableNumber,setTableNumber]=useState("");
    const [view,setView]=useState("table")
    const [msg,setMsg]=useState("");
    
    const [tableReservations, setTableReservations] = useState([
        { id: 1, tableNo: 2, name: "Ram Bahadur", contact: "9812345678", resvDate: "2026-05-05", time: "18:30" },
        { id: 2, tableNo: 4, name: "Sita Sharma", contact: "9823456789", resvDate: "2026-05-06", time: "19:00" },
        { id: 3, tableNo: 1, name: "Hari Prasad", contact: "9801234567", resvDate: "2026-05-07", time: "20:15" }
    ]);

    const [roomReservations, setRoomReservations] = useState([
        { id: 1, roomNo: 101, name: "Gita Koirala", contact: "9811111111", checkInDate: "2026-05-10", time: "08:00" },
        { id: 2, roomNo: 203, name: "Shyam Thapa", contact: "9822222222", checkInDate: "2026-05-11", time: "09:30" },
        { id: 3, roomNo: 305, name: "Bina Rai", contact: "9833333333", checkInDate: "2026-05-12", time: "07:45" }
    ]);

    const deleteTableReservation = (id) => {
        setTableReservations((prev) =>
            prev.filter((res) => res.id !== id)
        );
    };

    const deleteRoomReservation = (id) => {
        setRoomReservations((prev) =>
            prev.filter((res) => res.id !== id)
        );
    };

    const contactRegex=/^9\d{9}$/;
    const nameRegx = /^[a-zA-Z\s]+$/;

    const formatTime = (time) => {
        const [hours, minutes] = time.split(":");

        let h = Number(hours);
        const ampm = h >= 12 ? "PM" : "AM";

        h = h % 12;
        h = h ? h : 12; // convert 0 → 12

        return `${h}:${minutes} ${ampm}`;
    };

    const resetForm = () => {
        setMsg("");
        setContactNumber("");
        setCustomerName("");
        setRoomNumber("");
        setTableNumber("");
        setArrivalDate("");
        setArrivalTime("");
        setReservationType("");
        setReservationForm(false);
    };

    const validateReservationForm = () => {
        if (!reservationType) {
            setMsg("Must select reservation type first");
            return;
        }

        if (!customerName.trim() || !contactNumber || !arrivalDate || !arrivalTime) {
            setMsg("All fields are required*");
            return;
        }

        if (!contactRegex.test(contactNumber)) {
            setMsg("Invalid contact number");
            return;
        }

        if (!nameRegx.test(customerName)) {
            setMsg("Only letters and spaces allowed");
            return;
        }

        // room validation
        if (reservationType === "room") {
            if (!roomNumber) {
            setMsg("Room number is required");
            return;
            }
        }

        // table validation
        if (reservationType === "table") {
            if (!tableNumber) {
            setMsg("Table number is required");
            return;
            }
        }

        //send data to backend here
        resetForm();
    };

return(
     <div className="flex-1 bg-gray-50 p-8 min-h-screen">
      
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
            <div>
                <h1 className="text-xl md:text-2xl font-bold">
                    Reservation Details
                </h1>
                <p className="text-sm md:text-[15px] text-gray-400 font-medium mt-1">
                    View and Manage details of customers reserving rooms/tables
                </p>
            </div>
            <div className="flex items-center justify-center">
                <button
                    onClick={() => setReservationForm(true)}
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center
                    gap-1 hover:bg-blue-700">
                    <Plus className="w-5 h-5" />
                    <p className="font-medium text-sm md:text-[16px]">Add Reservation</p>
                </button>
            </div>
        </div>

        {/* View Selection */}
        <div className='flex items-center gap-4 mb-6'>
            <button 
                onClick={()=>setView("table")}
                className={`px-8 py-3 rounded-2xl shadow-sm border border-slate-200 text-[15px] md:text-lg font-medium
                ${view === "table" ? "bg-blue-100 border-blue-200" : "bg-white hover:bg-gray-200"}`}
            >
                Table
            </button>
            <button 
                onClick={()=>setView("room")}
                className={`px-8 py-3 rounded-2xl shadow-sm border border-slate-200 text-[15px] md:text-lg font-medium
                ${view === "room" ? "bg-blue-100 border-blue-200" : "bg-white hover:bg-gray-200"}`}
            >
                Room
            </button>
        </div>


        {/* Table Reservations */}
        {view==="table" && (
            <TableReservations
                tableReservations={tableReservations}
                deleteTableReservation={deleteTableReservation}
                formatTime={formatTime}
            />
        )}

        {/* Room Reservations */}
        {view==="room" && (
            <RoomReservations
                roomReservations={roomReservations}
                deleteRoomReservation={deleteRoomReservation}
                formatTime={formatTime}
            />
        )}
    
        {reservationForm && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">

                <div className="bg-white p-6 rounded-2xl w-90 overflow-y-auto max-h-screen">
                    <h2 className="text-xl font-bold mb-4">Add Resevation</h2>
                    
                    {/* Reservation type */}
                    <div className='mb-4'>
                        <p className='font-medium mb-1'>Reservation type:</p>
                        <div className='flex items-center gap-2'>
                            <input
                                type="radio"
                                name="resevType"
                                value="table"
                                checked={reservationType==="table"}
                                onChange={(e)=>{
                                    setReservationType(e.target.value);
                                    setMsg("");
                                }}
                            /> Table
                        
                            <input
                                type="radio"
                                name="resevType"
                                value="room"
                                checked={reservationType==="room"}
                                onChange={(e)=>{
                                    setReservationType(e.target.value);
                                    setMsg("");
                                }}
                            /> Room
                        </div>
                    </div>

                    {/*Customer details */}
                    {(reservationType==="room" || reservationType==="table") && (
                    <div>
                        <p className="font-medium ">Reserved by:</p>
                        <input
                        type="text"
                        placeholder="Eg: Ram Bahadur"
                        className="border-2 p-2 mt-2 mb-3 rounded-lg w-full"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        />
                        
                        <p className="font-medium"> Contact Number:</p>
                        <input
                        type="tel"
                        placeholder="9XXXXXXXXX"
                        className="border-2 p-2 mt-2 mb-3 rounded-lg w-full"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        />

                        {reservationType==="room" && (
                        <>
                            <p className="font-medium"> Room Number:</p>
                            <input
                            type="number"
                            placeholder='Enter the room number'
                            className="border-2 p-2 mt-2 mb-3 rounded-lg w-full"
                            value={roomNumber}
                            onChange={(e) => setRoomNumber(Number(e.target.value))}
                            />
                        </>
                        )}

                        {reservationType=="table" && (
                        <>
                            <p className="font-medium"> Table Number:</p>
                                <input
                                type="number"
                                placeholder='Enter the table number'
                                className="border-2 p-2 mt-2 mb-3 rounded-lg w-full"
                                value={tableNumber}
                                onChange={(e) => setTableNumber(Number(e.target.value))}
                                />
                        </>
                        )}

                        <p className="font-medium ">{reservationType==="room"?"Check-in Time:":"Guest Arrival Time:"}</p>
                            <input
                            type="time"
                            placeholder=""
                            className="border-2 p-2 mt-2 mb-3 rounded-lg w-full"
                            value={arrivalTime}
                            onChange={(e) => setArrivalTime(e.target.value)}
                            />

                        <p className="font-medium ">{reservationType==="room"?"Check-in Date:":"Date:"}</p>
                        <DatePicker
                            selected={arrivalDate}
                            onChange={(date) => setArrivalDate(date)}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Select date"
                            className="border-2 p-2 mt-2 mb-3 rounded-lg w-full"
                            wrapperClassName="w-full"
                        />
                    </div>
                    )}

                    <p className="text-red-500 font-medium text-sm mt-2 mb-5">{msg}</p>

                    <div className="flex justify-between items-center">
                        <button
                            onClick={resetForm}
                            className="bg-red-400 text-white font-medium rounded-xl 
                            px-3 py-2 hover:bg-red-500">
                            Cancel
                        </button>

                        <button
                            onClick={validateReservationForm}
                            className="px-3 py-2 bg-green-400 text-white font-medium 
                            rounded-xl hover:bg-green-500">
                            Confirm
                        </button>
                    </div>

                </div>

            </div>
        )}

    </div>

)
}

export default Reservations