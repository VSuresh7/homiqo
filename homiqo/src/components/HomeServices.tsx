import { useState } from 'react';

interface ServiceItem {
  id: number;
  name: string;
  price: string;
  icon: string;
  desc: string;
}

const SERVICES: ServiceItem[] = [
  { id: 1, name: 'Electrical Repairs', price: '₹99', icon: '⚡', desc: 'Switchboards, fans, wiring' },
  { id: 2, name: 'Plumbing Works', price: '₹149', icon: '🚰', desc: 'Pipe leakage, tap fixes, drain' },
  { id: 3, name: 'AC Service & Repair', price: '₹399', icon: '❄️', desc: 'Deep cleaning, gas refill' },
  { id: 4, name: 'Carpentry & Furniture', price: '₹199', icon: '🪚', desc: 'Door locks, furniture repair' },
  { id: 5, name: 'Home Deep Cleaning', price: '₹799', icon: '🧹', desc: 'Kitchen, bathroom & sofa' },
  { id: 6, name: 'Appliance Repair', price: '₹249', icon: '🧺', desc: 'Washing machine, fridge, microwave' },
];

export default function HomeServices() {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredServices = SERVICES.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="text-center py-8">
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Your Home Deserves Better Care.
        </h2>
        <p className="mt-3 text-lg text-gray-600">
          Verified electricians, plumbers, and home experts dispatched safely.
        </p>

        {/* Search Bar */}
        <div className="mt-6 max-w-xl mx-auto flex items-center bg-white rounded-full border border-gray-300 shadow-sm p-1.5 focus-within:ring-2 focus-within:ring-blue-500">
          <input
            type="text"
            placeholder="Search for electric repairs, plumbing, cleaning..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-full focus:outline-none text-gray-700"
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition">
            Search
          </button>
        </div>
      </section>

      {/* Services Grid */}
      <section>
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Our Services</h3>
          <p className="text-gray-500 text-sm">Standardized diagnostic inspection charges starting from ₹99</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="text-4xl mb-3">{service.icon}</div>
                <h4 className="text-lg font-semibold text-gray-800">{service.name}</h4>
                <p className="text-sm text-gray-500 mt-1">{service.desc}</p>
              </div>
              <div className="mt-6 flex items-center justify-between pt-4 border-t">
                <div>
                  <span className="text-xs text-gray-400">Starts at</span>
                  <p className="text-lg font-bold text-gray-900">{service.price}</p>
                </div>
                <button className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg font-medium text-sm transition">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}