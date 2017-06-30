<?php
require "../conn.php";
$sql="select bookName,bookPublisher,bookType,bookId,bookWriterName,bookImgPath,left(bookBriefIntro,18) as bookBriefIntro from book";
query($sql);
?>