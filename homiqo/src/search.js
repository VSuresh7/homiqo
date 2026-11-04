// --- FILTER & SEARCH ---

export function initSearchAndFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const serviceCards = document.querySelectorAll(".service-card");
  const searchInput = document.getElementById("serviceSearch");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.getAttribute("data-category");
      serviceCards.forEach((c) => {
        c.style.display = (cat === "all" || c.getAttribute("data-category") === cat) ? "flex" : "none";
      });
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      serviceCards.forEach((c) => {
        const title = c.querySelector("h3") ? c.querySelector("h3").textContent.toLowerCase() : "";
        c.style.display = title.includes(query) ? "flex" : "none";
      });
    });
  }
}