<?php
    include_once 'db_connect.php';
        
    session_start();
    
    if(isset($_POST['z_no']))
    {

        $z_no = $_POST['z_no'];

       

        $sql =
        "UPDATE users
        SET online =0
        WHERE z_no =$z_no;";
        
    
        mysqli_query($db, $sql);


        
        $sql =
        "UPDATE Groups
        SET in_chat =0
        WHERE z_no =$z_no;";

        mysqli_query($db, $sql);

        $db->close();



    }

?>