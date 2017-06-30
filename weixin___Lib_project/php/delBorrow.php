<?php
require "conn.php";
if($_GET["dateTime"]&&$_GET["userId"]){
    $sql="UPDATE book SET bookCollectNum = bookCollectNum + 1 WHERE bookId IN (SELECT bookId FROM borrowRecord WHERE borrowTime < '".$_GET["dateTime"]."' AND borrowRecord.status = 0 AND userId =".$_GET["userId"];
    update($sql);
    $sql="DELETE FROM borrowRecord WHERE borrowTime <'" .$_GET["dateTime"]. "' AND status=0 AND userId =".$_GET["userId"];
    delete($sql);
}
?>