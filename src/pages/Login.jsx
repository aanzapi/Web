import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const REPO_OWNER = "aanzapi";
const REPO_NAME = "db";
const FILE_PATH = "users.json";

function Login() {
  const [emailOrUser, setEmailOrUser] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!emailOrUser || !password) return alert("Isi email/username dan password!");
    setLoading(true);

    try {
      const res = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
        { headers: { Authorization: `token ${GITHUB_TOKEN}` } }
      );
      const data = await res.json();
      const users = JSON.parse(atob(data.content));

      const found = users.find(
        u => (u.email === emailOrUser || u.name === emailOrUser) && u.password === password
      );

      if (found) {
        localStorage.setItem("currentUser", JSON.stringify(found));
        navigate("/dashboard");
      } else {
        alert("Email/Username atau Password salah!");
      }
    } catch (err) {
      console.error(err);
      alert("Gagal ambil data dari GitHub!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <input type="text" placeholder="Email / Username" className="w-full border rounded-xl px-4 py-2 mb-4" value={emailOrUser} onChange={e => setEmailOrUser(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full border rounded-xl px-4 py-2 mb-4" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={handleLogin} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl" disabled={loading}>
          {loading ? "Memeriksa..." : "Login"}
        </button>
        <p className="text-center mt-4 text-sm">Belum punya akun? <Link to="/register" className="text-blue-500">Daftar</Link></p>
      </div>
    </div>
  );
}

export default Login;
