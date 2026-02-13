<?php
$conn = new mysqli("localhost", "root", "", "finance_tracker");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST['title'];
    $amount = $_POST['amount'];
    $category = $_POST['category'];
    $payment_date = $_POST['payment_date'];

    $sql = "INSERT INTO recurrent_payments (title, amount, category, payment_date)
            VALUES ('$title', '$amount', '$category', '$payment_date')";

    if ($conn->query($sql) === TRUE) {
        echo "<p style='color:green;'>Recurrent payment added successfully!</p>";
    } else {
        echo "Error: " . $conn->error;
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Recurrent Payments</title>
</head>
<body>

<h2>Add Recurrent Payment</h2>

<form method="POST" action="">
    <label>Title:</label><br>
    <input type="text" name="title" required><br><br>

    <label>Amount:</label><br>
    <input type="number" step="0.01" name="amount" required><br><br>

    <label>Category:</label><br>
    <select name="category" required>
        <option value="Rent">Rent</option>
        <option value="Subscription">Subscription</option>
        <option value="Electricity">Electricity</option>
        <option value="Internet">Internet</option>
        <option value="Other">Other</option>
    </select><br><br>

    <label>Next Payment Date:</label><br>
    <input type="date" name="payment_date" required><br><br>

    <button type="submit">Add Payment</button>
</form>

<hr>

<h3>Saved Recurrent Payments</h3>

<?php
$result = $conn->query("SELECT * FROM recurrent_payments");

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<p>";
        echo "<strong>" . $row['title'] . "</strong> - ₹" . $row['amount'];
        echo " (" . $row['category'] . ")";
        echo " | Next Date: " . $row['payment_date'];
        echo "</p>";
    }
} else {
    echo "No recurrent payments found.";
}

$conn->close();
?>

<br>
<a href="dashboard.html">Back to Dashboard</a>

</body>
</html>