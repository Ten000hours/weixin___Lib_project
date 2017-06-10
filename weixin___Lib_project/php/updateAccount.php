<?php
require "conn.php";
if($_GET["userId"]&&$_GET["account"]){
    $sql="UPDATE user SET userAccount = userAccount + " .$_GET["account"]. " WHERE userId = ".$_GET["userId"];
    update($sql);
}
?>