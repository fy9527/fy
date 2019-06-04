<?php
    include('conn.php');
    $username = $_REQUEST['username'];
    $password = $_REQUEST['password'];

    $sql = "select * from users where username='$username' and password='$password'";

    
    $result = $mysqli->query($sql);
    if($result->num_rows>0){
        echo "登录成功";
    
    }else{
        echo "登录失败";
    }
?>