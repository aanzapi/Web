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

    alert("Registrasi berhasil!");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <input
          type="text"
          placeholder="Nama"
          className="w-full border rounded-xl px-4 py-2 mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-xl px-4 py-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-xl px-4 py-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Ulangi Password"
          className="w-full border rounded-xl px-4 py-2 mb-4"
          value={repeatPw}
          onChange={(e) => setRepeatPw(e.target.value)}
        />
        <button
          onClick={handleRegister}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl"
        >
          Register
        </button>
        <p className="text-center mt-4 text-sm">
          Sudah punya akun? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
