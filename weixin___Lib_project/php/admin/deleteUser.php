<?php
require "../conn.php";
if($_GET["userId"]){
	$sql = "DELETE FROM user WHERE userId =".$_GET["userId"];
	delete($sql);
}
?>