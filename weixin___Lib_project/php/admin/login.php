<?php
require "../conn.php";
if($_POST["adminName"]&&$_POST["adminPass"]){
	$sql="SELECT * FROM administrator WHERE adminName LIKE '" .$_POST["adminName"]. "' AND adminPassword LIKE '" .$_POST["adminPass"]. "'";
	query($sql);
}
?>