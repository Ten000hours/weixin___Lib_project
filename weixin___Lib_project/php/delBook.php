<?php
require "conn.php";
if($_GET["ISBN"]){
    $sql="DELETE FROM book WHERE ISBN =".$_GET["ISBN"];
    delete($sql);
}
?>
