import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiHome,
  FiUser,
  FiDollarSign,
  FiEdit2,
  FiLogOut,
  FiX,
  FiAlertTriangle,
  FiRefreshCw,
  FiCheck,
  FiChevronRight,
  FiMail,
  FiLock,
  FiCreditCard,
  FiSettings
} from "react-icons/fi";

function Dashboard() {
  const navigate = useNavigate();
  let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {
    name: "Pengguna",
    email: "user@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user"
  };
  
  const [tab, setTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMaintenance, setShowMaintenance] = useState(false);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [userData, setUserData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    password: ""
  });

  const fetchGame = async () => {
    try {
      const res = await fetch("https://api.sxtream.xyz/games/caklontong");
      const data = await res.json();
      setQuestion(data.result);
      setFeedback("");
      setAnswer("");
    } catch (err) {
      console.error("Gagal fetch game:", err);
      // Data fallback jika API gagal
      setQuestion({
        soal: "Apa yang selalu datang tetapi tidak pernah sampai?",
        jawaban: "besok"
      });
    }
  };

  useEffect(() => {
    if (!showMaintenance) {
      fetchGame();
    }
  }, [showMaintenance]);

  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const handleSubmitAnswer = () => {
    if (!answer.trim()) {
      setFeedback("⚠️ Silakan masukkan jawaban terlebih dahulu!");
      return;
    }
    
    if (answer.trim().toLowerCase() === question.jawaban.toLowerCase()) {
      setFeedback("🎉 Benar! Jawaban kamu tepat!");
    } else {
      setFeedback(`❌ Masih kurang tepat! Jawaban benar: ${question.jawaban}`);
    }
  };

  const handleWithdraw = () => {
    if (!withdrawAmount || withdrawAmount <= 0) {
      alert("Masukkan jumlah yang valid");
      return;
    }
    alert(`Withdraw sebesar ${withdrawAmount} berhasil diajukan!`);
    setWithdrawAmount("");
  };

  const handleSaveProfile = () => {
    alert("Profil berhasil disimpan!");
    localStorage.setItem("currentUser", JSON.stringify({
      ...currentUser,
      name: userData.name,
      email: userData.email
    }));
  };

  const menuItems = [
    { id: "home", label: "Home", icon: <FiHome /> },
    { id: "profile", label: "Profile", icon: <FiUser /> },
    { id: "withdraw", label: "Withdraw", icon: <FiDollarSign /> },
    { id: "edit", label: "Edit Profil", icon: <FiEdit2 /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header Mobile */}
      <div className="sticky top-0 z-40 bg-white shadow-md lg:hidden">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
            >
              <FiMenu size={20} />
            </button>
            <div className="flex items-center space-x-2">
              <img
                src={currentUser.avatar}
                alt="Avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium text-gray-800">{currentUser.name}</span>
            </div>
          </div>
          <button
            onClick={logout}
            className="p-2 text-gray-600 hover:text-red-500"
          >
            <FiLogOut size={20} />
          </button>
        </div>
      </div>

      {/* Sidebar untuk Desktop & Mobile */}
      <div className={`fixed inset-0 z-50 lg:z-auto lg:relative lg:flex lg:w-64 ${sidebarOpen ? '' : 'hidden lg:block'}`}>
        {/* Overlay untuk mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar Content */}
        <div className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white transform transition-transform duration-300 z-50 lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full">
            {/* Logo & Close Button */}
            <div className="flex justify-between items-center p-6 border-b border-blue-700">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white rounded-lg">
                  <span className="text-blue-600 font-bold text-xl">⚡</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold">Dashboard</h2>
                  <p className="text-blue-200 text-sm">Premium Account</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-blue-200 hover:text-white"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* User Profile */}
            <div className="p-6 border-b border-blue-700">
              <div className="flex items-center space-x-4">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-14 h-14 rounded-full border-2 border-white"
                />
                <div>
                  <h3 className="font-semibold text-lg">{currentUser.name}</h3>
                  <p className="text-blue-200 text-sm">{currentUser.email}</p>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 p-4">
              <div className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      tab === item.id
                        ? "bg-white text-blue-600 shadow-lg"
                        : "text-blue-100 hover:bg-blue-700 hover:text-white"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                    {tab === item.id && (
                      <FiChevronRight className="ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </nav>

            {/* Logout Button */}
            <div className="p-6 border-t border-blue-700">
              <button
                onClick={logout}
                className="w-full flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl transition-colors duration-200"
              >
                <FiLogOut />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        <div className="p-4 lg:p-8">
          {/* Desktop Header */}
          <div className="hidden lg:flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-gray-600">Selamat datang kembali, {currentUser.name}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowMaintenance(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200"
              >
                <FiAlertTriangle />
                <span>Maintenance</span>
              </button>
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="max-w-4xl mx-auto">
            {showMaintenance && (
              <div className="mb-8 animate-fade-in">
                <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 border-l-4 border-yellow-500 rounded-xl p-6 shadow-lg relative">
                  <button
                    onClick={() => setShowMaintenance(false)}
                    className="absolute top-4 right-4 text-yellow-600 hover:text-yellow-800"
                  >
                    <FiX size={20} />
                  </button>
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <FiAlertTriangle className="text-yellow-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-yellow-800 mb-2">⚠️ Website Sedang Maintenance</h3>
                      <p className="text-yellow-700">
                        Kami sedang melakukan peningkatan sistem untuk pengalaman yang lebih baik. 
                        Silakan login kembali nanti. Terima kasih atas pengertiannya 🙏
                      </p>
                      <div className="mt-4 flex items-center space-x-2 text-sm text-yellow-600">
                        <span>🕐 Estimasi selesai: 2 jam lagi</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Home Tab - Game Cak Lontong */}
            {tab === "home" && !showMaintenance && (
              <div className="animate-slide-up">
                <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">🎮 Game Cak Lontong</h2>
                      <p className="text-gray-600">Asah pengetahuanmu dengan teka-teki seru!</p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>🎯 Skor: 1500</span>
                      <span className="text-gray-300">•</span>
                      <span>🏆 Level: 5</span>
                    </div>
                  </div>

                  {question ? (
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                        <div className="flex items-center space-x-2 text-blue-600 mb-4">
                          <FiSettings />
                          <span className="font-semibold">Pertanyaan</span>
                        </div>
                        <p className="text-xl text-gray-800 leading-relaxed">{question.soal}</p>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Jawabanmu
                        </label>
                        <input
                          type="text"
                          value={answer}
                          onChange={(e) => setAnswer(e.target.value)}
                          placeholder="Ketik jawabanmu di sini..."
                          className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-lg"
                          onKeyPress={(e) => e.key === 'Enter' && handleSubmitAnswer()}
                        />
                      </div>

                      <button
                        onClick={handleSubmitAnswer}
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-4 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                      >
                        Submit Jawaban
                      </button>

                      {feedback && (
                        <div className={`p-4 rounded-xl ${
                          feedback.includes("Benar") 
                            ? "bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200" 
                            : "bg-gradient-to-r from-red-50 to-pink-50 border border-red-200"
                        } animate-fade-in`}>
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${
                              feedback.includes("Benar") ? "bg-green-100" : "bg-red-100"
                            }`}>
                              {feedback.includes("Benar") ? (
                                <FiCheck className="text-green-600" size={20} />
                              ) : (
                                <span className="text-red-600">❌</span>
                              )}
                            </div>
                            <p className={`font-semibold ${
                              feedback.includes("Benar") ? "text-green-700" : "text-red-700"
                            }`}>
                              {feedback}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between pt-6 border-t border-gray-100">
                        <button
                          onClick={fetchGame}
                          className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors duration-200"
                        >
                          <FiRefreshCw />
                          <span>Main Lagi</span>
                        </button>
                        <div className="text-sm text-gray-500">
                          <span>⚡ Kesempatan: 3/5</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="animate-pulse">
                        <div className="w-16 h-16 bg-blue-200 rounded-full mx-auto mb-4"></div>
                        <p className="text-gray-500">Memuat pertanyaan...</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {tab === "profile" && (
              <div className="animate-slide-up">
                <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <FiUser className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">Profil Saya</h2>
                      <p className="text-gray-600">Informasi akun dan statistik</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-100">
                      <h3 className="font-semibold text-gray-700 mb-4">Informasi Pribadi</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm text-gray-500">Nama Lengkap</label>
                          <p className="font-medium text-gray-800">{currentUser.name}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">Email</label>
                          <p className="font-medium text-gray-800">{currentUser.email}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">Member Sejak</label>
                          <p className="font-medium text-gray-800">15 Maret 2024</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100">
                      <h3 className="font-semibold text-gray-700 mb-4">Statistik Akun</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Level</span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full font-medium">Premium</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Game Dimainkan</span>
                          <span className="font-bold text-gray-800">42</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Skor Total</span>
                          <span className="font-bold text-gray-800">1,850</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-100">
                    <h3 className="font-semibold text-gray-700 mb-4">Avatar</h3>
                    <div className="flex items-center space-x-6">
                      <img
                        src={currentUser.avatar}
                        alt="Avatar"
                        className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                      />
                      <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200">
                        Ganti Avatar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Withdraw Tab */}
            {tab === "withdraw" && (
              <div className="animate-slide-up">
                <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="p-3 bg-green-100 rounded-xl">
                      <FiDollarSign className="text-green-600" size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">Withdraw</h2>
                      <p className="text-gray-600">Tarik saldo ke rekening Anda</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="md:col-span-2 bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border border-green-100">
                      <h3 className="font-semibold text-gray-700 mb-6">Informasi Withdraw</h3>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            Jumlah Withdraw
                          </label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">Rp</span>
                            <input
                              type="number"
                              value={withdrawAmount}
                              onChange={(e) => setWithdrawAmount(e.target.value)}
                              placeholder="0"
                              className="w-full pl-12 pr-6 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none text-lg"
                            />
                          </div>
                          <p className="text-sm text-gray-500 mt-2">Minimal withdraw: Rp 50.000</p>
                        </div>

                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            Pilih Metode
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {['Bank Transfer', 'E-Wallet'].map((method) => (
                              <button
                                key={method}
                                className="p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-200 text-center"
                              >
                                <div className="flex items-center justify-center space-x-2">
                                  <FiCreditCard />
                                  <span>{method}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-100">
                      <h3 className="font-semibold text-gray-700 mb-4">Ringkasan</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Saldo Tersedia</span>
                          <span className="font-bold text-gray-800">Rp 500.000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Jumlah Withdraw</span>
                          <span className="font-bold text-gray-800">
                            {withdrawAmount ? `Rp ${parseInt(withdrawAmount).toLocaleString()}` : 'Rp 0'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Biaya Admin</span>
                          <span className="text-gray-800">Rp 2.500</span>
                        </div>
                        <div className="border-t pt-4">
                          <div className="flex justify-between font-bold text-lg">
                            <span>Total Diterima</span>
                            <span className="text-green-600">
                              {withdrawAmount ? `Rp ${(parseInt(withdrawAmount) - 2500).toLocaleString()}` : 'Rp 0'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleWithdraw}
                        className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                      >
                        Ajukan Withdraw
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Profile Tab */}
            {tab === "edit" && (
              <div className="animate-slide-up">
                <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="p-3 bg-purple-100 rounded-xl">
                      <FiEdit2 className="text-purple-600" size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">Edit Profil</h2>
                      <p className="text-gray-600">Perbarui informasi akun Anda</p>
                    </div>
                  </div>

                  <div className="max-w-2xl">
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            <div className="flex items-center space-x-2">
                              <FiUser />
                              <span>Nama Lengkap</span>
                            </div>
                          </label>
                          <input
                            type="text"
                            value={userData.name}
                            onChange={(e) => setUserData({...userData, name: e.target.value})}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            <div className="flex items-center space-x-2">
                              <FiMail />
                              <span>Email</span>
                            </div>
                          </label>
                          <input
                            type="email"
                            value={userData.email}
                            onChange={(e) => setUserData({...userData, email: e.target.value})}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          <div className="flex items-center space-x-2">
                            <FiLock />
                            <span>Password Baru</span>
                          </div>
                        </label>
                        <input
                          type="password"
                          value={userData.password}
                          onChange={(e) => setUserData({...userData, password: e.target.value})}
                          placeholder="Kosongkan jika tidak ingin mengubah"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 outline-none"
                        />
                      </div>

                      <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-100">
                        <h3 className="font-semibold text-gray-700 mb-4">Konfirmasi Perubahan</h3>
                        <p className="text-gray-600 text-sm mb-4">
                          Setelah menyimpan perubahan, Anda akan menerima email konfirmasi.
                        </p>
                        <div className="flex items-center space-x-4">
                          <input type="checkbox" id="confirm" className="w-4 h-4" />
                          <label htmlFor="confirm" className="text-gray-700">
                            Saya menyetujui perubahan data ini
                          </label>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-4 pt-6">
                        <button
                          onClick={() => {
                            setUserData({
                              name: currentUser.name,
                              email: currentUser.email,
                              password: ""
                            });
                          }}
                          className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                        >
                          Batal
                        </button>
                        <button
                          onClick={handleSaveProfile}
                          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                        >
                          Simpan Perubahan
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add custom styles for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Dashboard;