<?php
require "conn.php";
if($_GET["userName"]&&$_GET["phoneNum"]&&$_GET["IdNum"]&&$_GET["password"]){
     $sql="INSERT INTO user VALUES (NULL,'" .$_GET["userName"]. "','" .$_GET["phoneNum"]. "','" .$_GET["IdNum"]. "','" .$_GET["password"]. "')";
     insert($sql);
}
?>