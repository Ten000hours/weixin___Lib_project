<?php
require "../conn.php";
if($_POST["bookId"]&&$_POST["bookWriterInfor"]){
	$sql="UPDATE book SET bookWriterInfor = '".$_POST["bookWriterInfor"]."' WHERE bookId = " .$_POST["bookId"];
	update($sql);
}
?>