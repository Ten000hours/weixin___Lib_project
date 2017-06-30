<?php
require "../conn.php";
if($_POST["bookId"]&&$_POST["bookBriefIntro"]){
	$sql="UPDATE book SET bookBriefIntro = '".$_POST["bookBriefIntro"]."' WHERE bookId = " .$_POST["bookId"];
	update($sql);
}
?>