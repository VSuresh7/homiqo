import { useState, type FormEvent } from 'react';

export default function HelpDesk() {
  const [formData, setFormData] = useState({ issueType: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.issueType && formData.message) {
      setSubmitted(true);
      setFormData({ issueType: '', message: '' });
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Quick Contact Banners */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
          <span className="text-3xl">📞</span>
          <h4 className="font-bold text-gray-800 mt-2">Call Our Helpline</h4>
          <p className="text-xs text-gray-500 mt-1">Available 8 AM - 10 PM daily</p>
          <a
            href="tel:1800123456"
            className="mt-3 inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            1800-123-456
          </a>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
          <span className="text-3xl">💬</span>
          <h4 className="font-bold text-gray-800 mt-2">WhatsApp Support</h4>
          <p className="text-xs text-gray-500 mt-1">Instant updates & chat help</p>
          <button className="mt-3 inline-block bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition">
            Chat on WhatsApp
          </button>
        </div>
      </div>

      {/* Raise a Ticket Form */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-1">Raise a Support Ticket</h3>
        <p className="text-xs text-gray-500 mb-6">Our resolution team will respond within 2 hours.</p>

        {submitted && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 border border-green-200 rounded-lg text-sm font-medium">
            Ticket submitted successfully! We are looking into it.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-600 uppercase">Issue Category</label>
            <select
              value={formData.issueType}
              onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
              required
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select an issue</option>
              <option value="technician_delayed">Technician is delayed / didn't show</option>
              <option value="billing">Incorrect billing or overcharge</option>
              <option value="quality">Poor service quality / repeat breakdown</option>
              <option value="damage">Damage caused during inspection</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 uppercase">Explain your problem</label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              placeholder="Provide booking ID or specify what went wrong..."
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg text-sm hover:bg-blue-700 transition"
          >
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
}