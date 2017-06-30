<?php
require "../conn.php";
	$sql="INSERT INTO book VALUES(".$_POST["bookId"].",'".$_POST["bookType"]."','".$_POST["bookName"]."','".$_POST["bookPhoneticize"]."','".$_POST["bookFirstLetter"]."','".$_POST["bookPublisher"]."',".$_POST["bookVersionID"].",'".$_POST["bookCatalog"]."','".$_POST["bookBriefIntro"]."',".$_POST["bookCollectNum"].",'".$_POST["bookImgPath"]."',0,".$_POST["bookPrice"].",'".$_POST["bookWriterInfor"]."','".$_POST["bookPublishTime"]."','".$_POST["ISBN"]."','".$_POST["bookPosition"]."','".$_POST["bookWriterName"]."')";
	insert($sql);
?>