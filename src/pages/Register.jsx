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

    try {
      let users = JSON.parse(localStorage.getItem("users")) || [];
      let exist = users.find((u) => u.email === email);
      if (exist) {
        alert("Email sudah terdaftar!");
        return;
      }

      let newUser = { id: Date.now(), name, email, password };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
    } catch (err) {
      console.error("Error menyimpan user:", err);
      alert("Gagal menyimpan data. Cek console.");
      return;
    }

    // --- NOTIF TELEGRAM: REKOMENDASI PAKAI SERVER ---
    // Jika kamu punya server, arahkan request ke endpoint servermu untuk mengirimkan
    // notifikasi Telegram (server menyimpan BOT_TOKEN). Contoh:
    // fetch('/api/notify-new-user', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({name, email}) })
    //   .catch(err => console.warn('Notif server gagal (aman):', err));
    //
    // Kalau kamu benar-benar mau kirim langsung dari client (TIDAK DIREKOMENDASIKAN):
    // - Ini akan *expose* BOT_TOKEN di client dan mungkin kena CORS, jadi hati-hati.
    //
    // Non-blocking: kita *tidak* menunggu notif supaya registrasi tetap jalan.

    alert("Registrasi berhasil!");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-96 relative">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Register
        </h2>

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="https://avatars.githubusercontent.com/u/198349497?v=4"
            alt="Logo"
            className="w-20 h-20 rounded-full shadow-md border-4 border-blue-100"
          />
        </div>

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

        {/* (optional) small note under */}
        <p className="text-center mt-2 text-xs text-gray-400">
          Layanan freelance tersedia — cek dashboard setelah login.
        </p>
      </div>

      {/* Tombol Contact CS (fixed pojok kanan bawah) */}
      <a
        href="https://t.me/AanzCuyxzzz"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#0088cc] rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform z-50"
        title="Hubungi CS via Telegram"
      >
        {/* Telegram SVG (no dependency) */}
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.999 15.2 9.9 19c.4 0 .6-.2.8-.4l2-1.9 4.1 3c.8.4 1.4.2 1.6-.7l3-13c.3-1.2-.4-1.7-1.2-1.4L2.7 9c-1.2.4-1.2 1.1-.2 1.4l4.7 1.5 10.9-6.9c.5-.3 1-.1.6.2l-8.7 8z"/>
        </svg>
      </a>
    </div>
  );
}

export default Register;
