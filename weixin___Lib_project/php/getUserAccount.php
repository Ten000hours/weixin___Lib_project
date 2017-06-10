<?php
require "conn.php";
if($_GET["userId"]){
     $sql="SELECT userAccount FROM user WHERE userId = " .$_GET["userId"] ;
     query($sql);
}
?>