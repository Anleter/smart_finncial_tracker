<?php
session_start();
include "db.php";

$user_id = $_SESSION['user_id'];
$amount = $_POST['amount'];
$source = $_POST['source'];
$date = $_POST['date'];

$sql = "INSERT INTO income(user_id,amount,source,date)
VALUES('$user_id','$amount','$source','$date')";

if(mysqli_query($conn,$sql)){
    echo "Income Added Successfully";
} else {
    echo "Error adding income";
}
?>