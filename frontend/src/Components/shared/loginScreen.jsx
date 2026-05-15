import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import logo from "../../assets/images/kitchen_pulse.png";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { publicAPI } from "../../auth/config/api";

function LoginScreen() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");

  // admin validation
  const handleLogin = async (e) => {
    console.log("Handle Login called again");
    e.preventDefault();

    try {
      const res = await publicAPI.post("/auth/login", {
        email,
        password,
      });

      const user = res.data.data;
      console.log(user);
      console.log("Response data", res.data);

      console.log("Access_token", res.data.accessToken);

      Cookies.set("user", JSON.stringify(user));
      Cookies.set("access_token", res.data.accessToken);

      toast.success("Logged in Successfully");

      setMsg("");

      if (user.role.role_name === "admin") {
        navigate("/dashboard");
      } else if (user){
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
        <div className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-white mb-2 font-medium">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 rounded-xl bg-white/20 border border-white/20 px-4 text-white placeholder:text-white/60 outline-none focus:ring-2 focus:ring-[#D4A373]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-white mb-2 font-medium">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 rounded-xl bg-white/20 border border-white/20 px-4 pr-12 text-white placeholder:text-white/60 outline-none focus:ring-2 focus:ring-[#D4A373]"
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

          {/* Error */}
          {msg && (
            <p className="text-red-300 text-sm font-medium text-center">
              {msg}
            </p>
          )}

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full h-12 rounded-xl bg-[#D4A373] hover:bg-[#c8925e] transition-all duration-300 text-white font-semibold text-lg shadow-lg"
          >
            Login
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/20" />
          <span className="text-white/60 text-sm">OR</span>
          <div className="flex-1 h-px bg-white/20" />
        </div>

        {/* Signup */}
        <div className="text-center">
          <p className="text-white/80 mb-4">Don&apos;t have an account?</p>

          <button
            onClick={() => navigate("/signup")}
            className="w-full h-12 rounded-xl border border-white/30 text-white font-medium hover:bg-white/10 transition-all duration-300"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
