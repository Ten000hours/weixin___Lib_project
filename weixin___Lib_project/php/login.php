<?php
require 'Info.php';
if($_GET["userName"] && $_GET["userPass"]) {
    $conn = @new mysqli(HOST, USER_NAME, USER_PW) or die("数据库连接错误");
    @mysqli_select_db($conn, DB_NAME) or die("查找表错误");
    $sql = "SELECT userId FROM user WHERE userName LIKE '".$_GET["userName"]."' AND userPass LIKE '" .$_GET["userPass"]. "'";
    $result = @mysqli_query($conn, $sql) or die('数据查询错误');
    $row = mysqli_fetch_assoc($result);
    echo $row["userId"];
    @mysqli_close($conn);
}
?>