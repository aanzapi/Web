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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-xl flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8 text-blue-600">Dashboard</h2>

        <nav className="flex flex-col gap-3 flex-grow">
          {[
            { id: "home", label: "Home" },
            { id: "profile", label: "Profile" },
            { id: "withdraw", label: "Withdraw" },
            { id: "edit", label: "Edit Profil" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
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

        <button
          onClick={logout}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
        >
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-8">
        {tab === "home" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Selamat Datang 🎉</h3>
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
