document.addEventListener("DOMContentLoaded", () => {
  const cards = Array.from(document.querySelectorAll(".qa-card"));
  const search = document.getElementById("searchInput");
  const cats = document.querySelectorAll(".sidebar li");

  // Toggle main answer block
  cards.forEach(card => {
    const header = card.querySelector(".q-header");
    const answer = card.querySelector(".answer");
    const icon = header.querySelector(".toggle-icon");

    header.addEventListener("click", () => {
      const open = answer.classList.toggle("open");
      icon.style.transform = open ? "rotate(90deg)" : "rotate(0deg)";
    });

    // Toggle each sub-question
    card.querySelectorAll(".sub-header").forEach(subBtn => {
      const subAns = subBtn.nextElementSibling;
      const subIcon = subBtn.querySelector(".toggle-icon");

      subBtn.addEventListener("click", () => {
        const openSub = subAns.classList.toggle("open");
        subIcon.style.transform = openSub ? "rotate(90deg)" : "rotate(0deg)";
      });
    });
  });

  // Search filter
  search.addEventListener("input", () => {
    const term = search.value.toLowerCase();
    cards.forEach(card => {
      const text = card
        .querySelector(".q-header span")
        .textContent.toLowerCase();
      card.style.display = text.includes(term) ? "" : "none";
    });
  });

  // Category filter
  cats.forEach(li => {
    li.addEventListener("click", () => {
      cats.forEach(x => x.classList.remove("active"));
      li.classList.add("active");
      const cat = li.dataset.cat;
      cards.forEach(card => {
        card.style.display =
          cat === "all" || card.dataset.cat === cat ? "" : "none";
      });
    });
  });
});