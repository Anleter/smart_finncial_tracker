<?php
session_start();
include "db.php";
if(!isset($_SESSION['user_id'])){
    header("Location: login.html");
}


$user_id = $_SESSION['user_id'];
$amount = $_POST['amount'];
$category = $_POST['category'];
$note = $_POST['note'];
$date = $_POST['date'];

$sql = "INSERT INTO expenses(user_id,amount,category,note,date)
VALUES('$user_id','$amount','$category','$note','$date')";

mysqli_query($conn,$sql);

header("Location: dashboard.php");
?>