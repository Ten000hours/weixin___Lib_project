<?php
require "../conn.php";
if($_GET["userId"]){
	 $sql="SELECT book.bookId,bookName,bookImgPath,bookWriterName,bookPrice,borrowTime,returnTime,user.userId,userName FROM book,user,borrowRecord WHERE status=2 AND book.bookId=borrowRecord.bookId AND user.userId= borrowRecord.userId AND user.userId =".$_GET["userId"];
	query($sql);
}
?>