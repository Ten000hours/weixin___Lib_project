<?php
require("conn.php");
if($_GET[ISBN]){
   $sql="select bookName,bookPublisher,bookType,bookId,bookWriterName,bookImgPath,left(bookBriefIntro,18) as bookBriefIntro from book where ISBN = ".$_GET[ISBN];
   query($sql);
}
?>