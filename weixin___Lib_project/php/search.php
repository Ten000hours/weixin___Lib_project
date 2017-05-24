<?php
require("conn.php");
if($_GET[key]){
    $sql="select bookName,bookPublisher,bookType,bookId,bookWriterName,bookImgPath,left(bookBriefIntro,18) as bookBriefIntro from book where bookName like '%".$_GET[key]."%' or bookType like '%".$_GET[key]."%' or bookFirstLetter like '%".$_GET[key]."%' or bookId like '%".$_GET[key]."%'or bookWriterName like '%".$_GET[key]."%'";
   query($sql);
}
?>
