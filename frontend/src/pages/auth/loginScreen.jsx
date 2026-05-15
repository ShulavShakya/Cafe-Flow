import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import logo from "../../assets/images/kitchen_pulse.png";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { publicAPI } from "../../auth/config/api";
import { useAuth } from "../../auth/authContext.jsx";

function LoginScreen() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");

  const { login } = useAuth();

  // admin validation
  const handleLogin = async (e) => {
    console.log("Handle Login called");
    e.preventDefault();

    try {
      const res = await publicAPI.post(
        "/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      // if (res.data.message === "Password change required") {
      //   toast.info("Password change required. Redirecting...");
      //   setTimeout(() => {
      //     navigate(`/change-password/${res.data.userId}`);
      //   }, 2000);
      //   return;
      // }

      // Run this once in browser console to nuke the stale cookie

      const user = res.data.data;

      login({
        userData: user,
      });

      toast.success("Logged in Successfully");

      setMsg("");

      if (user?.role?.role_name === "admin") {
        navigate("/dashboard");
      } else {
        navigate(-1);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Login Failed");
      setMsg("Invalid credentials");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <img
        src="./src/assets/images/piqsels.jpg"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Card */}
      <div className="relative z-10 w-[92%] max-w-md rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-2xl p-10">
        {/* Logo + Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30 shadow-lg">
            <img src={logo} alt="logo" className="w-full h-full object-cover" />
          </div>

          <h1 className="text-3xl font-bold text-white mt-4">Kitchen Pulse</h1>

          <p className="text-white/70 mt-1 text-sm">
            Welcome back! Please login
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-white/90 mb-2 text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 rounded-xl bg-white/15 border border-white/20 px-4 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-[#D4A373] transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-white/90 mb-2 text-sm font-medium">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 rounded-xl bg-white/15 border border-white/20 px-4 pr-12 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-[#D4A373] transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {msg && (
            <div className="text-center">
              <p className="text-red-300 text-sm font-medium">{msg}</p>
            </div>
          )}

          {/* Button */}
          <button
            type="button"
            onClick={handleLogin}
            className="w-full h-12 rounded-xl bg-[#D4A373] hover:bg-[#c8925e] active:scale-[0.99] transition-all duration-300 text-white font-semibold shadow-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;
