import { useState } from "react";
import { useAuth } from "../../auth/authContext.jsx";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import logo from "../../assets/images/kitchen_pulse.png";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { publicAPI } from "../../auth/config/api";

function LoginScreen() {
  const { login } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // admin validation
  const handleLogin = async (e) => {
    console.log("Handle Login called again");
    e.preventDefault();

    try {
      setLoading(true);
      const res = await publicAPI.post("/auth/login", {
        email,
        password,
      });
      const userData = res.data.data;
      console.log("Login successful:", userData);

      login({ userData });

      toast.success("Logged in Successfully");

      setMsg("");

      const role = userData.role.role_name;

      if (role === "admin") {
        navigate("/admin");
      } else if (role === "waiter") {
        navigate("/waiter");
      } else if (role === "receptionist") {
        navigate("/receptionist");
      } else if (role === "kitchen") {
        navigate("/kitchen");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);

      toast.error("Login Failed");
      setMsg("Invalid credentials");
    } finally {
      setLoading(false);
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
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Login Card */}
      <div className="relative z-10 w-[90%] max-w-md rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-2xl p-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30 shadow-lg">
            <img src={logo} alt="logo" className="w-full h-full object-cover" />
          </div>

          <h1 className="text-3xl font-bold text-white mt-4">Kitchen Pulse</h1>

          <p className="text-white/80 mt-1 text-sm">
            Welcome back! Please login
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-white mb-2 font-medium"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              required
              className="w-full h-12 rounded-xl bg-white/20 border border-white/20 px-4 text-white placeholder:text-white/60 outline-none focus:ring-2 focus:ring-[#D4A373] transition"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-white mb-2 font-medium"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="w-full h-12 rounded-xl bg-white/20 border border-white/20 px-4 pr-12 text-white placeholder:text-white/60 outline-none focus:ring-2 focus:ring-[#D4A373] transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {msg && (
            <p className="text-red-400 text-sm font-medium text-center bg-red-500/10 border border-red-500/20 rounded-lg py-2 px-3">
              {msg}
            </p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full h-12 rounded-xl mt-4 text-white font-semibold text-lg shadow-lg transition-all duration-300 ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-[#D4A373] hover:bg-[#c8925e]"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;
