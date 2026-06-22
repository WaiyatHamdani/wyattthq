let currentCalories = 0;
let currentMacroType = "balanced";

const macroPlans = {
  balanced: {
    protein: 0.30,
    carbs: 0.40,
    fat: 0.30
  },
  lowFat: {
    protein: 0.30,
    carbs: 0.50,
    fat: 0.20
  },
  lowCarb: {
    protein: 0.35,
    carbs: 0.25,
    fat: 0.40
  },
  highProtein: {
    protein: 0.40,
    carbs: 0.30,
    fat: 0.30
  }
};

function calculateCalories() {
  const age = Number(document.getElementById("age").value);
  const gender = document.getElementById("gender").value;
  const feet = Number(document.getElementById("feet").value);
  const inches = Number(document.getElementById("inches").value);
  const weightPounds = Number(document.getElementById("weight").value);
  const activity = Number(document.getElementById("activity").value);
  const goal = document.getElementById("goal").value;

  const totalInches = feet * 12 + inches;
  const heightCm = totalInches * 2.54;
  const weightKg = weightPounds / 2.20462;

  let bmr;

  if (gender === "male") {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }

  let maintenanceCalories = bmr * activity;

  if (goal === "cut") {
    currentCalories = maintenanceCalories - 500;
  } else if (goal === "bulk") {
    currentCalories = maintenanceCalories + 300;
  } else {
    currentCalories = maintenanceCalories;
  }

  currentCalories = Math.round(currentCalories);

  document.getElementById("caloriesResult").textContent =
    currentCalories.toLocaleString() + " calories/day";

  updateMacros();
}

function changeMacro(type, button) {
  currentMacroType = type;

  const allTabs = document.querySelectorAll(".macro-tab");

  allTabs.forEach(function(tab) {
    tab.classList.remove("active");
  });

  button.classList.add("active");

  updateMacros();
}

function updateMacros() {
  if (currentCalories === 0) {
    return;
  }

  const plan = macroPlans[currentMacroType];

  const proteinCalories = currentCalories * plan.protein;
  const carbCalories = currentCalories * plan.carbs;
  const fatCalories = currentCalories * plan.fat;

  const proteinGrams = Math.round(proteinCalories / 4);
  const carbGrams = Math.round(carbCalories / 4);
  const fatGrams = Math.round(fatCalories / 9);

  document.getElementById("proteinResult").textContent = proteinGrams;
  document.getElementById("carbsResult").textContent = carbGrams;
  document.getElementById("fatResult").textContent = fatGrams;
}

calculateCalories();