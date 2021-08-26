<?php

    include_once 'db_connect.php';
        
    session_start();

   


    if(isset($_POST['z_no']))
    {
        $z_no = $_POST['z_no'];
        $groupID = $_POST['groupID'];
        $msgID = $_POST["msgID"];

        
        //selecting all the messages that are greater than $msgID(max msgID) and
        //are not associated with the users z_no
        $sql=
        "SELECT DISTINCT Msgs.z_no, Msgs.groupID, Msgs.msgID, Msgs.texts, Msgs.datetime, Users.f_name, Users.l_name
        FROM Msgs, Users, Groups
        WHERE
        Groups.groupID = Msgs.groupID
        AND
        Users.z_no = Groups.z_no
        AND
        Msgs.z_no = Groups.z_no
        AND
        Groups.groupID='$groupID'
        AND
        Msgs.z_no != '$z_no'
	    AND 
	    Msgs.msgID>'$msgID'
        ORDER BY Msgs.datetime ASC ;";


        $return_data= $arrayName = array(
            'rows' => '',
            'max_msgID' => ''
            
        );
        $result = mysqli_query($db, $sql);

        
        $num_rows = mysqli_num_rows($result);

        $return_data['rows']=$num_rows;


        $sql=
        "SELECT MAX(msgID)
        FROM Msgs
        WHERE groupID='$groupID';";
        
        
        $result = mysqli_query($db, $sql);

        $row = mysqli_fetch_assoc($result);

        $return_data['max_msgID']=$row['MAX(msgID)'];


        echo json_encode($return_data);
        
        $db->close();

    }
    else{
        //echos an empty string if
        echo "";
    }
    

?>