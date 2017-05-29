<?php
require("conn.php");
if($_GET["userId"]&&$_GET["bookId"]){
    $sql="INSERT INTO favorite VALUES (".$_GET[userId].", ".$_GET[bookId].")";
    insert($sql);
}
?>