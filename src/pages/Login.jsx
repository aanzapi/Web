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
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
      {/* SVG Background dekorasi */}
      <svg
        className="absolute top-0 left-0 w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 800 800"
      >
        <circle cx="400" cy="400" r="400" fill="url(#grad1)" />
        <defs>
          <radialGradient id="grad1">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>

      {/* Card login */}
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-[420px] relative z-10">
        {/* Garis dekorasi */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-t-3xl"></div>

        {/* Promo banner */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold p-3 rounded-xl shadow-md text-center mb-6">
          🎯 Layanan Freelance Premium  
          <p className="text-sm font-normal mt-1">
            Berbagai pilihan freelance profesional dengan upah hingga <b>jutaan rupiah</b> setiap project!
          </p>
        </div>

        {/* Ilustrasi emoji */}
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-5 rounded-full shadow-inner text-4xl">
            💰
          </div>
        </div>

        {/* Pesan sambutan */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            🚀 Selamat datang di{" "}
            <span className="text-blue-600">Hasilkan Cuanmu Sekarang!!</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Wujudkan impian finansialmu dengan platform terbaik ✨
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

      {/* Contact CS pojok kanan bawah */}
      <a
        href="https://t.me/AanzCuyxzzz"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full shadow-lg text-sm font-semibold transition"
      >
        💬 Contact CS
      </a>
    </div>
  );
}

export default Login;
