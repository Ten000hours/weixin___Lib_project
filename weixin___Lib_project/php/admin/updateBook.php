<?php
require "../conn.php";
	$sql="UPDATE book SET bookType='".$_POST["bookType"]."',bookName='".$_POST["bookName"]."',bookPhoneticize='".$_POST["bookPhoneticize"]."',bookFirstLetter='".$_POST["bookFirstLetter"]."',bookPublisher='".$_POST["bookPublisher"]."',bookVersionID=".$_POST["bookVersionID"].",bookCollectNum=".$_POST["bookCollectNum"].",bookImgPath='".$_POST["bookImgPath"]."',bookPrice=".$_POST["bookPrice"].",bookPublishTime='".$_POST["bookPublishTime"]."',ISBN='".$_POST["ISBN"]."',bookPosition='".$_POST["bookPosition"]."',bookWriterName='".$_POST["bookWriterName"]."' WHERE bookId =".$_POST["bookId"];
	update($sql);
?>