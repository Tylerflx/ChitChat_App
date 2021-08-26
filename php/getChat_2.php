<?php

    
    include_once 'db_connect.php';
        
    session_start();
    
    if(isset($_POST['z_no']))
    {
        $z_no = $_POST['z_no'];
        $groupID = $_POST['groupID'];
        //need to get the message id from the front end
        
        $sql =
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
        ORDER BY Msgs.datetime ASC
        ;";

        $return_data= $arrayName = array(
            'new_div' => '',
            'max_msgID' => ''
            
        );

        //==================
        $result = mysqli_query($db, $sql);
        
        class div_data{

        }




        $resultCheck = $result->num_rows;
        if($resultCheck>0)
        {   
            while($row = mysqli_fetch_assoc($result))
            {
                $text_msg = $row["texts"];
                $first_name = $row["f_name"];
                $last_name = $row["l_name"];
                $msgID = $row["msgID"];
                $datetime = $row["datetime"];


                
                $new_div=" <div class= \"media msg\" id=\"msgId:$msgID\">
                        <a class=\"pull-left\" href=\"#\">
                            <img class=\"media-object avatar\" data-src=\"holder.js/64x64\" alt=\"64x64\" style=\"width: 32px; height: 32px;\" src=\"images/avatar.png\">
                        </a>
                        <div class=\"media-body\">
                            <small class=\"pull-right time\"><i class=\"fa fa-clock-o\">$datetime</i></small>

                            <h5 class=\"media-heading\">$first_name $last_name</h5>
                            <small class=\"col-lg-10\">$text_msg</small>
                        </div>
                    </div>";

                
                
                
                echo $new_div;
                
            }

            //echo $msgID;
        }
        else if($resultCheck===0){
           // echo "nooo results from the database...";
        }

        /*
            
        */


        $db->close();

    }
    else{
        echo"An error occured when connecting to the Database";
    }

?>