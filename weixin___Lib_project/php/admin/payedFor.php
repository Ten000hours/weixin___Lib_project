<?php
require "../conn.php";
    $sql="SELECT book.bookId,bookName,bookImgPath,bookWriterName,bookPrice,borrowTime,returnTime,user.userId,userName FROM book,user,borrowRecord WHERE status=2 AND book.bookId=borrowRecord.bookId AND user.userId= borrowRecord.userId";
    query($sql);
?>