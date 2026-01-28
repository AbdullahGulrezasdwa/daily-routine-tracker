/* ===============================
   Core Daily Routine Tracker JS
=============================== */

// Save checkbox state and update color
function saveData(checkbox) {
  localStorage.setItem(checkbox.id, checkbox.checked);
  updateCellStyle(checkbox);
}

// Update cell color based on checkbox
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

// Hover animation for table cells
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
