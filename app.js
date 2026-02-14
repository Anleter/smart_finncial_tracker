// ---------- USER REGISTER ----------
function registerUser(event) {
    // Stop the form from refreshing the page
    event.preventDefault();

    // 1. Get values from the form using the IDs in your HTML
    const name = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm_password").value.trim();

    // 2. Validation: Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // 3. Create a user object
    const user = {
        name: name,
        email: email,
        password: password
    };
    

    // 4. Save to LocalStorage (converts object to string)
    localStorage.setItem('user', JSON.stringify(user));

    alert("Registration Successful!");
    
    // 5. Redirect to login page
    window.location.href = "login.html"; 
}

// ---------- LOGIN ----------
function loginUser(event) {
   

    // 1. Stop form from reloading page
    event.preventDefault();

    // 2. Get form values
    const email = document.getElementsByName("loginEmail")[0].value.trim();
    const password = document.getElementsByName("loginPassword")[0].value.trim();

    // 3. Get stored user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // 4. Check if user exists
    if (!storedUser) {
        alert("No account found! Please register first.");
        return;
    }

    // 5. Validate login
    console.log("Stored User:", storedUser, "Entered Email:", email, "Entered Password:", password);
    if (email === storedUser.email && password === storedUser.password) {

        // save login session
        localStorage.setItem("loggedInUser", email);

        alert("Login successful!");

        // redirect to dashboard
        window.location.href = "dashboard.html";

    } else {
        alert("Invalid email or password!");
    }
}


// ---------- LOGOUT ----------
function logout() {
localStorage.removeItem("loggedIn");
window.location.href = "login.html";
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
function addIncome(event) {
// page refresh
event.preventDefault();
// 1. get values from form
let amount = document.getElementById("amount").value;
let date = document.getElementById("date").value;
let category = document.getElementById("category").value;
let notes = document.getElementById("notes").value;

// validation
if (amount === "" || date === "" || category === "") {
    alert("Please fill all required fields!");
    return;
}

// 2. create income object
let income = {
    amount: Number(amount),
    date: date,
    category: category,
    notes: notes
};

// 3. get existing income list from localStorage
let incomes = JSON.parse(localStorage.getItem("incomes")) || [];

// 4. add new income
incomes.push(income);

// 5. save back to localStorage
localStorage.setItem("incomes", JSON.stringify(incomes));

// success message
alert("Income Added Successfully!");

// clear form
document.querySelector("form").reset();


}

// ---------- ADD EXPENSE ----------
function addExpense(event) {
// stop page refresh
event.preventDefault();


// 1. get form values
let amount = document.querySelector('input[name="amount"]').value;
let category = document.querySelector('select[name="category"]').value;
let note = document.querySelector('input[name="note"]').value;
let date = document.querySelector('input[name="date"]').value;

// validation
if (amount === "" || category === "" || date === "") {
    alert("Please fill all required fields!");
    return;
}

// 2. create expense object
let expense = {
    amount: Number(amount),
    category: category,
    note: note,
    date: date
};

// 3. get previous expenses from localStorage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// 4. add new expense
expenses.push(expense);

// 5. save back to localStorage
localStorage.setItem("expenses", JSON.stringify(expenses));

// success message
alert("Expense Saved Successfully!");

// clear form
document.querySelector("form").reset();


}




// ---------- RECURRING PAYMENT ----------
function addRecurringPayment(event) {
    event.preventDefault();

    // Get values from form
    const category = document.getElementById("category").value;
    const frequency = document.getElementById("frequency").value;
    const reminder = document.getElementById("reminder").value;


    // You forgot amount field in screenshot,
    // so make sure you have this in HTML:
    // <input type="number" id="amount" required>

    const amountInput = document.getElementById("amount");
    const amount = amountInput ? amountInput.value : 0;

    // Validation
    if (!category || !frequency || !amount) {
        alert("Please fill all required fields!");
        return;
    }

    // Create object
    const recurringPayment = {
        category: category,
        frequency: frequency,
        reminder: reminder || 0,
        amount: parseFloat(amount)
    };

    // Get existing recurrent payments
    let recurrent = JSON.parse(localStorage.getItem("recurrent")) || [];

    // Add new one
    recurrent.push(recurringPayment);

    // Save back to localStorage
    localStorage.setItem("recurrent", JSON.stringify(recurrent));

    alert("Recurring Payment Saved Successfully!");

    // Optional: clear form
    event.target.reset();
}


// ---------- REPORT ----------
function loadReport() {

    const user = JSON.parse(localStorage.getItem("user"));
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const incomes = JSON.parse(localStorage.getItem("incomes")) || [];
    
    if (!user) {
        alert("No user data found!");
        return;
    }

    console.log("User Data:", user, expenses);


    let income = 0;

    for (let i = 0; i < incomes.length; i++) {
        income += parseFloat(incomes[i].amount) || 0;
    }

    // const income = ;
    // incomes.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0);

    let totalExpenses = 0;

    expenses.forEach(function(item) {
        totalExpenses += parseFloat(item.amount) || 0;
    });

    const totalSavings = income - totalExpenses;
    const recurrent = JSON.parse(localStorage.getItem("recurrent")) || [];
    const totalRecurring = recurrent.reduce((sum, r) => sum + parseFloat(r.amount || 0), 0);

    // 4. Calculate total spent and savings
    const totalSpent = totalExpenses + totalRecurring;
    const totalSavingsincludingrecurrent = income - totalSpent;

    document.getElementById("income").innerText = income;
    document.getElementById("expenses").innerText = totalExpenses;
    document.getElementById("savings").innerText = totalSavings;
    document.getElementById("recurrent").innerText = totalRecurring;
    //document.getElementById("totalSpent").innerText = totalSpent;
    document.getElementById("totalSavings").innerText = totalSavingsincludingrecurrent;

// Calculate percentage
let percentage = 0;

if (income > 0) {
    percentage = (totalExpenses / income) * 100;
}

if (percentage >= 90) {
    alert("⚠ Warning! You have spent 90% or more of your income!");
}
else if (percentage >= 50) {
    alert("⚠ Alert! You have spent 50% of your income.");
}

}

// Run when page loads
window.onload = loadReport;
