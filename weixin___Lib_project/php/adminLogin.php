<?php
require 'Info.php';
if($_GET["adminId"] && $_GET["adminPassword"]&& $_GET["adminIdNum"]) {
    $conn = @new mysqli(HOST, USER_NAME, USER_PW) or die("数据库连接错误");
    @mysqli_select_db($conn, DB_NAME) or die("查找表错误");
    $sql = "SELECT userId FROM user WHERE adminId LIKE '".$_GET["adminId"]."' AND adminPassword LIKE '" .$_GET["adminPassword"]. "' AND adminIdNum LIKE '" .$_GET["adminIdNum"]. "'";
    $result = @mysqli_query($conn, $sql) or die('数据查询错误');
    $row = mysqli_fetch_assoc($result);
    echo $row["adminId"];
    @mysqli_close($conn);
}
?>