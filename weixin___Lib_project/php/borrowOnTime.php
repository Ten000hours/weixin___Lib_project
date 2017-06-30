<?php
require "conn.php";
if($_GET["dateTime"]&&$_GET["userId"]){
    $sql="SELECT book.bookId,bookName,bookImgPath,bookWriterName,borrowTime,returnTime FROM book,borrowRecord WHERE book.bookId = borrowRecord.bookId AND userId =".$_GET["userId"]." AND returnTime <= '".$_GET["dateTime"]."'";
    query($sql);
}
?>