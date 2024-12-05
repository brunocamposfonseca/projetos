let display = document.querySelector("#display");

let clearBtn = document.querySelector("#clear");
let parenthesesBtn = document.querySelector("#parentheses");
let signBtn = document.querySelector("#sign");
let equalsBtn = document.querySelector("#equals");

let percentageBtn = document.querySelector("#percentage");
let divisionBtn = document.querySelector("#division");
let multiplicationBtn = document.querySelector("#multiplication");
let subtractionBtn = document.querySelector("#subtraction");
let additionBtn = document.querySelector("#addition");

let pointBtn = document.querySelector("#point");
let zeroBtn = document.querySelector("#zero");
let oneBtn = document.querySelector("#one");
let twoBtn = document.querySelector("#two");
let threeBtn = document.querySelector("#three");
let fourBtn = document.querySelector("#four");
let fiveBtn = document.querySelector("#five");
let sixBtn = document.querySelector("#six");
let sevenBtn = document.querySelector("#seven");
let eightBtn = document.querySelector("#eight");
let nineBtn = document.querySelector("#nine");

let displayContent = "0";
let equation = "";
let openParenthesesCount = 0;

function verificarOverflow() {
  if (display.scrollWidth > display.clientWidth) {
    display.classList.add('overflow');
  } else {
    display.classList.remove('overflow');
  }
}

window.addEventListener('resize', verificarOverflow);

function clear() {
    displayContent = "0";
    equation = "";
    openParenthesesCount = 0;
    display.textContent = displayContent;
}

function number(num) {
    if (displayContent === "0" || /[+\-*/%]$/.test(displayContent)) {
        displayContent = `${num}`;
    } else {
        displayContent += `${num}`;
    }
    equation += num;
    display.textContent = displayContent;
}

function operation(op) {
    if (equation === "" || /[+\-*/]$/.test(equation)) return;
    equation += op;
    switch (op) {
        case '*':
            displayContent += ` × `;
            break;
        case '/':
            displayContent += ` ÷ `;
            break;
        default:
            displayContent += ` ${op} `;
            break;
    }
    display.textContent = displayContent;
}

function calculate() {
    try {
        console.log(equation)
        if (openParenthesesCount > 0) {
            equation += ")".repeat(openParenthesesCount);
        }
        let result = Function(`'use strict'; return (${equation})`)();
        result = Number.isFinite(result) ? result : "Erro";
        displayContent = `${result}`;
        equation = `${result}`;
        openParenthesesCount = 0;
        display.textContent = displayContent;
    } catch (e) {
        displayContent = "Erro";
        equation = "";
        openParenthesesCount = 0;
        display.textContent = displayContent;
    }
}

function toggleSign() {
    if (/[+\-*/%()]$/.test(equation) || equation === "") return;
    let lastNumberMatch = equation.match(/(-?\d+\.?\d*)$/);
    if (lastNumberMatch) {
        let lastNumber = lastNumberMatch[0];
        let toggledNumber = lastNumber.startsWith("-") ? lastNumber.slice(1) : `-${lastNumber}`;
        equation = equation.replace(new RegExp(`${lastNumber}$`), toggledNumber);
        displayContent = displayContent.replace(new RegExp(`${lastNumber}$`), toggledNumber);
        display.textContent = displayContent;
    }
}

function percentage() {
    if (!equation || isNaN(Number(displayContent))) return;
    let result = parseFloat(displayContent) / 100;
    displayContent = `${result}`;
    equation = displayContent;
    display.textContent = displayContent;
}

function addParentheses() {
    if (/[+\-*/%]$/.test(equation) || equation === "" || displayContent === "0") {
        equation += "(";
        displayContent = "(";
        openParenthesesCount++;
    } else if (openParenthesesCount > 0) {
        equation += ")";
        displayContent += ")";
        openParenthesesCount--;
    } else {
        equation += "(";
        displayContent += "(";
        openParenthesesCount++;
    }
    display.textContent = displayContent;
}

display.textContent = displayContent;

clearBtn.addEventListener("click", clear);
signBtn.addEventListener("click", toggleSign);
percentageBtn.addEventListener("click", percentage);
parenthesesBtn.addEventListener("click", addParentheses);

pointBtn.addEventListener("click", () => number("."));
oneBtn.addEventListener("click", () => number(1));
twoBtn.addEventListener("click", () => number(2));
threeBtn.addEventListener("click", () => number(3));
fourBtn.addEventListener("click", () => number(4));
fiveBtn.addEventListener("click", () => number(5));
sixBtn.addEventListener("click", () => number(6));
sevenBtn.addEventListener("click", () => number(7));
eightBtn.addEventListener("click", () => number(8));
nineBtn.addEventListener("click", () => number(9));
zeroBtn.addEventListener("click", () => number(0));

divisionBtn.addEventListener("click", () => operation("/"));
multiplicationBtn.addEventListener("click", () => operation("*"));
subtractionBtn.addEventListener("click", () => operation("-"));
additionBtn.addEventListener("click", () => operation("+"));

equalsBtn.addEventListener("click", calculate);