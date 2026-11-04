import { useState } from 'react';

type BookingStatus = 'In Progress' | 'Completed' | 'Cancelled';
type FilterType = 'all' | 'active' | 'completed';

interface Booking {
  id: string;
  service: string;
  date: string;
  status: BookingStatus;
  technician: string;
  contact: string;
  amount: string;
  type: 'active' | 'completed';
}

const BOOKINGS: Booking[] = [
  {
    id: 'HMQ-8321',
    service: 'AC Master Servicing',
    date: 'Today, 2:30 PM',
    status: 'In Progress',
    technician: 'Ramesh Sharma',
    contact: '+91 98765 43210',
    amount: '₹499',
    type: 'active',
  },
  {
    id: 'HMQ-7910',
    service: 'Kitchen Pipe Leak Repair',
    date: '28 Oct 2026',
    status: 'Completed',
    technician: 'Vikram Singh',
    contact: '+91 98765 12345',
    amount: '₹180',
    type: 'completed',
  },
  {
    id: 'HMQ-6542',
    service: 'Ceiling Fan Installation',
    date: '14 Oct 2026',
    status: 'Cancelled',
    technician: 'Assigned on arrival',
    contact: '-',
    amount: '₹0 (Refunded)',
    type: 'completed',
  },
];

const FILTER_TABS: FilterType[] = ['all', 'active', 'completed'];

export default function ServiceHistory() {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredBookings = BOOKINGS.filter((booking) => {
    if (filter === 'active') return booking.type === 'active';
    if (filter === 'completed') return booking.type === 'completed';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Bookings</h2>
          <p className="text-gray-500 text-sm">View details, track technicians, and download invoices.</p>
        </div>

        {/* Filter Pills */}
        <div className="inline-flex rounded-lg bg-gray-200 p-1">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md capitalize transition ${
                filter === tab ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Booking List */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <div key={booking.id} className="bg-white border rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
              <div>
                <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                  {booking.id}
                </span>
                <h3 className="text-lg font-semibold text-gray-800 mt-1">{booking.service}</h3>
              </div>
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                  booking.status === 'In Progress'
                    ? 'bg-amber-100 text-amber-700'
                    : booking.status === 'Completed'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-600'
                }`}
              >
                {booking.status}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-600">
              <div>
                <span className="text-xs text-gray-400 block">Scheduled Date</span>
                <span className="font-medium text-gray-800">{booking.date}</span>
              </div>
              <div>
                <span className="text-xs text-gray-400 block">Technician</span>
                <span className="font-medium text-gray-800">{booking.technician}</span>
              </div>
              <div>
                <span className="text-xs text-gray-400 block">Phone</span>
                <span className="font-medium text-gray-800">{booking.contact}</span>
              </div>
              <div>
                <span className="text-xs text-gray-400 block">Total Billed</span>
                <span className="font-bold text-gray-900">{booking.amount}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              {booking.status === 'In Progress' ? (
                <>
                  <button className="px-3 py-1.5 border rounded-lg text-sm text-red-600 hover:bg-red-50">
                    Cancel Service
                  </button>
                  <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                    Track Live Location
                  </button>
                </>
              ) : (
                <>
                  <button className="px-3 py-1.5 border rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                    Download Invoice
                  </button>
                  <button className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-600 hover:text-white">
                    Book Again
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}