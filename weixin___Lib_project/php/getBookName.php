<?php
require "conn.php";
if($_GET["bookId"]){
     $sql="SELECT bookName FROM book WHERE bookId = " .$_GET["bookId"] ;
     query($sql);
}
?>