<?php
require("conn.php");
if($_GET["dateTime"]&&$_GET["userId"]){
    $sql="SELECT * FROM borrowRecord WHERE returnTime <= '".$_GET["dateTime"]."' AND userId =".$_GET["userId"];
   query($sql);
}
?>