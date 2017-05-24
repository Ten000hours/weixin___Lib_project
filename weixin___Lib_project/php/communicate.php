<?php
require("conn.php");
$sql="select userName,communicateTime,communicateContent from communicate,user where communicate.userId = user.userId order by communicateTime desc";
query($sql);
?>