<?php
require "../conn.php";
if($_GET["userId"]&&$_GET["bookId"]){
	$sql="SELECT book.bookId,bookName,bookImgPath,bookWriterName,bookPrice,borrowTime,returnTime,user.userId,userName FROM book,user,borrowRecord WHERE status=1 AND book.bookId=".$_GET["bookId"]." AND user.userId=".$_GET["userId"]." AND book.bookId = borrowRecord.bookId AND user.userId = borrowRecord.userId";
	query($sql);
}
?>