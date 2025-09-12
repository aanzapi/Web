import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn } from "lucide-react"; // icon dari lucide-react

function Login() {
  const [emailOrUser, setEmailOrUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let found = users.find(
      (u) =>
        (u.email === emailOrUser || u.name === emailOrUser) &&
        u.password === password
    );

    if (found) {
      localStorage.setItem("currentUser", JSON.stringify(found));
      navigate("/dashboard");
    } else {
      alert("Email/Username atau Password salah!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-[420px] relative overflow-hidden">
        {/* Background dekorasi */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-t-3xl"></div>

        {/* Icon / ilustrasi */}
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-4 rounded-full shadow-inner">
            <LogIn size={40} className="text-blue-600" />
          </div>
        </div>

        {/* Pesan sambutan */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            🚀 Selamat datang di{" "}
            <span className="text-blue-600">Hasilkan Cuanmu Sekarang!!</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Wujudkan impian finansialmu dengan platform terbaik 💰✨
          </p>
        </div>

        <div className="border-b border-gray-200 mb-6"></div>

        {/* Form login */}
        <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
          Login ke Akunmu
        </h2>
        <input
          type="text"
          placeholder="Email / Username"
          className="w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-3 mb-4 outline-none transition"
          value={emailOrUser}
          onChange={(e) => setEmailOrUser(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-3 mb-6 outline-none transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 text-white py-3 rounded-xl font-semibold shadow-md transition"
        >
          Login
        </button>

        <p className="text-center mt-6 text-sm text-gray-600">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
