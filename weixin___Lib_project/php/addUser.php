<?php
require "conn.php";
if($_POST["userName"]&&$_POST["phoneNum"]&&$_POST["IdNum"]&&$_POST["password"]){
     $sql="INSERT INTO user VALUES (NULL,'" .$_POST["userName"]. "','" .$_POST["phoneNum"]. "','" .$_POST["IdNum"]. "','" .$_POST["password"]. "',0)";
     insert($sql);
}
?>