// --- STORAGE & BOOKINGS ENGINE ---

export function getBookings() {
  return JSON.parse(localStorage.getItem("homiqo_bookings") || "[]");
}

export function saveBookings(bookings) {
  localStorage.setItem("homiqo_bookings", JSON.stringify(bookings));
}

export function addBooking(bookingData) {
  const bookings = getBookings();
  bookings.unshift(bookingData);
  saveBookings(bookings);
  return bookings;
}

export function updateBookingPaymentStatus(bookingId, status = "Paid") {
  const bookings = getBookings();
  const booking = bookings.find(b => b.id === bookingId);
  if (booking) {
    booking.paymentStatus = status;
    saveBookings(bookings);
  }
  return bookings;
}