<?php
require "conn.php";
if($_GET["userId"]){
     $sql="SELECT userName FROM user WHERE userId = " .$_GET["userId"] ;
     query($sql);
}
?>