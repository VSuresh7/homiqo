import { useState } from 'react';

interface UserProfile {
  name: string;
  phone: string;
  email: string;
}

interface AddressItem {
  id: number;
  tag: string;
  address: string;
}

export default function MyProfile() {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    email: 'rahul.sharma@example.com',
  });

  const [addresses, setAddresses] = useState<AddressItem[]>([
    { id: 1, tag: 'Home', address: 'Flat 402, Sunshine Heights, Koramangala, Bengaluru, Karnataka 560034' },
    { id: 2, tag: 'Office', address: 'Tech Park Block B, Indiranagar, Bengaluru, Karnataka 560038' },
  ]);

  const handleDeleteAddress = (id: number) => {
    setAddresses((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Personal Info */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm">
        <div className="flex items-center space-x-4 border-b pb-6">
          <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
            {profile.name[0]}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
            <p className="text-sm text-gray-500">HOMIQO Gold Member</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div>
            <label className="text-xs text-gray-500 font-semibold uppercase">Full Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 font-semibold uppercase">Phone Number</label>
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs text-gray-500 font-semibold uppercase">Email Address</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="bg-blue-600 text-white text-sm px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
            Save Changes
          </button>
        </div>
      </div>

      {/* Saved Addresses */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">Saved Addresses</h3>
          <button className="text-sm text-blue-600 font-semibold hover:underline">
            + Add New
          </button>
        </div>

        <div className="space-y-3">
          {addresses.map((item) => (
            <div key={item.id} className="border rounded-xl p-4 flex justify-between items-start">
              <div>
                <span className="text-xs font-bold uppercase bg-blue-50 text-blue-600 px-2 py-0.5 rounded">
                  {item.tag}
                </span>
                <p className="text-sm text-gray-700 mt-2">{item.address}</p>
              </div>
              <button
                onClick={() => handleDeleteAddress(item.id)}
                className="text-xs text-red-500 hover:text-red-700 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}