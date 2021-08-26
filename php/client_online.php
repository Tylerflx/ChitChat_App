<?php
    include_once 'db_connect.php';
        
    session_start();
    
    if(isset($_POST['z_no']))
    {

        $z_no = $_POST['z_no'];

       

        $sql =
        "UPDATE users
        SET ONLINE =1
        WHERE z_no =$z_no;";
        
        mysqli_query($db, $sql);

        $db->close();



    }

?>