import "../style.css";
import { initAuth, getCurrentUser, logout } from "./auth.js";
import { initSearchAndFilter } from "./search.js";
import { initBookingModal } from "./booking.js";
import { renderPortals } from "./portals.js";
import { getBookings } from "./storage.js";

// Tab Switching & View Router
function setupTabs() {
  const views = {
    home: document.getElementById("viewHome"),
    history: document.getElementById("viewHistory"),
    profile: document.getElementById("viewProfile"),
    help: document.getElementById("viewHelp")
  };

  // Find all buttons or links inside the navigation pill bar
  const navContainer = document.querySelector(".portal-nav, nav") || document.body;
  const navButtons = navContainer.querySelectorAll("button, a, .nav-btn, .portal-nav-btn");

  function switchTab(viewKey) {
    // Hide all views
    Object.values(views).forEach(el => {
      if (el) el.style.display = "none";
    });

    // Show the active view
    if (views[viewKey]) {
      views[viewKey].style.display = "block";
    }

    // Populate data when visiting specific tabs
    if (viewKey === "profile") {
      const user = getCurrentUser() || {};
      const name = user.name || "Customer";
      const phone = user.phone || "+91 7997941247";

      const nameEl = document.getElementById("profileNameDisplay");
      const phoneEl = document.getElementById("profilePhoneDisplay");
      const avatarEl = document.getElementById("profileAvatar");

      if (nameEl) nameEl.textContent = name;
      if (phoneEl) phoneEl.textContent = phone;
      if (avatarEl) avatarEl.textContent = name.charAt(0).toUpperCase();
    }

    if (viewKey === "history") {
      renderServiceHistory();
    }
  }

  // Bind each button by matching partial text (ignores emojis)
  navButtons.forEach(btn => {
    const raw = btn.textContent.toLowerCase();

    if (raw.includes("home") || raw.includes("services")) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        highlightActiveButton(btn);
        switchTab("home");
      });
    } else if (raw.includes("history")) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        highlightActiveButton(btn);
        switchTab("history");
      });
    } else if (raw.includes("profile")) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        highlightActiveButton(btn);
        switchTab("profile");
      });
    } else if (raw.includes("help")) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        highlightActiveButton(btn);
        switchTab("help");
      });
    }
  });

  function highlightActiveButton(activeBtn) {
    navButtons.forEach(b => {
      if (b.textContent.includes("Home") || b.textContent.includes("History") || b.textContent.includes("Profile") || b.textContent.includes("Help")) {
        b.style.backgroundColor = "transparent";
        b.style.color = "#475569";
      }
    });
    activeBtn.style.backgroundColor = "#2563eb";
    activeBtn.style.color = "#ffffff";
    activeBtn.style.borderRadius = "9999px";
  }

  // Profile Logout Button
  const tabLogout = document.getElementById("tabLogoutBtn");
  if (tabLogout) {
    tabLogout.addEventListener("click", () => {
      if (confirm("Do you want to log out of Homiqo?")) {
        logout();
      }
    });
  }
}

// Render Bookings inside Service History
function renderServiceHistory() {
  const container = document.getElementById("userHistoryList");
  if (!container) return;

  const bookings = getBookings();
  if (!bookings || bookings.length === 0) {
    container.innerHTML = `
      <div style="background: #ffffff; padding: 30px; text-align: center; border-radius: 12px; border: 1px dashed #cbd5e1;">
        <p style="color: #64748b; font-size: 1.05rem; margin: 0;">No service history found.</p>
        <p style="color: #94a3b8; font-size: 0.9rem; margin-top: 6px;">Schedule your first repair by clicking 'Book a Service'.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = bookings.map(b => `
    <div style="background: #ffffff; padding: 20px; border-radius: 10px; margin-bottom: 14px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-left: 5px solid #2563eb; border: 1px solid #f1f5f9;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h3 style="margin: 0; font-size: 1.15rem; color: #0f172a;">${b.service}</h3>
        <span style="font-weight: 600; padding: 4px 10px; border-radius: 6px; font-size: 0.85rem; background: ${b.paymentStatus === 'Paid' ? '#d1fae5' : '#e0f2fe'}; color: ${b.paymentStatus === 'Paid' ? '#065f46' : '#0369a1'};">
          ${b.paymentStatus}
        </span>
      </div>
      <p style="margin: 8px 0 4px; color: #475569; font-size: 0.95rem;">
        <strong>Booking ID:</strong> ${b.id} &nbsp;|&nbsp; <strong>Charge:</strong> ₹${b.fee}
      </p>
      <p style="margin: 4px 0 0; color: #64748b; font-size: 0.9rem;">
        📍 <strong>Location:</strong> ${b.address}
      </p>
    </div>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  initAuth();
  initSearchAndFilter();
  initBookingModal();
  setupTabs();
  renderPortals();
});