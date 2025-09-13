import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [tab, setTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar (drawer) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 z-50
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-blue-600">Menu</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-600 hover:text-red-500 text-lg font-bold"
          >
            ✖
          </button>
        </div>

        <nav className="flex flex-col gap-3 p-6">
          {[
            { id: "home", label: "Home" },
            { id: "profile", label: "Profile" },
            { id: "withdraw", label: "Withdraw" },
            { id: "edit", label: "Edit Profil" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setTab(item.id);
                setSidebarOpen(false);
              }}
              className={`text-left px-4 py-2 rounded-lg transition ${
                tab === item.id
                  ? "bg-blue-500 text-white font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6">
          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-2xl text-gray-700 hover:text-blue-600"
          >
            ☰
          </button>
          <h2 className="text-2xl font-bold">Dashboard</h2>
        </div>

        {/* Content */}
        {tab === "home" && (
  <div className="relative flex flex-col items-center justify-center text-center py-16 min-h-[60vh] overflow-hidden">
    {/* Ornamen blur background */}
    <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
    <div className="absolute bottom-0 -right-10 w-40 h-40 bg-red-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>

    {/* Card Info */}
    <div className="relative bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-white shadow-2xl rounded-2xl p-10 max-w-md z-10">
      <h3 className="text-2xl font-bold mb-3 drop-shadow-md">🚧 Website Sedang Maintenance</h3>
      <p className="mb-6 text-sm leading-relaxed drop-shadow-sm">
        Kami sedang meningkatkan sistem agar pengalamanmu lebih baik ✨<br />
        Silahkan login kembali nanti.
      </p>
      <div className="animate-bounce text-4xl">⚠️</div>
    </div>
  </div>
)}
        {tab === "profile" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Profil Saya</h3>
            {currentUser ? (
              <div className="space-y-2">
                <p>
                  <b>Nama:</b> {currentUser.name}
                </p>
                <p>
                  <b>Email:</b> {currentUser.email}
                </p>
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
  );
}

export default Dashboard;
