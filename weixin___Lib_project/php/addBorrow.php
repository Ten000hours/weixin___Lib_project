<?php
require "conn.php";
if($_GET["bookId"]&&$_GET["userId"]&&$_GET["borrowTime"]&&$_GET["returnTime"]){
    $sql="INSERT INTO borrowRecord VALUES(NULL,".$_GET["bookId"].",".$_GET["userId"].",0,'".$_GET["borrowTime"]."','".$_GET["returnTime"]."')";
    insert($sql);
    $sql="UPDATE book SET bookCollectNum=bookCollectNum-1,bookBorrowTimes=bookBorrowTimes+1 WHERE bookId = ".$_GET["bookId"] ;
    update($sql);
}
?>