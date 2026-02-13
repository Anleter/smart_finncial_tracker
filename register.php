<?php
include "db.php";

$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];

$sql = "INSERT INTO users(name,email,password)
VALUES('$name','$email','$password')";
if(mysqli_query($conn,$sql)){
    header("Location: login.html");
    exit();
}else{
    echo "Error: " . mysqli_error($conn);
}
?>
