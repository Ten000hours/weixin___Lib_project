<?php
require("conn.php");
if($_GET["dateTime"]&&$_GET["userId"]){
    $sql="SELECT book.bookId,bookName,bookImgPath,bookWriterName,takeTime FROM book,reserveRecord WHERE book.bookId = reserveRecord.bookId AND userId =".$_GET["userId"]." AND takeTime = '".$_GET["dateTime"]."'";
    query($sql);
}
?>