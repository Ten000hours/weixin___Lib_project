<?php
require("conn.php");
if($_GET["userId"]&&$_GET["view"]&&$_GET["dateTime"]){
     $sql="INSERT INTO communicate VALUES (NULL,'".$_GET['userId']."', '".$_GET['dateTime']."', '".$_GET['view']."')";
     insert($sql);
}
?>