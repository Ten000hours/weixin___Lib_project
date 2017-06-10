<?php
require "conn.php";
if($_GET["bookPrice"]&&$_GET["userId"]&&$_GET["bookId"]){
    $sql="UPDATE user SET userAccount = userAccount - " .$_GET["bookPrice"]. " WHERE userId = ".$_GET["userId"];
    update($sql);
    $sql="UPDATE borrowRecord SET status = 1 WHERE userId = ".$_GET["userId"] ." AND bookId = ".$_GET["bookId"];
    update($sql);
}
?>