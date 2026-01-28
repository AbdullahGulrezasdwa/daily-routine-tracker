body {
  font-family: Arial, sans-serif;
  text-align: center;
  margin: 20px;
}

h1 {
  color: #333;
}

.controls {
  margin-bottom: 20px;
}

.controls input[type="text"] {
  padding: 8px 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 5px;
  width: 200px;
}

.controls button {
  padding: 9px 15px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.controls button:hover {
  background-color: #45a049;
}

table {
  margin: 0 auto;
  border-collapse: collapse;
  width: 90%;
}

th, td {
  border: 1px solid #ccc;
  padding: 8px;
}

td.done {
  background-color: #d4edda;
}

.habit-progress {
  width: 0%;
  height: 12px;
  background-color: #4CAF50;
  border-radius: 5px;
  transition: width 0.3s;
}
