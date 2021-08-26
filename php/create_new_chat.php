<?php

    include_once('db_connect.php');
            
    session_start();

    
   

    if(isset($_POST['client_z_no']) && isset($_POST['other_z_no']))
    {

        //stores the z_no number of the already logged in user
        $client_z_no = $_POST['client_z_no'];
        //stores the z_no number of the user 
        //that the client wants to start a conversation with
        $other_z_no = $_POST['other_z_no'];
        
        //echo $client_z_no;
        
        $sql="
        select max(groupID) from groups;
        ";
        

        $result = $db->query($sql) or die($db->error);

        $row = mysqli_fetch_assoc($result);
        $max_groupID = (int)$row["max(groupID)"];
        $max_groupID++;

        $sql ="
        INSERT INTO groups(z_no, groupID)
        VALUES($client_z_no , $max_groupID ),
            ($other_z_no, $max_groupID);
        ";

        //making the new group in the groups table
        $db->query($sql) or die($db->error);

        //send back the newly created groupID to the front end
        echo $max_groupID;
        


    }

?>