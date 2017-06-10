<?php
require "conn.php";
if($_GET["bookId"]&&$_GET["userId"]){
    $sql="SELECT * FROM borrowRecord WHERE bookId = ".$_GET["bookId"]." AND userId = ".$_GET["userId"];
    check($sql);
}
?>