<?php

    include_once 'php/db_connect.php';
    
    session_start();
    
    
    $sql = "SELECT MAX(msgID) from Msgs";
    
    //saving the max msgID
    $result = mysqli_query($db, $sql);

    $row = mysqli_fetch_assoc($result);

    echo "number of rows: " ,$row["MAX(msgID)"];
    //$row = $result->fetch_assoc();
    
    //echo "max msgID:" ;//.$row['msgID'];

    $db->close();
?>