<?php 

	$host = 'localhost';
  $mydb = 'attendance';
  $user = 'dlrowehtanool';
  $pass = 'dnwnthsu';
  $dsn = 'mysql:host='. $host .';dbname='.$mydb;

  $db = new PDO($dsn, $user, $pass);
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); # catch exceptions

?>