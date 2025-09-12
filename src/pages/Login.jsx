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

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="https://avatars.githubusercontent.com/u/198349497?v=4"
            alt="Logo"
            className="w-20 h-20 rounded-full shadow-md border-4 border-blue-200"
          />
        </div>

        {/* Informasi Freelance */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-gray-800">
            🎯 Layanan Freelance Premium
          </h1>
          <p className="text-gray-600 text-sm mt-2">
            Pilih berbagai freelancer profesional dengan upah hingga{" "}
            <span className="font-semibold text-indigo-600">
              jutaan rupiah
            </span>{" "}
            per project!
          </p>
        </div>

        <div className="border-b border-gray-200 mb-6"></div>

        {/* Form login */}
        <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
          Login
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

        {/* Link daftar */}
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

      {/* Tombol Contact CS (pojok kanan bawah) */}
      <a
        href="https://t.me/AanzCuyxzzz"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#0088cc] rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform z-50"
      >
        {/* Icon Telegram */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 text-white"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M9.999 15.2 9.9 19c.4 0 .6-.2.8-.4l2-1.9 4.1 3c.8.4 1.4.2 1.6-.7l3-13c.3-1.2-.4-1.7-1.2-1.4L2.7 9c-1.2.4-1.2 1.1-.2 1.4l4.7 1.5 10.9-6.9c.5-.3 1-.1.6.2l-8.7 8z" />
        </svg>
      </a>
    </div>
  );
}

export default Login;
