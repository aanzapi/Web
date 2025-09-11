import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// === CONFIG ===
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN; // ambil dari env
const REPO_OWNER = "aanzapi";
const REPO_NAME = "db";
const FILE_PATH = "users.json";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPw, setRepeatPw] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) { alert("Semua field wajib diisi!"); return; }
    if (password !== repeatPw) { alert("Password tidak sama!"); return; }

    setLoading(true);
    const newUser = { id: Date.now(), name, email, password };

    try {
      // 1️⃣ Ambil file users.json terbaru untuk SHA
      const res = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
        { headers: { Authorization: `token ${GITHUB_TOKEN}` } }
      );
      const data = await res.json();
      const sha = data.sha;
      const content = JSON.parse(atob(data.content));

      // 2️⃣ Cek email sudah ada
      if (content.find(u => u.email === email)) {
        alert("Email sudah terdaftar!");
        setLoading(false);
        return;
      }

      // 3️⃣ Tambah user baru
      content.push(newUser);

      // 4️⃣ Encode ke Base64
      const encodedContent = btoa(JSON.stringify(content, null, 2));

      // 5️⃣ Push ke GitHub
      const putRes = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
        {
          method: "PUT",
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `Add new user ${email}`,
            content: encodedContent,
            sha: sha,
          }),
        }
      );

      const putData = await putRes.json();
      console.log(putData); // cek response
      if (putData.content) {
        alert("Registrasi berhasil!");
        navigate("/login");
      } else {
        console.error(putData);
        alert("Gagal menyimpan data ke GitHub!");
      }

    } catch (err) {
      console.error(err);
      alert("Terjadi error saat menghubungi GitHub!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <input type="text" placeholder="Nama" className="w-full border rounded-xl px-4 py-2 mb-4" value={name} onChange={e => setName(e.target.value)} />
        <input type="email" placeholder="Email" className="w-full border rounded-xl px-4 py-2 mb-4" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full border rounded-xl px-4 py-2 mb-4" value={password} onChange={e => setPassword(e.target.value)} />
        <input type="password" placeholder="Ulangi Password" className="w-full border rounded-xl px-4 py-2 mb-4" value={repeatPw} onChange={e => setRepeatPw(e.target.value)} />
        <button onClick={handleRegister} className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl" disabled={loading}>
          {loading ? "Menyimpan..." : "Register"}
        </button>
        <p className="text-center mt-4 text-sm">Sudah punya akun? <Link to="/login" className="text-blue-500">Login</Link></p>
      </div>
    </div>
  );
}

export default Register;
