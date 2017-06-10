<?php
require "conn.php";
if($_GET["userIdNum"]){
     $sql="SELECT * FROM user WHERE userIdNum LIKE ".$_GET["userIdNum"];
     check($sql);
}
?>