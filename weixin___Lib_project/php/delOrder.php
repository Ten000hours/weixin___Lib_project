<?php
require("conn.php");
if($_GET["dateTime"]&&$_GET["userId"]){
    $sql="DELETE FROM reserveRecord WHERE takeTime < '".$_GET["dateTime"]."' AND userId =".$_GET["userId"];
   delete($sql);
}
?>