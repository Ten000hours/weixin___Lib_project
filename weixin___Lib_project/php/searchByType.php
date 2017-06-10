<?php
require("conn.php");
if($_GET["type"]){
    $sql="SELECT bookName,bookPublisher,bookType,bookId,bookWriterName,bookImgPath,left(bookBriefIntro,18) AS bookBriefIntro from book WHERE bookType  LIKE '" . $_GET["type"]."'";
   query($sql);
}
?>