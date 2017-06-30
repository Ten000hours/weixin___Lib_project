<?php
require "conn.php";
if($_GET["bookId"]&&$_GET["userId"]){
    $sql="SELECT * FROM borrowRecord WHERE status = 1 AND bookId = ".$_GET["bookId"]." AND userId = ".$_GET["userId"];
    check($sql);
}
?>