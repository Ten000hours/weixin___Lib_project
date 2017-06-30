<?php
require "conn.php";
if($_GET["bookId"]&&$_GET["userId"]){
    $sql="UPDATE book SET bookCollectNum = bookCollectNum + 1 WHERE bookId =" .$_GET["bookId"];
    update($sql);
    $sql="DELETE FROM borrowRecord WHERE bookId=" .$_GET["bookId"]." AND status=0 AND userId =".$_GET["userId"];
    delete($sql);
}
?>