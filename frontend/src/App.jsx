import { Routes, Route } from "react-router-dom";
import LoginScreen from "./pages/auth/loginScreen.jsx";
import Signup from "./pages/auth/signup.jsx";
import Staff from "./Components/dashboard/staff tab/staffmain.jsx";
import AdminDashboard from "./Components/layouts/sidebar.jsx";
import DashboardLayout from "./Components/dashboard/default layout/layout.jsx";
import Overview from "./Components/dashboard/dashboard overview/overview.jsx";
import OrdersView from "./Components/dashboard/orders tab/orders.jsx";
import Tables from "./Components/dashboard/table tab/tables.jsx";
import Rooms from "./Components/dashboard/room tab/room.jsx";
import Inventory from "./Components/dashboard/inventory tab/inventory.jsx";
import Finance from "./Components/dashboard/finance tab/finance.jsx";
import MenuView from "./Components/dashboard/menu tab/menu.jsx"
import Reservations from "./Components/dashboard/reservation tab/reservationsmain.jsx";
import History from "./Components/dashboard/history tab/mainhistory.jsx";
import { Navigate } from "react-router-dom";

function App() {
  return (
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<Overview />} />
          <Route path="orders" element={<OrdersView />} />
          <Route path="menu" element={<MenuView />} />
          <Route path="tables" element={<Tables />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="staff" element={<Staff />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="finance" element={<Finance />} />
          <Route path="reservations" element={<Reservations />}/>
          <Route path="history" element={<History />}/>
        </Route>
      </Routes>
  );
}

export default App;
