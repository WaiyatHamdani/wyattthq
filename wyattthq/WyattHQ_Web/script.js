const menuButton = document.getElementById('menuButton');
const mainNav = document.getElementById('mainNav');

if (menuButton && mainNav) {
  menuButton.addEventListener('click', function () {
    const isOpen = mainNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mainNav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const calorieForm = document.getElementById('calorieForm');

if (calorieForm) {
  const calorieResult = document.getElementById('calorieResult');
  const maintenanceResult = document.getElementById('maintenanceResult');
  const proteinResult = document.getElementById('proteinResult');
  const goalName = document.getElementById('goalName');
  const goalDescription = document.getElementById('goalDescription');
  const weeklyFocus = document.getElementById('weeklyFocus');

  function roundToNearestTen(number) {
    return Math.round(number / 10) * 10;
  }

  function calculateCalories(event) {
    if (event) event.preventDefault();

    const age = Number(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const heightFeet = Number(document.getElementById('heightFeet').value);
    const heightInches = Number(document.getElementById('heightInches').value);
    const weightPounds = Number(document.getElementById('weight').value);
    const activity = Number(document.getElementById('activity').value);
    const selectedGoal = document.querySelector('input[name="goal"]:checked');
    const goal = selectedGoal ? selectedGoal.value : 'maintain';

    const validValues = age >= 15 && heightFeet > 0 && heightInches >= 0 && heightInches <= 11 && weightPounds > 0 && activity > 0;

    if (!validValues) {
      goalDescription.textContent = 'Please enter valid numbers before calculating your target.';
      return;
    }

    const heightCm = (heightFeet * 12 + heightInches) * 2.54;
    const weightKg = weightPounds * 0.453592;

    // Mifflin–St Jeor BMR equation.
    let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
    bmr += gender === 'male' ? 5 : -161;

    const maintenance = roundToNearestTen(bmr * activity);
    let target = maintenance;
    let targetTitle = 'MAINTENANCE TARGET';
    let description = 'A baseline estimate to help you maintain your current body weight and performance.';
    let focus = 'Keep your routine steady';

    if (goal === 'cut') {
      target = roundToNearestTen(maintenance - 400);
      targetTitle = 'FAT-LOSS TARGET';
      description = 'A moderate deficit to support steady fat loss while protecting your training performance.';
      focus = 'Prioritize protein and recovery';
    }

    if (goal === 'bulk') {
      target = roundToNearestTen(maintenance + 250);
      targetTitle = 'MUSCLE-BUILDING TARGET';
      description = 'A controlled surplus meant to support strength and muscle gain without pushing calories too high.';
      focus = 'Push progressive overload';
    }

    const proteinLow = Math.round(weightPounds * 0.8);
    const proteinHigh = Math.round(weightPounds * 1.0);

    calorieResult.textContent = target.toLocaleString();
    maintenanceResult.textContent = maintenance.toLocaleString() + ' kcal';
    proteinResult.textContent = proteinLow + '–' + proteinHigh + ' g';
    goalName.textContent = targetTitle;
    goalDescription.textContent = description;
    weeklyFocus.textContent = focus;
  }

  calorieForm.addEventListener('submit', calculateCalories);
  calculateCalories();
}
