import React, { useState } from 'react';

// Optional: If you have separate components for these views, import them.
// Otherwise, the inline sections below will handle them cleanly.

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'history' | 'profile' | 'help'>('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
          <span className="text-2xl font-black text-blue-600 tracking-tight">HOMIQO</span>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-xl">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'home' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Home & Services
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'history' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Service History
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'profile' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            My Profile
          </button>
          <button
            onClick={() => setActiveTab('help')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'help' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Help Desk
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900">
            Login / Register
          </button>
          <button
            onClick={() => setIsBookingOpen(true)}
            className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition-colors"
          >
            Book a Service
          </button>
        </div>
      </header>

      {/* Main Body: Switches dynamically with activeTab */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        {activeTab === 'home' && (
          <div>
            {/* Hero Section */}
            <div className="text-center py-12">
              <h1 className="text-4xl font-extrabold text-slate-900 mb-3">
                Your Home Deserves Better Care.
              </h1>
              <p className="text-slate-500 mb-8">
                Verified electricians, plumbers, and home experts dispatched safely.
              </p>
              <div className="max-w-xl mx-auto flex items-center bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden p-1.5">
                <input
                  type="text"
                  placeholder="Search for electric repairs, plumbing, cleaning..."
                  className="flex-1 px-4 py-2 text-sm outline-none"
                />
                <button className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700">
                  Search
                </button>
              </div>
            </div>

            {/* Our Services Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">Our Services</h2>
              <p className="text-center text-slate-500 text-sm mb-8">Standardized diagnostic inspection charges starting from ₹99</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {['Electrical', 'Plumbing', 'Cleaning', 'Appliances'].map((service) => (
                  <div
                    key={service}
                    onClick={() => setIsBookingOpen(true)}
                    className="p-6 bg-white border border-slate-200 rounded-2xl hover:shadow-md cursor-pointer transition-all text-center"
                  >
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                      {service[0]}
                    </div>
                    <div className="font-semibold text-slate-800">{service}</div>
                    <div className="text-xs text-slate-400 mt-1">Book diagnostic visit</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Service History</h2>
            <div className="border border-dashed border-slate-200 rounded-xl p-10 text-center text-slate-400">
              No recent bookings found. Click "Book a Service" to schedule your first visit.
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">User Profile</h2>
            <div className="space-y-4 text-sm">
              <div>
                <label className="text-slate-500 block mb-1">Full Name</label>
                <div className="font-medium text-slate-800">Vadtya Suresh</div>
              </div>
              <div>
                <label className="text-slate-500 block mb-1">Email</label>
                <div className="font-medium text-slate-800">vadtyasuresh197@gmail.com</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'help' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Help & Support Desk</h2>
            <p className="text-slate-500 text-sm mb-6">Need assistance with your booking or inspection report? Reach out to support.</p>
            <div className="space-y-3">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                <span className="font-medium text-sm">Email Support</span>
                <span className="text-blue-600 text-sm">support@homiqo.in</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                <span className="font-medium text-sm">Customer Helpline</span>
                <span className="text-blue-600 text-sm">+91 98765 43210</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Book a Service Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl relative animate-in fade-in zoom-in duration-150">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-slate-900">Book a Service</h3>
              <button
                onClick={() => setIsBookingOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-semibold leading-none"
              >
                ✕
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); alert('Booking submitted successfully!'); setIsBookingOpen(false); }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Select Category</label>
                  <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:border-blue-600">
                    <option>Electrical Repair</option>
                    <option>Plumbing</option>
                    <option>Deep Cleaning</option>
                    <option>Appliance Servicing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Issue Description</label>
                  <textarea
                    rows={3}
                    placeholder="Describe what needs repair or servicing..."
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Contact Number</label>
                  <input
                    type="tel"
                    placeholder="+91"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-600"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsBookingOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}