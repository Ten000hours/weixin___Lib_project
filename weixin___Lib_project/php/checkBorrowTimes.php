<?php
require "conn.php";
if($_GET["userId"]&&$_GET["dateTime"]){
	$sql="SELECT borrowId FROM borrowRecord WHERE status = 1 AND userId = ".$_GET["userId"]." AND borrowTime ='".$_GET["dateTime"]."'";
	query($sql);
}
?>