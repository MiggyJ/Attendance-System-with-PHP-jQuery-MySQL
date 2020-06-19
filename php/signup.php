<?php
	include("db.php");
	header('Content-Type: application/json');


$number = $_REQUEST['number'];
$fName = $_REQUEST['firstName'];
$lName = $_REQUEST['lastName'];
$section = $_REQUEST['section'];
$pass = password_hash($_REQUEST['pass'], PASSWORD_DEFAULT); // Encrypt Password


$query = $db->prepare("INSERT INTO student (studentNumber, firstName, lastName, section, password, isAdmin) VALUES (?, ?, ?, ?, ?, 0)");

if($query->execute([$number, $fName, $lName, $section, $pass])){
	echo json_encode("Sign Up SUCCESSFUL!");
}else{
	echo json_encode("Sign Up Error");
}



?>