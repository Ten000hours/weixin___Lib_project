<?php
require "conn.php";
if($_GET["userName"]&&$_GET["userIdNum"]){
    $sql="SELECT * FROM user WHERE userName LIKE '".$_GET["userName"]."' AND userIdNum LIKE '".$_GET["userIdNum"]."'";
    check($sql);
}
?>