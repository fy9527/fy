<?php
	 include('conn.php');

	 $username = $_POST['username'];
	 $password = $_POST['password'];
	 $mobile = $_POST['mobile'];
 
	 $sql = "select * from users where username='$username'";
	 // echo $sql;
	 $result = $mysqli->query($sql);
	 // var_dump($result);
	 // echo $result->num_rows;
	 if($result->num_rows>0){
		 die('用户名已存在');
	 }
 
	 $insertSql = "insert into users(username,password,mobile)values('$username','$password','$mobile')";
 
	 $res = $mysqli->query($insertSql);
	 // var_dump($res);
	 if($res){
		 echo '<script>alert("注册成功");location.href="../login.html";</script>';
	 }
 
	 $mysqli->close();  //关闭连接
?>
