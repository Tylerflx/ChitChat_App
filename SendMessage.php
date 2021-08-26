<?php

    include_once 'php/db_connect.php';
    
    
    session_start();
    /*
    $data = array(
        ':newMessage' => $_POST['newMessage'],
        ':groud_id' =>$_POST['group_id'],
        'z_no' => $_POST['z_no'],
        'dateTime' => $_POST['date'],
        ':msgID' => 1
    );
    */

    //getting the max msgId from the Msgs table
    
    
    

    if( isset($_POST['z_no']))
    {
        
        $z_no = $_POST['z_no'];
        $newMessage = $_POST['newMessage'] ;
        $group_id = $_POST['group_id'];
        $dateTime = $_POST['dateTime'];
        
        //getting the max msgId from the Msgs table
        
        $sql = "SELECT MAX(msgID) from Msgs";
        
        //saving the max msgID
        $result = mysqli_query($db, $sql);

        $row = mysqli_fetch_assoc($result);

        echo "number of rows: " ,$row["MAX(msgID)"];
        //$row = $result->fetch_assoc();

        //echo "max msgID:" ;//.$row['msgID'];

        //incrementing the max message id
        //and saving it as the new message id for the current
        //text message
        
        $msgID = 1 + (int)$row["MAX(msgID)"];
        
        mysqli_free_result($result);

        echo "In the db<br>";
        $sql = "INSERT INTO Msgs (z_no, groupID, msgID, texts, datetime)
        VALUES ('$z_no', '$group_id', '$msgID', '$newMessage', '$dateTime')";
        mysqli_query($db, $sql);
        $db->close();
        
    }
    
/*
    $query ="
        INSERT INTO Msgs
        (z_no, groupID, msgID, texts, datetime)
        VALUES (:z_no, :group_id, :msgID, :newMessage, :dateTime)
    ";
    $staement = $connect->prepare($query);
    $statement->execute();
    if($statement->excute($data));
    */

?>