<?php
require "conn.php";
if($_GET["userId"]&&$_GET["bookId"]){
     $sql="DELETE FROM favorite WHERE userId=".$_GET["userId"]." AND bookId=".$_GET["bookId"];
     delete($sql);
}
?>