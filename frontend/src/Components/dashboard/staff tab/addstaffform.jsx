import { UserRoundPlus, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { publicAPI, privateAPI } from "../../../auth/config/api.js";

function AddStaffForm({ close }) {
  const roles = ["Manager", "Reception", "Kitchen", "Waiter"];

  const [fullname, setFullname] = useState("");
  const [contact, setContact] = useState("");
  const [roleName, setRoleName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setMsg("");
    setFullname("");
    setContact("");
    setRoleName("");
    setAddress("");
    setEmail("");
    setPassword("");
    close();
  };

  const fetchStaffs = async () => {
    try {
      const res = await privateAPI.get("/staff/get-staff");
      console.log("Staff list refreshed:", res.data.data);
    } catch (error) {
      console.error(
        "API Error while fetching staff: ",
        error.response?.data || error.message,
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Regex rules
    const nameRegex = /^[A-Za-z\s]+$/;
    const contactRegex = /^9\d{9}$/;
    const emailRegx = /^[^\s@]+@[^\s@]+(\.[^\s@]+)+$/;

    // Required field check
    if (
      !fullname.trim() ||
      !roleName ||
      !password ||
      !contact ||
      !address ||
      !email.trim()
    ) {
      setMsg("All fields are required*");
      return;
    }

    // Full name validation (only alphabets + spaces)
    if (!nameRegex.test(fullname)) {
      setMsg("Full name can only contain letters and spaces");
      return;
    }
    if (!contactRegex.test(contact)) {
      setMsg("Invalid contact number");
      return;
    }

    //email validation
    if (!emailRegx.test(email)) {
      setMsg("Invalid email address");
      return;
    }

    // Password length validation
    if (password.length < 6) {
      setMsg("Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);
      await privateAPI.post("/staff/add-staff", {
        full_name: fullname,
        phone: contact,
        role_name: roleName,
        address,
        email,
        password,
      });
      resetForm();
      fetchStaffs(); // Refresh the staff list
    } catch (error) {
      setMsg(
        error.response?.data?.message || "Error occurred while adding staff",
      );
    } finally {
      setLoading(false);
    }
    resetForm();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl w-90 overflow-y-auto max-h-screen">
        <div className="flex items-center justify-start gap-3 mb-5">
          <UserRoundPlus className="w-5 h-5 text-gray-900" />

          <p className="text-[18px] font-bold text-gray-900">
            Employee Registration
          </p>
        </div>

        <p className="mb-1 font-medium text-gray-900">Full Name*</p>
        <input
          type="text"
          placeholder="Eg: Ram Bahadur"
          onChange={(e) => setFullname(e.target.value)}
          className="w-full h-9 mb-3 border border-[#4B2E2A] bg-white rounded-lg p-2"
        />

        <p className="mb-1 font-medium text-gray-900">Role Name*</p>
        <select
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          className="w-full mb-3 border border-[#4B2E2A] rounded-lg bg-white p-2"
        >
          <option value="" hidden>
            Select Role
          </option>
          {roles.map((role) => (
            <option key={role} value={role.toLowerCase()}>
              {role}
            </option>
          ))}
        </select>

        <p className="mb-1 font-medium text-gray-900">Phone*</p>
        <input
          type="tel"
          placeholder="Eg: 9XXXXXXXXX"
          onChange={(e) => setContact(e.target.value)}
          className="w-full h-9 mb-3 border border-[#4B2E2A] bg-white rounded-lg p-2"
        />

        <p className="mb-1 font-medium text-gray-900">Address*</p>
        <input
          type="text"
          placeholder="Eg: streetname, city"
          onChange={(e) => setAddress(e.target.value)}
          className="w-full h-9 mb-3 border border-[#4B2E2A] bg-white rounded-lg p-2"
        />

        <p className="mb-1 font-medium text-gray-900">Email*</p>
        <input
          type="email"
          placeholder="Eg: rambahadur@email.com"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-9 mb-3 border border-[#4B2E2A] bg-white rounded-lg p-2"
        />

        <p className="mb-1 font-medium text-gray-900">Password*</p>
        <div className="relative mb-3">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-10 border border-[#4B2E2A] bg-white rounded-lg p-2 pr-10"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <p className="font-medium text-sm mb-3 text-gray-600">
          Note: Every field with * is required
        </p>

        <p className="mb-5 font-medium text-sm text-red-500">{msg}</p>

        <div className="flex justify-between items-center">
          <button
            onClick={resetForm}
            className="inline-flex w-20 h-9 px-4 py-3 text-[15px] font-medium items-center justify-center bg-red-500 
            text-white rounded-lg hover:bg-red-600"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="inline-flex w-20 h-9 px-4 py-3 text-[15px] font-medium items-center justify-center 
            bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
export default AddStaffForm;
