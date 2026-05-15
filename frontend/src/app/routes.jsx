import LoginScreen from "../Components/shared/loginScreen.jsx";
import Staff from "../Components/dashboard/staff tab/staffmain.jsx";
import AdminDashboard from "../Components/layouts/sidebar.jsx";
import DashboardLayout from "../Components/dashboard/default layout/layout.jsx";
import Overview from "../Components/dashboard/dashboard overview/overview.jsx";
import OrdersView from "../Components/dashboard/orders tab/orders.jsx";
import Tables from "../Components/dashboard/table tab/tables.jsx";
import Rooms from "../Components/dashboard/room tab/room.jsx";
import Inventory from "../Components/dashboard/inventory tab/inventory.jsx";
import Finance from "../Components/dashboard/finance tab/finance.jsx";
import MenuView from "../Components/dashboard/menu tab/menu.jsx";
import Reservations from "../Components/dashboard/reservation tab/reservationsmain.jsx";
import History from "../Components/dashboard/history tab/mainhistory.jsx";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "../auth/protectedRoute.jsx";

export default [
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },

  { path: "/login", element: <LoginScreen /> },

  //admin route
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Overview /> },
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: "orders",
        element: <OrdersView />,
      },
      {
        path: "menu",
        element: <MenuView />,
      },
      {
        path: "tables",
        element: <Tables />,
      },
      {
        path: "rooms",
        element: <Rooms />,
      },
      {
        path: "staff",
        element: <Staff />,
      },
      {
        path: "inventory",
        element: <Inventory />,
      },
      {
        path: "finance",
        element: <Finance />,
      },
      {
        path: "reservations",
        element: <Reservations />,
      },
      {
        path: "history",
        element: <History />,
      },
    ],
  },

  //waiter route
  {
    path: "/waiter",
    element: (
      <ProtectedRoute allowedRoles={["waiter"]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),

    children: [
      { index: true, element: <Navigate to="orders" replace /> },

      { path: "orders", element: <OrdersView /> },
      { path: "menu", element: <MenuView /> },
      { path: "tables", element: <Tables /> },
    ],
  },

  // receptionist route
  {
    path: "/receptionist",
    element: (
      <ProtectedRoute allowedRoles={["receptionist"]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),

    children: [
      { index: true, element: <Navigate to="rooms" replace /> },

      { path: "rooms", element: <Rooms /> },
      { path: "reservations", element: <Reservations /> },
    ],
  },

  //  Fallback route
  {
    path: "*",
    element: <h1>404 Page Not Found</h1>,
  },
];
