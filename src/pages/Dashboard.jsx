import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [tab, setTab] = useState("home");

  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-8">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm"
          >
            Logout
          </button>
        </div>

        {/* Menu Navigation */}
        <div className="flex justify-around border-b mb-6">
          {["home", "profile", "withdraw", "edit"].map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`px-4 py-2 ${
                tab === item
                  ? "border-b-2 border-blue-500 text-blue-600 font-semibold"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {tab === "home" && (
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Selamat Datang!</h3>
              <p className="text-gray-600">
                Hai {currentUser?.name}, selamat datang di dashboardmu ✨
              </p>
            </div>
          )}

          {tab === "profile" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Profil Saya</h3>
              {currentUser ? (
                <div className="space-y-2">
                  <p><b>Nama:</b> {currentUser.name}</p>
                  <p><b>Email:</b> {currentUser.email}</p>
                </div>
              ) : (
                <p className="text-gray-600">Kamu belum login.</p>
              )}
            </div>
          )}

          {tab === "withdraw" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Withdraw</h3>
              <p className="text-gray-600 mb-4">
                Isi form untuk melakukan withdraw (dummy dulu).
              </p>
              <input
                type="number"
                placeholder="Jumlah withdraw"
                className="w-full border rounded-xl px-4 py-2 mb-4"
              />
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl">
                Submit
              </button>
            </div>
          )}

          {tab === "edit" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Edit Profil</h3>
              <input
                type="text"
                defaultValue={currentUser?.name}
                placeholder="Nama"
                className="w-full border rounded-xl px-4 py-2 mb-4"
              />
              <input
                type="email"
                defaultValue={currentUser?.email}
                placeholder="Email"
                className="w-full border rounded-xl px-4 py-2 mb-4"
              />
              <input
                type="password"
                placeholder="Password baru"
                className="w-full border rounded-xl px-4 py-2 mb-4"
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl">
                Simpan
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
