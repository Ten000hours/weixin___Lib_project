<?php
require "conn.php";
if($_GET["bookType"]&&$_GET["bookWriterName"]&&$_GET["bookName"]){
	$sql="SELECT bookName,bookId,bookImgPath FROM book WHERE bookName NOT LIKE '%".$_GET["bookName"]."%' AND bookWriterName LIKE '%".$_GET["bookWriterName"]."%' OR  bookName NOT LIKE '".$_GET["bookName"]."' AND bookType LIKE '".$_GET["bookType"]."' ORDER BY rand() limit 3";
	recommend($sql,3);
}
?>