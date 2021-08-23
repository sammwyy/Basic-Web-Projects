const calcButtons = document.querySelectorAll("[calcButton]");
const eqContainer = document.getElementById("equationContainer");

var equation = "0";

function renderEquation() {
  eqContainer.innerText = equation;
}

for (let button of calcButtons) {
  button.addEventListener("click", () => {
    const char = button.innerText;
    equation == "0" ? (equation = char) : (equation += char);
    renderEquation();
  });
}

function clearInput() {
  equation = "0";
  renderEquation();
}

function goBack() {
  equation = equation.substring(0, equation.length - 1);
  if (equation == "") equation = "0";
  renderEquation();
}

function eqToExpression() {
  return equation;
}

function calculate() {
  let result = null;

  try {
    result = eval(eqToExpression());
  } catch (e) {
    console.error(e);
  }

  if (result === undefined || result === null) {
    clearInput();
    eqContainer.innerText = "Syntax Error";
  } else {
    equation = result + "";
    renderEquation();
  }
}

renderEquation();
