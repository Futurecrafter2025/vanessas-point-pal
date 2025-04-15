
const dailyLimit = 24;
const weeklyFlex = 35;
const preloadedFoods = [
  { name: "Mashed Potatoes (1/2 cup)", points: 3 },
  { name: "Roasted Potatoes (1/2 cup)", points: 2 },
  { name: "Hamburger Patty (3 oz)", points: 6 },
  { name: "Ground Beef (lean, 3 oz)", points: 5 },
  { name: "Sugar-Free Klondike Bar", points: 5 },
  { name: "Small Can Coke (7.5 oz)", points: 3 }
];

let log = JSON.parse(localStorage.getItem('pointLog')) || [];
renderLog();

function updatePoints() {
  const dailyUsed = log.reduce((sum, item) => sum + item.points, 0);
  const overage = Math.max(0, dailyUsed - dailyLimit);
  document.getElementById('daily-used').textContent = dailyUsed;
  document.getElementById('weekly-remaining').textContent = Math.max(weeklyFlex - overage, 0);
}

function renderLog() {
  const list = document.getElementById('log-list');
  list.innerHTML = '';
  log.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ${item.points} pts`;
    list.appendChild(li);
  });
  updatePoints();
  localStorage.setItem('pointLog', JSON.stringify(log));
}

function addFood(name, points) {
  log.push({ name, points });
  renderLog();
}

function addCustomFood() {
  const name = document.getElementById('custom-food').value.trim();
  const points = parseFloat(document.getElementById('custom-points').value);
  if (name && !isNaN(points)) {
    addFood(name, points);
    document.getElementById('custom-food').value = '';
    document.getElementById('custom-points').value = '';
  }
}

function resetDay() {
  log = [];
  renderLog();
}

function renderQuickAdd() {
  const container = document.getElementById('quick-add');
  preloadedFoods.forEach(food => {
    const btn = document.createElement('button');
    btn.textContent = `${food.name} (${food.points} pts)`;
    btn.onclick = () => addFood(food.name, food.points);
    container.appendChild(btn);
  });
}

renderQuickAdd();
