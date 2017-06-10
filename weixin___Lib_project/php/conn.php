<?php
require 'Info.php';
function query($sql){
    $conn=new mysqli(HOST, USER_NAME, USER_PW) or die('错误');
    if (mysqli_connect_errno($conn))
   { 
    echo "连接 MySQL 失败: " . mysqli_connect_error(); 
   } 
    mysqli_query("set names 'utf-8'");
    mysqli_select_db($conn,DB_NAME) or die('数据库错误');
    $result=@mysqli_query($conn,$sql)or die('sql执行错误') or die('sql执行错误');
    $num=@mysqli_num_rows($result);
    $jarr = array();
    @mysqli_close($conn);
    if($num>200){
        array_slice($result,200);
    }
    while ($row=@mysqli_fetch_array($result,MYSQLI_ASSOC)){
        array_push($jarr, $row);
    }
    echo json_encode($jarr);
}
function basic($sql){
    $conn=new mysqli(HOST, USER_NAME, USER_PW) or die('错误');
    if (mysqli_connect_errno($conn))
    {
        echo "连接 MySQL 失败: " . mysqli_connect_error();
    }
    mysqli_query("set names 'utf-8'");
    mysqli_select_db($conn,DB_NAME) or die('数据库错误');
    $result=@mysqli_query($conn,$sql)or die('sql执行错误') or die('sql执行错误');
    if($result){
        echo 1;
    }
    else{
        echo 0;
    }
    @mysqli_close($conn);
}
function insert($sql){
    basic($sql);
}
function delete($sql){
    basic($sql);
}
function update($sql){
    basic($sql);
}
function check($sql){
    $conn=new mysqli(HOST, USER_NAME, USER_PW) or die('错误');
    if (mysqli_connect_errno($conn))
   { 
    echo "连接 MySQL 失败: " . mysqli_connect_error(); 
   } 
    mysqli_query("set names 'utf-8'");
    mysqli_select_db($conn,DB_NAME) or die('数据库错误');
    $result=@mysqli_query($conn,$sql)or die('sql执行错误') or die('sql执行错误');
    $num=@mysqli_num_rows($result);
    @mysqli_close($conn);
    if($num>0){
        echo 1;
    }
    else{
    	echo 0;
    }
}
function recommend($sql){
    $conn=new mysqli(HOST, USER_NAME, USER_PW) or die('错误');
    if (mysqli_connect_errno($conn))
   { 
    echo "连接 MySQL 失败: " . mysqli_connect_error(); 
   } 
    mysqli_query("set names 'utf-8'");
    mysqli_select_db($conn,DB_NAME) or die('数据库错误');
    $result=@mysqli_query($conn,$sql)or die('sql执行错误') or die('sql执行错误');
    $jarr = array();
    @mysqli_close($conn);
    $num = 0;
    while ($num<5&&($row=@mysqli_fetch_array($result,MYSQLI_ASSOC))){
        array_push($jarr, $row);
	$num++;
    }
    echo json_encode($jarr);
}
?>
