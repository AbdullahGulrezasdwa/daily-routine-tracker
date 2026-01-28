/* ===============================
   Daily Routine Tracker JS
   - Core tracker
   - Change Habits
   - LocalStorage saving
   - Reset functionality
=============================== */

/* -------------------------------
   Core Tracker Functions
------------------------------- */
function saveData(checkbox) {
  localStorage.setItem(checkbox.id, checkbox.checked);
  updateCellStyle(checkbox);
}

function updateCellStyle(checkbox) {
  if (checkbox.checked) {
    checkbox.parentElement.classList.add('done');
  } else {
    checkbox.parentElement.classList.remove('done');
  }
}

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

function resetAll() {
  if (!confirm("Are you sure you want to reset the week?")) return;
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(cb => {
    cb.checked = false;
    updateCellStyle(cb);
    localStorage.setItem(cb.id, false);
  });
}

function addHoverEffect() {
  const cells = document.querySelectorAll('td');
  cells.forEach(td => {
    td.addEventListener('mouseenter', () => td.style.transform = 'scale(1.02)');
    td.addEventListener('mouseleave', () => td.style.transform = 'scale(1)');
  });
}

/* -------------------------------
   Dynamic Change Habits Functions
------------------------------- */
function openHabitManager() {
  let action = prompt("Type 'add' to add a habit or 'remove' to remove a habit:");
  if (!action) return;

  if (action.toLowerCase() === 'add') {
    let newHabit = prompt("Enter the name of the new habit (e.g., Exercise):");
    if (newHabit) addHabit(newHabit);
  } else if (action.toLowerCase() === 'remove') {
    let habitName = prompt("Enter the exact habit name to remove:");
    if (habitName) removeHabit(habitName);
  } else {
    alert("Invalid action. Type 'add' or 'remove'.");
  }
}

function addHabit(name) {
  const table = document.querySelector('table');
  if (document.querySelector(`tr[data-habit="${name}"]`)) {
    alert(`Habit "${name}" already exists.`);
    return;
  }

  const row = table.insertRow(-1);
  row.setAttribute('data-habit', name);

  // Habit name cell
  let cell = row.insertCell(0);
  cell.textContent = name;

  // 7 checkboxes for the week
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  days.forEach(day => {
    let cell = row.insertCell(-1);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `${name.replace(/\s+/g,'')}${day}`;
    checkbox.onchange = function() { saveData(this); };
    cell.appendChild(checkbox);
  });

  alert(`Habit "${name}" added!`);
}

function removeHabit(name) {
  const row = document.querySelector(`tr[data-habit="${name}"]`);
  if (row) {
    const checkboxes = row.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => localStorage.removeItem(cb.id));
    row.remove();
    alert(`Habit "${name}" removed!`);
  } else {
    alert(`Habit "${name}" not found.`);
  }
}

/* -------------------------------
   Initialize Tracker
------------------------------- */
window.addEventListener('DOMContentLoaded', () => {
  loadData();
  addHoverEffect();
});
