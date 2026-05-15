import {
  LayoutDashboard,
  ShoppingCart,
  NotepadText,
  BedSingle,
  Coins,
  Package,
  UserCog,
  BookMarked,
  History,
  X,
} from "lucide-react";
import { MdTableRestaurant } from "react-icons/md";
import logo from "../../assets/images/kitchen_pulse.png";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";

function AdminDashboard({ open, setOpen }) {
  const adminMenu = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "menu", label: "Menu", icon: NotepadText },
    { id: "tables", label: "Tables", icon: MdTableRestaurant },
    { id: "rooms", label: "Rooms", icon: BedSingle },
    { id: "reservations", label: "Reservations", icon: BookMarked },
    { id: "finance", label: "Finance", icon: Coins },
    { id: "staff", label: "Staff", icon: UserCog },
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "history", label: "History", icon: History },
  ];
  const menuByRole = {
    admin: adminMenu,

    manager: adminMenu,

    waiter: [
      { id: "orders", label: "Orders", icon: ShoppingCart },
      { id: "menu", label: "Menu", icon: NotepadText },
      { id: "tables", label: "Tables", icon: MdTableRestaurant },
    ],

    kitchen: [
      { id: "orders", label: "Orders", icon: ShoppingCart },
      { id: "menu", label: "Menu", icon: NotepadText },
    ],

    receptionist: [
      { id: "orders", label: "Orders", icon: ShoppingCart },
      { id: "tables", label: "Tables", icon: MdTableRestaurant },
      { id: "rooms", label: "Rooms", icon: BedSingle },
      { id: "reservations", label: "Reservations", icon: BookMarked },
    ],
  };

  const user = JSON.parse(Cookies.get("user") || "{}");

  const role = user?.role?.role_name || role;
  const email = user?.email || "";
  const menu = menuByRole[role] || [];

  return (
    <div
      className={`fixed md:static z-40 top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col
      transform transition-transform duration-300 overflow-y-auto scrollbar-hide
      ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      {/* Header */}
      <div className="sticky top-0 z-50 flex border-b bg-white border-gray-200 p-4 justify-between">
        <div className="flex items-center gap-3 ">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden">
            <img
              src={logo}
              alt="cafe logo"
              className="object-cover w-full h-full"
            />
          </div>

          <div>
            <h2 className="text-gray-900 text-[17px] md:text-xl font-semibold">
              {role?.toUpperCase()}
            </h2>
            <p className="text-gray-600 text-xs md:text-sm p-0.5 font-medium">
              {email}
            </p>
          </div>
        </div>
        {/* Close button (mobile only) */}
        <div className="md:hidden flex justify-end p-3">
          <button onClick={() => setOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Menu */}
      <div className="space-y-1 flex-1 p-3.5 ">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.id}
              onClick={() => setOpen(false)}
              to={`/${role}/${item.id.toLowerCase().trim()}`}
              end={item.id === "overview"} // for dashboard root
              className={({ isActive }) =>
                `w-full flex items-center gap-3 p-3 rounded-lg transition ${
                  isActive
                    ? "bg-red-500 font-medium text-[16px]  text-white"
                    : "text-gray-900 font-medium text-[16px]  hover:bg-red-100"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default AdminDashboard;
