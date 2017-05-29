<?php
require "conn.php";
if($_GET["bookId"]&&$_GET["userId"]&&$_GET["takeTime"]){
    $sql="INSERT INTO reserveRecord VALUES('".$_GET["bookId"]."','".$_GET["userId"]."','".$_GET["takeTime"]."')";
    insert($sql);
    $sql="UPDATE book SET bookCollectNum=bookCollectNum-1 WHERE bookId = ".$_GET["bookId"];
    update($sql);
}
?>
