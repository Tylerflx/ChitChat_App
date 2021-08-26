<?php

    
    include_once('db_connect.php');
        
    session_start();
    
    if(isset($_POST['groupID']))
    {
        $groupID = $_POST['groupID'];
        $msgID = $_POST['msgID'];
        $z_no = $_POST['z_no'];


        //need to get the message id from the front end
        $sql=
        "SELECT DISTINCT Msgs.z_no, Msgs.groupID, Msgs.msgID, Msgs.texts, Msgs.datetime, Users.f_name, Users.l_name, Users.z_no
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
	    Msgs.msgID>'$msgID'
        ORDER BY Msgs.datetime ASC ;";


        $return_data= $arrayName = array(
            'new_div' => '',
            'max_msgID' => ''
            
        );

        $result = mysqli_query($db, $sql);
        


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

                $year = substr( $datetime,0,4);
                $month = substr($datetime,5,2);
                $day = substr($datetime,8,2);

                $hour = (int)substr($datetime, 11, 2);
                $min = substr($datetime, 14, 2);

                
                if($hour > 12)
                {
                    $hour -= 12;
                    $hour = (string) $hour;
                    $am_pm ="pm";
                }
                else
                {
                    
                    $hour = (string) $hour;
                    $am_pm ="am";
                    
                }

                $time = $hour . ':'.$min. $am_pm;

                $date =  $month . '/' . $day . '/'. $year . ' @ ';

                $datetime = $date . $time;


                $record_z_no = $row["z_no"];


                if($record_z_no==$z_no)
                {
                    $new_div=" <div class= \"media msg\" id=\"msgId:$msgID\">
                            <a class=\"pull-left\" href=\"#\">
                                <img class=\"media-object avatar\" data-src=\"holder.js/64x64\" alt=\"64x64\" style=\"width: 32px; height: 32px;\" src=\"images/avatar.png\">
                            </a>
                            <div class=\"media-body\">
                                <small class=\"pull-right time\"><i class=\"fa fa-clock-o\">$datetime</i></small>

                                <h5 class=\"media-heading\" style='color:gray'>$first_name $last_name</h5>
                                <small class=\"col-lg-10\">$text_msg</small>
                            </div>
                        </div>";
                }
                else
                {
                    $new_div=" <div class= \"media msg\" id=\"msgId:$msgID\">
                            <a class=\"pull-left\" href=\"#\">
                                <img class=\"media-object avatar\" data-src=\"holder.js/64x64\" alt=\"64x64\" style=\"width: 32px; height: 32px;\" src=\"images/avatar.png\">
                            </a>
                            <div class=\"media-body\">
                                <small class=\"pull-right time\"><i class=\"fa fa-clock-o\">$datetime</i></small>

                                <h5 class=\"media-heading\" >$first_name $last_name</h5>
                                <small class=\"col-lg-10\">$text_msg</small>
                            </div>
                        </div>";
                }
                
                
                $return_data['new_div'] .= "\r\n" .$new_div;
                //echo $new_div;
                
            }
            $return_data['max_msgID'] = $msgID;
            
            echo json_encode($return_data);

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