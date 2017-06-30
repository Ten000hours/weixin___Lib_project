<?php
require("conn.php");
if($_GET["userId"]&&$_GET["date"]){
   $sql="SELECT * FROM message WHERE messageType=1 AND userId=".$_GET["userId"]." AND messageDate ='" .$_GET["date"]. "'";
   check($sql);
}
?>