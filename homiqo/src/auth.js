// --- AUTHENTICATION & SESSION CONTROLLER ---

export function getCurrentUser() {
  const user = localStorage.getItem("homiqo_current_user") || localStorage.getItem("homiqo_user");
  if (!user || user === "undefined" || user === "null") return null;
  try {
    return JSON.parse(user);
  } catch {
    return { name: user, role: "user" };
  }
}

export function isUserLoggedIn() {
  return getCurrentUser() !== null;
}

export function applySession(user) {
  if (!user) return;

  // 1. Update the Header Login/Register Button
  const allButtons = document.querySelectorAll("button, a");
  allButtons.forEach((el) => {
    const txt = el.textContent.trim().toLowerCase();
    if (txt === "login / register" || txt.startsWith("hi,")) {
      el.textContent = `Hi, ${user.name || user.phone || "User"}`;
      el.title = "Click to log out";
      el.style.fontWeight = "600";
      el.style.color = "#2563eb";
    }
  });

  // 2. If logged in as Admin, unlock Admin navigation/tabs if present
  if (user.role === "admin" || user.phone === "917997941247") {
    const adminTab = document.getElementById("adminPortalTab") || document.querySelector("[data-portal='admin']");
    if (adminTab) adminTab.style.display = "inline-flex";
  }

  // 3. Update Profile View if elements exist
  const profileName = document.getElementById("profileUserName");
  const profilePhone = document.getElementById("profileUserPhone");
  if (profileName) profileName.textContent = user.name || "Customer";
  if (profilePhone) profilePhone.textContent = user.phone || "";
}

export function logout() {
  localStorage.removeItem("homiqo_user");
  localStorage.removeItem("homiqo_current_user");
  window.location.reload();
}

export function initAuth() {
  const authModal = document.getElementById("authModal") || document.getElementById("loginModal");
  const authForm = document.getElementById("authForm") || document.getElementById("loginForm");
  const closeModalBtn = document.getElementById("closeAuthModal") || document.querySelector(".close-auth-btn");

  // Wire up Login Button Click
  document.querySelectorAll("button, a").forEach((btn) => {
    if (btn.textContent.trim().toLowerCase() === "login / register") {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const active = getCurrentUser();
        if (active) {
          if (confirm(`Currently signed in as ${active.name || active.phone}.\n\nDo you want to log out?`)) {
            logout();
          }
        } else if (authModal) {
          authModal.classList.add("open");
          authModal.style.display = "flex";
        }
      });
    }
  });

  // Close Modal Button
  if (closeModalBtn && authModal) {
    closeModalBtn.addEventListener("click", () => {
      authModal.classList.remove("open");
      authModal.style.display = "none";
    });
  }

  // Wire up Submit Handler for Login/Register Form
  if (authForm) {
    authForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const phoneInput = authForm.querySelector("input[type='tel']") || document.getElementById("loginPhone") || document.getElementById("authPhone");
      const nameInput = authForm.querySelector("input[type='text']") || document.getElementById("loginName") || document.getElementById("authName");

      const phone = phoneInput ? phoneInput.value.trim() : "9876543210";
      const name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : "Customer";
      const role = phone.includes("7997941247") ? "admin" : "user";

      const userData = { name, phone, role };

      localStorage.setItem("homiqo_user", JSON.stringify(userData));
      localStorage.setItem("homiqo_current_user", JSON.stringify(userData));

      if (authModal) {
        authModal.classList.remove("open");
        authModal.style.display = "none";
      }

      applySession(userData);
      alert(`Welcome back, ${name}!`);
    });
  }

  // Check existing session immediately on startup
  const activeUser = getCurrentUser();
  if (activeUser) {
    applySession(activeUser);
  }
}