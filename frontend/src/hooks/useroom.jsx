import { useState } from "react";
import { privateAPI } from "../auth/config/api.js";

export function useRooms() {
  const [rooms, setRooms] = useState([]);

  //   const [rooms, setRooms] = useState([
  //     { id: 1, roomNo: 3, capacity: 2, status: "Occupied", details: null },
  //     { id: 2, roomNo: 2, capacity: 4, status: "Available", details: null },
  //     { id: 3, roomNo: 4, capacity: 4, status: "Available", details: null },
  //     { id: 4, roomNo: 1, capacity: 1, status: "Available", details: null },
  //   ]);

  const fetchRooms = async () => {
    try {
      const res = await privateAPI.get("/rooms/");
      setRooms(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch rooms:", err);
    }
  };

  const changeRoomStatus = (id, status) => {
    setRooms((prev) =>
      prev.map((room) => (room.room_id === id ? { ...room, status } : room)),
    );
  };

  const deleteRoom = async (id) => {
    try {
      await privateAPI.delete(`/rooms/${id}`);
      fetchRooms();
    } catch (err) {
      console.error("Failed to delete room:", err);
    }
  };

  const assignRoom = (roomNo, status, details = null) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.room_number === roomNo
          ? {
              ...room,
              status,
              details,
            }
          : room,
      ),
    );
  };

  return {
    rooms,
    fetchRooms,
    changeRoomStatus,
    deleteRoom,
    assignRoom,
  };
}
