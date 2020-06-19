<?php
	include('db.php');
	header('Content-Type: application/json');


	$user = $_REQUEST['user'];
	$pass = $_REQUEST['pass'];
	
	$query = $db->prepare("SELECT * FROM STUDENT WHERE studentNumber = ?");
	$query->execute([$user]);

	if(!$row = $query->fetch(PDO::FETCH_OBJ)){
		echo json_encode(-1); // if not recognized
		exit();
	}

	if(password_verify($pass, $row->password)){ // check if password is correct
		session_start();
		$_SESSION['id'] = $row->id;
		$_SESSION['user'] = $row->studentNumber;
		$_SESSION['section'] = $row->section;
		$_SESSION['admin'] = $row->isAdmin;

		if($_SESSION['admin'] == 1){ // if admin
			echo json_encode(3);
			exit(); // return with a response 3
		}

		// check if image is already submitted for current day
		$query = $db->prepare("SELECT M.image FROM monitor M LEFT JOIN student S on S.id = M.id where M.postDate = CURDATE() AND S.id = ?");
		$query->execute([$_SESSION['id']]);
		$res = $query->fetch();
		if ($res[0] == NULL) { // if none
			echo json_encode(0); // return response 0
		} else{ // if there is
			session_destroy(); // destroy current session
			echo json_encode(2); //return response 2
		}
		
	}else{ // if password is incorrect
		echo json_encode(1);
	}

	
	
	











?>