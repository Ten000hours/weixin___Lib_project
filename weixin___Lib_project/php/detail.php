<?php
require("conn.php");
if($_GET[id]){
   $sql="select * from book where bookId = ".$_GET[id];
   query($sql);
}
?>
