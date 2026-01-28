/* =======================================
   Daily Routine Tracker JS
   Features:
   - Save checkbox state to localStorage
   - Auto color completed habits
   - Reset all habits
======================================= */

// Save checkbox state when clicked
function saveData(checkbox) {
  localStorage.setItem(checkbox.id, checkbox.checked); // store state
  updateCellStyle(checkbox); // update color
}

// Update the cell color based on checkbox
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

// Reset all habits (optional button)
function resetAll() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(cb => {
    cb.checked = false;
    updateCellStyle(cb);
    localStorage.setItem(cb.id, false);
  });
}

// Call loadData when the page is ready
window.addEventListener('DOMContentLoaded', loadData);
