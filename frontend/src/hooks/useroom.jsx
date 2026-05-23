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

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const todayDate = formatDate(new Date());

  const fetchRooms = async () => {
    try {
      const res = await privateAPI.get("/rooms/");
      setRooms(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch rooms:", err);
    }
  };

  const changeRoomStatus = async (id, status) => {
    try {
      if (status === "Occupied") {
        await privateAPI.patch(`/rooms/${id}/occupy`);
      } else {
        await privateAPI.put(`/rooms/${id}/`, { status });
      }
      fetchRooms();
    } catch (err) {
      console.error("Failed to change room status:", err);
    }
  };

  const deleteRoom = async (id) => {
    try {
      await privateAPI.delete(`/rooms/${id}`);
      fetchRooms();
    } catch (err) {
      console.error("Failed to delete room:", err);
    }
  };

  const assignRoom = async (id, details) => {
    try {
      await privateAPI.patch(`/room-reservations/${id}/assign`, details);
      fetchRooms();
    } catch (err) {
      console.error("Failed to assign room:", err);
    }
  };

  // Total check-ins for today
  const checkInCount = rooms.filter((room) => {
    if (room.status?.toLowerCase() !== "occupied") return false;

    if (!room.details?.checkinDate) return false;

    const checkInDate = formatDate(new Date(room.details.checkinDate));

    return checkInDate === todayDate;
  }).length;

  return {
    rooms,
    fetchRooms,
    changeRoomStatus,
    deleteRoom,
    assignRoom,
    checkInCount,
  };
}
