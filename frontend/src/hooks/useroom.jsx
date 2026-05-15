import { useState } from "react";

export function useRooms(){
    const [rooms, setRooms] = useState([
    { id: 1, roomNo: 3, capacity: 2, status: "Occupied", details:null},
    { id: 2, roomNo: 2, capacity: 4, status: "Available", details: null},
    { id: 3, roomNo: 4, capacity: 4, status: "Available", details: null},
    { id: 4, roomNo: 1, capacity: 1, status: "Available", details: null},
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
    
    const assignRoom = (
        roomNo,
        status,
        details = null
    ) => {
        setRooms(prev =>
            prev.map(room =>
            room.roomNo === roomNo
                ? {
                    ...room,
                    status,
                    details,
                }
                : room
            )
        );
    };

    return { rooms, setRooms, changeRoomStatus, deleteRoom, assignRoom};
} 