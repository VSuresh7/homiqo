// --- BOOKING ENGINE (MODAL, 2-STEP OTP & PAY AFTER SERVICE) ---

import { isUserLoggedIn, getCurrentUser } from "./auth.js";
import { addBooking } from "./storage.js";
import { renderPortals } from "./portals.js";

export function initBookingModal() {
  const bookingModal = document.getElementById("bookingModal");
  const closeModalBtn = document.getElementById("closeModal") || bookingModal?.querySelector(".modal-close");
  const serviceNameInput = document.getElementById("serviceName");
  const serviceFeeInput = document.getElementById("serviceFee");
  const userNameInput = document.getElementById("userName");
  const userPhoneInput = document.getElementById("userPhone");
  const serviceAddressInput = document.getElementById("serviceAddress");
  
  // Steps & Forms
  const bookingStep1 = document.getElementById("bookingStep1");
  const bookingStep2 = document.getElementById("bookingStep2");
  const bookingForm = document.getElementById("bookingForm");
  const backToStep1Btn = document.getElementById("backToStep1");
  const userEnteredOtp = document.getElementById("userEnteredOtp");

  // Helper to open modal and pre-fill details
  function openBookingModal(serviceName = "General Service", fee = "99") {
    const user = getCurrentUser();

    if (serviceNameInput) serviceNameInput.value = serviceName;
    if (serviceFeeInput) serviceFeeInput.value = `₹${fee} Standard Diagnostic/Visiting Charge`;

    if (user) {
      if (userNameInput && !userNameInput.value) userNameInput.value = user.name || "";
      if (userPhoneInput && !userPhoneInput.value) userPhoneInput.value = user.phone || "";
    }

    // Reset to Step 1
    if (bookingStep1) bookingStep1.style.display = "block";
    if (bookingStep2) bookingStep2.style.display = "none";
    if (userEnteredOtp) userEnteredOtp.value = "";

    if (bookingModal) {
      bookingModal.classList.add("open");
      bookingModal.style.display = "flex";
    }
  }

  // Hook all "Book Now" cards and header buttons
  document.querySelectorAll(".book-trigger, button").forEach((btn) => {
    if (btn.textContent.trim().toLowerCase() === "book now" || btn.classList.contains("book-trigger")) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const card = btn.closest(".service-card");
        const title = card ? card.querySelector("h3")?.textContent : "Home Service";
        const fee = btn.getAttribute("data-fee") || "99";
        openBookingModal(title || "Home Service", fee);
      });
    }
  });

  const headerBookBtn = document.getElementById("headerBookBtn");
  if (headerBookBtn) {
    headerBookBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openBookingModal("General Home Maintenance", "99");
    });
  }

  // Modal Close Action
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      if (bookingModal) {
        bookingModal.classList.remove("open");
        bookingModal.style.display = "none";
      }
    });
  }

  // Step 1 -> Step 2: "Verify Phone & Continue"
  const verifyBtn = document.querySelector("#bookingStep1 button[type='button'], #bookingStep1 .btn-primary") 
    || Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("Verify Phone & Continue"));

  if (verifyBtn) {
    verifyBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const phone = userPhoneInput ? userPhoneInput.value.trim() : "";
      const address = serviceAddressInput ? serviceAddressInput.value.trim() : "";

      if (!phone || phone.length < 10) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
      }
      if (!address) {
        alert("Please specify the service address.");
        return;
      }

      // Transition to OTP verification step
      if (bookingStep1) bookingStep1.style.display = "none";
      if (bookingStep2) {
        bookingStep2.style.display = "block";
        const otpInfo = document.getElementById("otpSentMessage");
        if (otpInfo) otpInfo.textContent = `OTP code sent to +91 ${phone}`;
      }
    });
  }

  // Step 2 -> Back to Step 1
  if (backToStep1Btn) {
    backToStep1Btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (bookingStep2) bookingStep2.style.display = "none";
      if (bookingStep1) bookingStep1.style.display = "block";
    });
  }

  // Final Submission on Step 2 ("Verify & Confirm Booking")
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const otp = userEnteredOtp ? userEnteredOtp.value.trim() : "";
      if (otp.length < 4) {
        alert("Please enter a valid 4-digit OTP (e.g., 1234).");
        return;
      }

      const orderId = "HQ-" + Math.floor(100000 + Math.random() * 900000);
      const name = userNameInput ? userNameInput.value.trim() : "Customer";
      const phone = userPhoneInput ? userPhoneInput.value.trim() : "";
      const address = serviceAddressInput ? serviceAddressInput.value.trim() : "";
      const service = serviceNameInput ? serviceNameInput.value.trim() : "General Home Service";
      const fee = serviceFeeInput ? serviceFeeInput.value.replace(/[^0-9]/g, "") || "99" : "99";

      const newBooking = {
        id: orderId,
        service,
        fee,
        name,
        phone,
        address,
        paymentStatus: "Pay After Service",
        status: "Confirmed & Dispatched",
        createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      addBooking(newBooking);

      if (bookingModal) {
        bookingModal.classList.remove("open");
        bookingModal.style.display = "none";
      }

      renderPortals();

      alert(`🎉 Booking Successful!\n\nBooking ID: ${orderId}\nService: ${service}\nPayment Method: Pay After Service (₹${fee})\n\nOur technician will contact you shortly.`);
    });
  }
}