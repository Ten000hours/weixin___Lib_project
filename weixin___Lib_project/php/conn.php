<?php
require 'Info.php';
function query($sql){
    $conn=new mysqli(HOST, USER_NAME, USER_PW) or die('´íÎó');
    if (mysqli_connect_errno($conn))
   { 
    echo "Á¬½Ó MySQL Ê§°Ü: " . mysqli_connect_error(); 
   } 
    mysqli_query("set names 'utf-8'");
    mysqli_select_db($conn,DB_NAME) or die('Êý¾Ý¿â´íÎó');
    $result=@mysqli_query($conn,$sql)or die('sqlÖ´ÐÐ´íÎó') or die('sqlÖ´ÐÐ´íÎó');
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
    $conn=new mysqli(HOST, USER_NAME, USER_PW) or die('´íÎó');
    if (mysqli_connect_errno($conn))
    {
        echo "Á¬½Ó MySQL Ê§°Ü: " . mysqli_connect_error();
    }
    mysqli_query("set names 'utf-8'");
    mysqli_select_db($conn,DB_NAME) or die('Êý¾Ý¿â´íÎó');
    $result=@mysqli_query($conn,$sql)or die('sqlÖ´ÐÐ´íÎó') or die('sqlÖ´ÐÐ´íÎó');
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
    $conn=new mysqli(HOST, USER_NAME, USER_PW) or die('´íÎó');
    if (mysqli_connect_errno($conn))
   { 
    echo "Á¬½Ó MySQL Ê§°Ü: " . mysqli_connect_error(); 
   } 
    mysqli_query("set names 'utf-8'");
    mysqli_select_db($conn,DB_NAME) or die('Êý¾Ý¿â´íÎó');
    $result=@mysqli_query($conn,$sql)or die('sqlÖ´ÐÐ´íÎó') or die('sqlÖ´ÐÐ´íÎó');
    $num=@mysqli_num_rows($result);
    @mysqli_close($conn);
    if($num==1){
        echo 1;
    }
    else{
    	echo 0;
    }
}
?>
