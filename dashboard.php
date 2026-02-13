<?php
session_start();
if(!isset($_SESSION['user_id'])){
    header("Location: login.html");
}
?>

<h1>Welcome to Expense Tracker</h1>

<a href="add_income.html">Add Income</a><br><br>
<a href="add_expense.html">Add Expense</a><br><br>
<a href="view_report.php">View Report</a><br><br>
<a href="logout.php">Logout</a>