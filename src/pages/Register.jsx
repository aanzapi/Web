import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaTelegramPlane } from "react-icons/fa";

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
        parse_mode: "Markdown",
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Notif Telegram:", data))
      .catch((err) => console.error("Error kirim notif:", err));

    alert("Registrasi berhasil!");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-96 relative">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Register
        </h2>
        <input
          type="text"
          placeholder="Nama"
          className="w-full border rounded-xl px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-xl px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-xl px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Ulangi Password"
          className="w-full border rounded-xl px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
          value={repeatPw}
          onChange={(e) => setRepeatPw(e.target.value)}
        />
        <button
          onClick={handleRegister}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl transition duration-200"
        >
          Register
        </button>
        <p className="text-center mt-4 text-sm text-gray-600">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-blue-500 font-semibold">
            Login
          </Link>
        </p>

        {/* Contact CS */}
        <a
          href="https://t.me/AanzCuyxzzz"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute -bottom-10 right-4 flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          <FaTelegramPlane className="text-lg" />
          Contact CS
        </a>
      </div>
    </div>
  );
}

export default Register;
