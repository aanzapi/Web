import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPw, setRepeatPw] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!name || !email || !password) {
      alert("Semua field wajib diisi!");
      return;
    }
    if (password !== repeatPw) {
      alert("Password tidak sama!");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let exist = users.find((u) => u.email === email);
    if (exist) {
      alert("Email sudah terdaftar!");
      return;
    }

    let newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Kirim notif Telegram
    const BOT_TOKEN = "8342430249:AAFYA-nce0iCkMXKj9T9-_q1ABODB4FVM78";
    const CHAT_ID = "8038424443";
    const text = `📢 Ada user baru daftar!\n\n👤 Nama: ${name}\n📧 Email: ${email}`;

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "Markdown"
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Notif Telegram:", data))
      .catch((err) => console.error("Error kirim notif:", err));

    alert("Registrasi berhasil!");
    navigate("/login");
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 overflow-hidden">
      {/* Background dekorasi */}
      <svg
        className="absolute top-0 left-0 w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 800 800"
      >
        <circle cx="400" cy="400" r="400" fill="url(#grad2)" />
        <defs>
          <radialGradient id="grad2">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>

      {/* Card register */}
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-[420px] relative z-10">
        {/* Garis dekorasi */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 via-blue-500 to-indigo-500 rounded-t-3xl"></div>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="https://avatars.githubusercontent.com/u/198349497?v=4"
            alt="Logo"
            className="w-20 h-20 rounded-full shadow-md border-4 border-green-200"
          />
        </div>

        {/* Teks header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            ✨ Buat Akun Baru
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Daftar sekarang dan mulai hasilkan cuanmu 🚀
          </p>
        </div>

        {/* Form Register */}
        <input
          type="text"
          placeholder="Nama"
          className="w-full border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-xl px-4 py-3 mb-4 outline-none transition"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-xl px-4 py-3 mb-4 outline-none transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-xl px-4 py-3 mb-4 outline-none transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Ulangi Password"
          className="w-full border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-xl px-4 py-3 mb-6 outline-none transition"
          value={repeatPw}
          onChange={(e) => setRepeatPw(e.target.value)}
        />
        <button
          onClick={handleRegister}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:opacity-90 text-white py-3 rounded-xl font-semibold shadow-md transition"
        >
          Register
        </button>

        {/* Link login */}
        <p className="text-center mt-6 text-sm text-gray-600">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="text-green-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
