<?php
require "../conn.php";
if($_GET["userName"]){
	$sql = "SELECT * FROM user WHERE userName LIKE '%".$_GET["userName"]."%'";
	query($sql);
}
?>