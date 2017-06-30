<?php
require "conn.php";
if($_GET["key1"]&&$_GET["key2"]){
     $sql="select bookName,bookPublisher,bookType,bookId,bookWriterName,bookImgPath,left(bookBriefIntro,18) as bookBriefIntro from book where bookName like '%".$_GET[key1]."%' or bookType like '%".$_GET[key1]."%' or bookFirstLetter like '%".$_GET[key1]."%' or bookId like '%".$_GET[key1]."%'or bookWriterName like '%".$_GET[key1]."%' or bookName like '%".$_GET[key2]."%' or bookType like '%".$_GET[key2]."%' or bookFirstLetter like '%".$_GET[key2]."%' or bookId like '%".$_GET[key2]."%'or bookWriterName like '%".$_GET[key2]."%' order by bookBorrowTimes desc";
    recommend($sql,5);
}
?>