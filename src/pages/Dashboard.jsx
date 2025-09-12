import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white shadow-xl rounded-2xl p-8 w-96 text-center">
      {/* Info maintenance */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg mb-6">
        <p className="text-sm">
          ⚠️ Website sedang dalam <b>maintenance</b>.  
          Kami sedang meningkatkan layanan agar lebih baik untukmu ✨
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      {currentUser ? (
        <p className="mb-6">
          Selamat datang, <b>{currentUser.name}</b>!
        </p>
      ) : (
        <p className="mb-6">Kamu belum login.</p>
      )}
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl"
      >
        Logout
      </button>
    </div>
  </div>
);
}

export default Dashboard;
