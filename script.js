/* Core Tracker */
function saveData(checkbox) {
  localStorage.setItem(checkbox.id, checkbox.checked);
  updateCellStyle(checkbox);
  updateProgress();
}

function updateCellStyle(checkbox) {
  if (checkbox.checked) checkbox.parentElement.classList.add('done');
  else checkbox.parentElement.classList.remove('done');
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
  if (!confirm("Reset the week?")) return;
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(cb => {
    cb.checked = false;
    localStorage.setItem(cb.id, false);
    updateCellStyle(cb);
  });
  updateProgress();
}

function addHoverEffect() {
  document.querySelectorAll('td').forEach(td => {
    td.addEventListener('mouseenter', () => td.style.transform = 'scale(1.02)');
    td.addEventListener('mouseleave', () => td.style.transform = 'scale(1)');
  });
}

/* Habit Management */
function addHabit(name) {
  const table = document.querySelector('#routineTable tbody');
  if (document.querySelector(`tr[data-habit="${name}"]`)) return;

  const row = table.insertRow(-1);
  row.setAttribute('data-habit', name);

  // Name cell
  let nameCell = row.insertCell(0);
  nameCell.textContent = name;

  // 7 checkboxes
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  days.forEach(day => {
    let cell = row.insertCell(-1);
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.id = `${name.replace(/\s+/g,'')}_${day}`;
    cb.onchange = () => saveData(cb);
    const saved = localStorage.getItem(cb.id);
    if (saved === 'true') cb.checked = true;
    cell.appendChild(cb);
  });

  // Progress bar
  let progCell = row.insertCell(-1);
  const prog = document.createElement('div');
  prog.classList.add('habit-progress');
  progCell.appendChild(prog);

  // Remove button
  let removeCell = row.insertCell(-1);
  const btn = document.createElement('button');
  btn.textContent = '−';
  btn.onclick = () => removeHabit(name);
  removeCell.appendChild(btn);

  updateProgress();
}

function removeHabit(name) {
  const row = document.querySelector(`tr[data-habit="${name}"]`);
  if (!row) return;
  row.querySelectorAll('input[type="checkbox"]').forEach(cb => localStorage.removeItem(cb.id));
  row.remove();
  updateProgress();
}

/* Progress bars */
function updateProgress() {
  document.querySelectorAll('tr[data-habit]').forEach(row => {
    const cbs = row.querySelectorAll('input[type="checkbox"]');
    const done = Array.from(cbs).filter(cb => cb.checked).length;
    const total = cbs.length;
    const percent = total ? Math.round((done / total) * 100) : 0;
    const prog = row.querySelector('.habit-progress');
    if (prog) prog.style.width = percent + '%';
  });
}

/* Initialize */
window.addEventListener('DOMContentLoaded', () => {
  loadData();
  addHoverEffect();

  const addBtn = document.getElementById('addHabitBtn');
  const habitInput = document.getElementById('newHabitInput');

  addBtn.addEventListener('click', () => {
    const habit = habitInput.value.trim();
    if (!habit) return;
    addHabit(habit);
    habitInput.value = '';
  });

  habitInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') addBtn.click();
  });
});
