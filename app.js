// ---------- USER REGISTER ----------
function registerUser() {
let name = document.getElementById("name").value;
let email = document.getElementById("email").value;
let password = document.getElementById("password").value;
    let user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration Successful!");
    window.location.href = "login.html";
}

// ---------- LOGIN ----------
function loginUser() {
let email = document.getElementById("loginEmail").value;
let password = document.getElementById("loginPassword").value;
    let storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && email === storedUser.email && password === storedUser.password) {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid login!");
    }
}

// ---------- LOGOUT ----------
function logout() {
localStorage.removeItem("loggedIn");
window.location.href = "index.html";
}

// ---------- DASHBOARD ----------
function loadDashboard() {
let user = JSON.parse(localStorage.getItem("user"));
if (!user) window.location.href = "index.html";
    document.getElementById("welcome").innerText = "Welcome " + user.name;

    let income = JSON.parse(localStorage.getItem("income")) || [];
    let expense = JSON.parse(localStorage.getItem("expense")) || [];

    let totalIncome = income.reduce((a, b) => a + (b.amount || 0), 0);
    let totalExpense = expense.reduce((a, b) => a + (b.amount || 0), 0);

    document.getElementById("balance").innerText = totalIncome - totalExpense;
}

// ---------- ADD INCOME ----------
function addIncome() {
let title = document.getElementById("incomeTitle").value;
let amount = Number(document.getElementById("incomeAmount").value);
    let income = JSON.parse(localStorage.getItem("income")) || [];
    income.push({ title, amount });

    localStorage.setItem("income", JSON.stringify(income));
    alert("Income Added");
    window.location.href = "dashboard.html";
}

// ---------- ADD EXPENSE ----------
function addExpense() {
let title = document.getElementById("expenseTitle").value;
let amount = Number(document.getElementById("expenseAmount").value);
    let expense = JSON.parse(localStorage.getItem("expense")) || [];
    expense.push({ title, amount });

    localStorage.setItem("expense", JSON.stringify(expense));
    alert("Expense Added");
    window.location.href = "dashboard.html";
}

// ---------- REPORT ----------
function loadReport() {
let income = JSON.parse(localStorage.getItem("income")) || [];
let expense = JSON.parse(localStorage.getItem("expense")) || [];
    let totalIncome = income.reduce((a, b) => a + (b.amount || 0), 0);
    let totalExpense = expense.reduce((a, b) => a + (b.amount || 0), 0);

    document.getElementById("totalIncome").innerText = totalIncome;
    document.getElementById("totalExpense").innerText = totalExpense;
    document.getElementById("finalBalance").innerText = totalIncome - totalExpense;

    let history = document.getElementById("history");
    if (history) {
        history.innerHTML = ""; // clear previous

        income.forEach(i => {
            history.innerHTML += `<li style="color:green">Income: ${i.title} - ₹${i.amount}</li>`;
        });

        expense.forEach(e => {
            history.innerHTML += `<li style="color:red">Expense: ${e.title} - ₹${e.amount}</li>`;
        });
    }
}