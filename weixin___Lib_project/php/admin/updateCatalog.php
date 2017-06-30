<?php
require "../conn.php";
if($_POST["bookId"]&&$_POST["bookCatalog"]){
	$sql="UPDATE book SET bookCatalog = '".$_POST["bookCatalog"]."' WHERE bookId = " .$_POST["bookId"];
	update($sql);
}
?>