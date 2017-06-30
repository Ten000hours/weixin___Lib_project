<?php
require "conn.php";
if($_GET["userId"]){
    $sql="SELECT book.bookId,bookName,bookImgPath,bookWriterName,takeTime FROM book,reserveRecord WHERE book.bookId = reserveRecord.bookId AND userId =".$_GET["userId"]." ORDER BY takeTime";
    query($sql);
}
?>