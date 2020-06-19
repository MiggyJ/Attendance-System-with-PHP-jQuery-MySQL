<?php 

  $host = 'yourhost';
  $mydb = 'yourdatabase';
  $user = 'yourusername';
  $pass = 'yourpassword';
  $dsn = 'mysql:host='. $host .';dbname='.$mydb;

  $db = new PDO($dsn, $user, $pass);
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); # catch exceptions

?>
