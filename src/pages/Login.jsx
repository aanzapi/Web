import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-96 transform transition-all hover:scale-105">
        {/* Pesan sambutan */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-blue-600">
            🚀 Selamat datang di{" "}
            <span className="text-blue-700">Hasilkan Cuanmu Sekarang!!</span>
          </h1>
          <p className="text-gray-500 text-sm mt-3">
            Mulai perjalananmu untuk meraih cuan dengan mudah dan cepat 💰✨
          </p>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
          Login ke Akunmu
        </h2>
        <input
          type="text"
          placeholder="Email / Username"
          className="w-full border-2 border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-3 mb-4 outline-none transition"
          value={emailOrUser}
          onChange={(e) => setEmailOrUser(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border-2 border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-3 mb-6 outline-none transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-md transition"
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
