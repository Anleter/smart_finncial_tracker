<?php
session_start();
include "db.php";

$user_id = $_SESSION['user_id'];

$sql = "SELECT * FROM expenses WHERE user_id='$user_id'";
$result = mysqli_query($conn,$sql);

echo "<h2>Your Expenses</h2>";

while($row=mysqli_fetch_assoc($result)){
    echo $row['date']." - ".$row['category']." - ₹".$row['amount']."<br>";
}
?>