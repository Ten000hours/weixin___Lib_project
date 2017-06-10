<?php
require("conn.php");
if($_GET["userId"]&&$_GET["dateTime"]&&$_GET["date"]){
   $sql="INSERT INTO message VALUES(NULL," .$_GET["type"]. ",'" .$_GET["date"]."','" .$_GET["dateTime"]. "',".$_GET["userId"].")";
   insert($sql);
}
?>