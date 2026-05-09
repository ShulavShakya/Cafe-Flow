import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import logo from "../../assets/images/kitchen_pulse.png";

function LoginScreen() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");

  const handleLogin = () => {
    // admin validation
    if (username === "admin" && password.toLowerCase().trim() === "password") {
      navigate("/dashboard");
      return;
    }

    // user validation
    if (username === "user" && password === "456") {
      navigate("/dashboard");
      return;
    }

    // invalid
    setMsg("Invalid credentials");
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <img
        src="./src/assets/images/piqsels.jpg"
        alt="image"
        className="w-full
        h-full
        object-cover absolute inset-0 blur-xs"
      />
      <div className="backdrop-blur-3xl bg-white/10 border border-white/20 p-8 rounded-2xl shadow-lg w-100 text-center">
        <div className="inline-block w-20 h-20 mb-6 rounded-full overflow-hidden">
          <img src={logo} alt="logo" className="object-cover w-full h-full" />
        </div>

        <p className="text-[16px] font-medium mb-2 text-black">
          Already have an account? Login
        </p>

        <p className="mb-1 font-medium text-lg text-start text-[#4B2E2A]">
          Username
        </p>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className="w-full h-10 mb-3 border border-[#4B2E2A] bg-white rounded-lg p-2"
        />

        <p className="mb-1 font-medium text-lg text-start text-[#4B2E2A]">
          Password
        </p>

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

        <p className="mb-5 font-medium text-[16px] text-red-700">{msg}</p>

        <button
          onClick={handleLogin}
          className="text-lg px-4 py-1.5 font-medium
          bg-[#4B2E2A] text-[#FFF8F1] rounded-lg hover:bg-[#3B221F]"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginScreen;
