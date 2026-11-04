import { useState } from 'react';

// Subcomponents
import HomeServices from './components/HomeServices';
import ServiceHistory from './components/ServiceHistory';
import MyProfile from './components/MyProfile';
import HelpDesk from './components/HelpDesk';

type TabType = 'home' | 'history' | 'profile' | 'help';

interface NavItem {
  id: TabType;
  label: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Form states
  const [selectedService, setSelectedService] = useState('Electrical Repairs (₹99)');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('10:00 AM');
  const [address, setAddress] = useState('');

  const navItems: NavItem[] = [
    { id: 'home', label: '🏠 Home & Services' },
    { id: 'history', label: '📑 Service History' },
    { id: 'profile', label: '👤 My Profile' },
    { id: 'help', label: '🛟 Help Desk' },
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setIsModalOpen(false);
      setActiveTab('history'); // Automatically switches to Service History tab to show the booking!
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans relative">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')} 
          className="flex items-center space-x-2 cursor-pointer select-none"
        >
          <span className="text-2xl font-black tracking-tight text-blue-600">HOMIQO</span>
        </div>

        {/* Dynamic Nav Tabs */}
        <nav className="flex space-x-1 sm:space-x-2 bg-slate-100 p-1 rounded-full border border-slate-200">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setActiveTab('profile')}
            className="border border-blue-600 text-blue-600 px-3.5 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-50 transition"
          >
            Hi, User
          </button>
          
          {/* Working "Book a Service" Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm active:scale-95 transition-all"
          >
            Book a Service
          </button>
        </div>
      </header>

      {/* Main Tab Screen View */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'home' && <HomeServices />}
        {activeTab === 'history' && <ServiceHistory />}
        {activeTab === 'profile' && <MyProfile />}
        {activeTab === 'help' && <HelpDesk />}
      </main>

      {/* Interactive Booking Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-lg font-bold"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold text-slate-900 mb-1">Book a Home Service</h3>
            <p className="text-xs text-slate-500 mb-4">A verified professional will visit your location.</p>

            {bookingSuccess ? (
              <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl text-center text-sm font-semibold">
                🎉 Service Scheduled Successfully! Opening History...
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold uppercase text-slate-600 block mb-1">
                    Select Service
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option>Electrical Repairs (₹99)</option>
                    <option>Plumbing Works (₹149)</option>
                    <option>AC Service & Repair (₹399)</option>
                    <option>Carpentry & Furniture (₹199)</option>
                    <option>Home Deep Cleaning (₹799)</option>
                    <option>Appliance Repair (₹249)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold uppercase text-slate-600 block mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      required
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase text-slate-600 block mb-1">
                      Time Slot
                    </label>
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option>10:00 AM - 12:00 PM</option>
                      <option>12:00 PM - 02:00 PM</option>
                      <option>02:00 PM - 04:00 PM</option>
                      <option>04:00 PM - 06:00 PM</option>
                      <option>06:00 PM - 08:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase text-slate-600 block mb-1">
                    Service Address
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Enter flat/door no, street, landmark..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border rounded-lg text-sm text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-sm transition"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}