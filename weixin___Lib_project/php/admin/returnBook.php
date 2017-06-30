<?php
require "../conn.php";
if($_POST["dateTime"]&&$_POST["userId"]&&$_POST["bookId"]&&$_POST["price"]){
    	$sql="UPDATE book SET bookCollectNum = bookCollectNum + 1 WHERE bookId =".$_POST["bookId"];
    	update($sql);
	$sql="UPDATE borrowRecord SET status = 2,returnTime='".$_POST["dateTime"]."' WHERE bookId =".$_POST["bookId"]." AND userId = ".$_POST["userId"];
    	update($sql);
	$sql="UPDATE user SET userAccount = userAccount + ".$_POST["price"]." WHERE userId = ".$_POST["userId"];
    	update($sql);
}
?>