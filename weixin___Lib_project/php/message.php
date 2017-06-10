<?php
require("conn.php");
if($_GET["userId"]){
   $sql="SELECT * FROM message WHERE userId=".$_GET["userId"];
   query($sql);
}
?>