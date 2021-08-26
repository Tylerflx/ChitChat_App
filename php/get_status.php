<?php
    include_once('db_connect.php');
            
    session_start();

    if(isset($_POST['z_no']))
    {
        $z_no = $_POST['z_no'];
        $groupID = $_POST['groupID'];

        
        $sql =
        "SELECT z_no 
        FROM groups
        WHERE z_no != $z_no
        AND groupID=$groupID;";
        

        //getting the other persons z_no from the group
        $result = $db->query($sql) or die($db->error);

        //getting the other user's z-number
        $row = mysqli_fetch_assoc($result);
        $other_user_z_no = (int)$row["z_no"];

        //echo "aye aye";
        //echo $row;

        
        //querying the database for the users online status
        $sql =
        "SELECT online
        FROM users
        WHERE z_no = $other_user_z_no ;";

        $result = $db->query($sql) or die($db->error);
        ////////////////

        //getting the result of the query
        $row = mysqli_fetch_assoc($result);
        $online = (int)$row["online"];

        ////////////



        //getting the in_chat status for the other user

        $sql =
        "SELECT in_chat
        FROM groups
        WHERE z_no = $other_user_z_no
        AND groupID=$groupID ;";

        $result = $db->query($sql) or die($db->error);


        $row = mysqli_fetch_assoc($result);
        $in_chat = (int)$row["in_chat"];
        ////////////////

        $return_data= $arrayName = array(
            'online' => $online,
            'in_chat' => $in_chat
            
        );
        echo json_encode($return_data);

        
    }
    

?>