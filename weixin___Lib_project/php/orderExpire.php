<?php
require("conn.php");
if($_GET["dateTime"]&&$_GET["userId"]){
    $sql="SELECT * FROM reserveRecord WHERE takeTime = '".$_GET["dateTime"]."' AND userId =".$_GET["userId"];
   query($sql);
}
?>