/* ===============================
   Clean & Fully Working Daily Tracker JS
=============================== */

// ===============================
// Core Tracker Functions
// ===============================
function saveData(checkbox) {
  localStorage.setItem(checkbox.id, checkbox.checked);
  updateCellStyle(checkbox);
  updateProgress();
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
    if (saved === 'true') cb.checked = true;
    updateCellStyle(cb);
  });
  updateProgress();
}

function resetAll() {
  if (!confirm("Are you sure you want to reset the week?")) return;
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(cb => {
    cb.checked = false;
    localStorage.setItem(cb.id, false);
    updateCellStyle(cb);
  });
  updateProgress();
}

function addHoverEffect() {
  const cells = document.querySelectorAll('td');
  cells.forEach(td => {
    td.addEventListener('mouseenter', () => td.style.transform = 'scale(1.02)');
    td.addEventListener('mouseleave', () => td.style.transform = 'scale(1)');
  });
}

// ===============================
// Habit Management
// ===============================
function addHabit(name) {
  const table = document.querySelector('#routineTable tbody');
  if (document.querySelector(`tr[data-habit="${name}"]`)) {
    alert(`Habit "${name}" already exists.`);
    return;
  }

  const row = table.insertRow(-1);
  row.setAttribute('data-habit', name);

  // Habit name cell
  let nameCell = row.insertCell(0);
  nameCell.textContent = name;

  // 7 checkboxes for the week
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  days.forEach(day => {
    let cell = row.insertCell(-1);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `${name.replace(/\s+/g,'')}_${day}`;
    checkbox.onchange = () => saveData(checkbox);

    // Load saved value
    const saved = localStorage.getItem(checkbox.id);
    if (saved === 'true') checkbox.checked = true;

    cell.appendChild(checkbox);
  });

  // Progress bar cell
  let progressCell = row.insertCell(-1);
  const progress = document.createElement('div');
  progress.classList.add('habit-progress');
  progress.style.width = '0%';
  progress.style.height = '12px';
  progress.style.backgroundColor = '#4CAF50';
  progress.style.borderRadius = '5px';
  progressCell.appendChild(progress);

  // Remove button cell
  let removeCell = row.insertCell(-1);
  const removeBtn = document.createElement('button');
  removeBtn.textContent = '−';
  removeBtn.onclick = () => removeHabit(name);
  removeCell.appendChild(removeBtn);

  updateProgress();
}

function removeHabit(name) {
  const row = document.querySelector(`tr[data-habit="${name}"]`);
  if (!row) return;

  // Remove checkboxes from localStorage
  const checkboxes = row.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(cb => localStorage.removeItem(cb.id));

  row.remove();
  updateProgress();
}

// ===============================
// Progress Bars
// ===============================
function updateProgress() {
  const habits = document.querySelectorAll('tr[data-habit]');
  habits.forEach(row => {
    const checkboxes = row.querySelectorAll('input[type="checkbox"]');
    const total = checkboxes.length;
    const done = Array.from(checkboxes).filter(cb => cb.checked).length;
    const percent = total ? Math.round((done / total) * 100) : 0;

    const progressBar = row.querySelector('.habit-progress');
    if (progressBar) progressBar.style.width = percent + '%';
  });
}

// ===============================
// Initialize
// ===============================
window.addEventListener('DOMContentLoaded', () => {
  loadData();
  addHoverEffect();

  // Smooth Add Habit
  const addBtn = document.getElementById('addHabitBtn');
  const habitInput = document.getElementById('newHabitInput');

  addBtn.addEventListener('click', () => {
    const habit = habitInput.value.trim();
    if (!habit) {
      alert("Please enter a habit name!");
      return;
    }
    addHabit(habit);
    habitInput.value = '';
  });

  habitInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addBtn.click();
  });
});
