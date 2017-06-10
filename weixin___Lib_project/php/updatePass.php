<?php
require "conn.php";
if($_GET["userName"]&&$_GET["userPass"]){
    $sql="UPDATE user SET userPass = '" .$_GET["userPass"]. "' WHERE userName LIKE '".$_GET["userName"]."'";
    update($sql);
}
?>