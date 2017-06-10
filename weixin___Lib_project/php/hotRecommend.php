<?php
require "conn.php";
$sql="SELECT bookName,bookPublisher,bookType,bookId,bookWriterName,bookImgPath,left(bookBriefIntro,18) as bookBriefIntro FROM book ORDER BY bookBorrowTimes DESC";
recommend($sql);
?>