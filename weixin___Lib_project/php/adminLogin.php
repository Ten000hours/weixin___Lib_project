<?php
require 'Info.php';
if($_GET["adminId"] && $_GET["adminPassword"]&& $_GET["adminIdNum"]) {
    $conn = @new mysqli(HOST, USER_NAME, USER_PW) or die("���ݿ����Ӵ���");
    @mysqli_select_db($conn, DB_NAME) or die("���ұ����");
    $sql = "SELECT userId FROM user WHERE adminId LIKE '".$_GET["adminId"]."' AND adminPassword LIKE '" .$_GET["adminPassword"]. "' AND adminIdNum LIKE '" .$_GET["adminIdNum"]. "'";
    $result = @mysqli_query($conn, $sql) or die('���ݲ�ѯ����');
    $row = mysqli_fetch_assoc($result);
    echo $row["adminId"];
    @mysqli_close($conn);
}
?>