<?php
require("conn.php");
if($_GET["userId"]){
       $sql="SELECT bookId,bookImgPath FROM book WHERE bookId IN (SELECT bookId FROM favorite WHERE userId = ".$_GET["userId"].")";
    query($sql);
}
?>