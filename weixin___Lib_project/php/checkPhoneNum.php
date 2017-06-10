<?php
require "conn.php";
if($_GET["userPhoneNum"]){
     $sql="SELECT * FROM user WHERE userPhoneNum LIKE '".$_GET["userPhoneNum"]."'";
     check($sql);
}
?>