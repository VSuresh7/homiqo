// --- ADMIN & SERVICE PROVIDER PORTALS ---

import { getBookings, updateBookingPaymentStatus } from "./storage.js";

export function markBookingAsPaid(bookingId) {
  updateBookingPaymentStatus(bookingId, "Paid");
  alert(`Payment verified for ${bookingId}! Provider notified.`);
  renderPortals();
}

// Make accessible to inline onclick handlers
window.markBookingAsPaid = markBookingAsPaid;

export function renderPortals() {
  const bookings = getBookings();
  const adminTableBody = document.getElementById("adminBookingsTableBody");
  const adminTotal = document.getElementById("adminTotalBookings");
  const adminPending = document.getElementById("adminPendingBookings");
  const providerTableBody = document.getElementById("providerBookingsTableBody");

  // Admin View
  if (adminTableBody) {
    adminTableBody.innerHTML = bookings.map(b => `
      <tr>
        <td>${b.id}</td>
        <td>${b.service}</td>
        <td>₹${b.fee}</td>
        <td>${b.phone}</td>
        <td>
          <span style="color: ${b.paymentStatus === 'Paid' ? '#10b981' : '#f59e0b'}; font-weight: bold;">
            ${b.paymentStatus}
          </span>
        </td>
        <td>
          ${b.paymentStatus !== 'Paid' 
            ? `<button type="button" onclick="window.markBookingAsPaid('${b.id}')" style="background:#10b981;color:#fff;padding:4px 8px;border-radius:4px;cursor:pointer;border:none;">Mark as Paid</button>`
            : `<span style="color:#10b981; font-weight: 600;">✓ Completed & Paid</span>`
          }
        </td>
      </tr>
    `).join("");
  }

  if (adminTotal) adminTotal.textContent = bookings.length;
  if (adminPending) {
    adminPending.textContent = bookings.filter(b => b.paymentStatus !== "Paid").length;
  }

  // Provider View
  if (providerTableBody) {
    providerTableBody.innerHTML = bookings.map(b => `
      <tr>
        <td>${b.id}</td>
        <td>${b.service}</td>
        <td>${b.address}</td>
        <td>
          <span style="padding: 3px 8px; border-radius: 4px; font-weight: 600; background: ${b.paymentStatus === 'Paid' ? '#d1fae5' : '#e0f2fe'}; color: ${b.paymentStatus === 'Paid' ? '#065f46' : '#0369a1'};">
            ${b.paymentStatus === 'Paid' ? 'PAID - Completed' : 'Pay After Service (Collect ₹' + b.fee + ')'}
          </span>
        </td>
      </tr>
    `).join("");
  }
}