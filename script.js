/* ===============================
   Daily Routine Tracker JS
   Features:
   - Save all habits in localStorage
   - Color-code completed tasks
   - Reset week functionality
   - Modular and ready for upgrades
=============================== */

// Save checkbox state and update styling
function saveData(checkbox) {
  localStorage.setItem(checkbox.id, checkbox.checked);
  updateCellStyle(checkbox);
}

// Apply color coding to checked cells
function updateCellStyle(checkbox) {
  if (checkbox.checked) {
    checkbox.parentElement.classList.add('done');
  } else {
    checkbox.parentElement.classList.remove('done');
  }
}

// Load saved data on page load
function loadData() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(cb => {
    const saved = localStorage.getItem(cb.id);
    if (saved === 'true') {
      cb.checked = true;
    }
    updateCellStyle(cb);
  });
}

// Reset all checkboxes (new week)
function resetAll() {
  if (!confirm("Are you sure you want to reset the week?")) return;
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(cb => {
    cb.checked = false;
    updateCellStyle(cb);
    localStorage.setItem(cb.id, false);
  });
}

// Add hover animation for fun (optional)
function addHoverEffect() {
  const cells = document.querySelectorAll('td');
  cells.forEach(td => {
    td.addEventListener('mouseenter', () => td.style.transform = 'scale(1.02)');
    td.addEventListener('mouseleave', () => td.style.transform = 'scale(1)');
  });
}

// Initialize tracker
window.addEventListener('DOMContentLoaded', () => {
  loadData();
  addHoverEffect();
});
