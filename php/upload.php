<?php

	include("db.php");

	session_start();


	$srcTmp = $_FILES['file']['tmp_name']; // temp name when uploaded
	$src = $_FILES['file']['name']; // actual filename
	$fileExt = explode(".", $src); // split filename on .
	$fileActualExt = strtolower(end($fileExt)); // get file extension

	$upload = uniqid('', true).".".$fileActualExt; // create new filename

	$targ = "../uploads/".$upload; // upload folder in local directory
	move_uploaded_file($srcTmp, $targ); // move to target folder

	// save filename to database
	$query = $db->prepare("INSERT INTO monitor (studentNumber, image, postTime, postDate, isLate) VALUES (?, ?, current_time(), curdate(), CASE WHEN timediff(current_time(), '14:00:00') > 0 THEN 1 ELSE 0 END)");

	try {
		$query->execute([$_SESSION['user'], $upload]);
		echo json_encode(0);
	} catch (PDOException $e) {
		echo json_encode(1);
	}



	session_destroy();
?>