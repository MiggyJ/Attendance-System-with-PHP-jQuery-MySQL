<?php
	include('db.php');

	$date = $_REQUEST['date'];
	$section = $_REQUEST['section'];


	$query = $db->prepare("SELECT CONCAT(s.firstName, ' ', s.LastName) as Name, s.studentNumber as studentNumber, m.Image as post, CASE WHEN m.isLate = 1 THEN true ELSE false END as late FROM student s INNER JOIN monitor m on m.studentNumber = s.studentNumber where s.section = ? and m.postDate = ?");
	$query->execute([$section, $date]);
	$res = $query->fetchAll(PDO::FETCH_OBJ); # fetch results as object
	
	echo json_encode([$res, count($res)]);

	
?>