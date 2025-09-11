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
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        {currentUser ? (
          <p className="mb-6">Selamat datang, <b>{currentUser.name}</b>!</p>
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