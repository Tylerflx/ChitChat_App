$(document).ready(function ()
{
    function updateNotes()
    {
        $(".media.conversation").each(function()
        {
            var groupID = $(this).attr("id");

            setInterval(function()
            {
                //getting the group id from the side panel conversations element
                
                //checking if the current groupID is the no the one that is already open
                //reason is, we don't need to update the notifications box in the conversations
                //side panel if the user is currently looking at that chat
                if(sessionStorage.getItem("groupID")!=groupID)
                {
                    //we will store each groupID by its number, this will be the key
                    //the value of this key will be the max msgID number for this chat

                    //if there is no key attributed with this groupID then the
                    //chat has not been opened and all messages are new to this chat

                

                    
                    //getting the client z number
                    var z_no = sessionStorage.getItem("client_z_no");

                    //-1 will get all the messages in that database that 
                    //are assocated with groupID (if key groupID in the session store equates to null)
                    var max_msgID = -1;

                    if(localStorage.getItem(groupID)!=null)
                    {   
                        //this will get the max msgID associated with 
                        //the current groupID
                        //the database will retrieve all messages that are larger
                        //then this number
                        max_msgID = localStorage.getItem(groupID);
                    }
                    

                    var getNewNotes = {
                        'groupID': groupID,
                        'msgID' : max_msgID,
                        'z_no' : z_no
                    };

                    $.ajax({
                        url: 'php/get_notifications.php',
                        method: 'POST',
                        data: getNewNotes,
                        // dateType: 'json',
                        // encode: true

                    })
                    .done(function(data)
                    {   
                        //console.log("\n");
                        //console.log('my data', data);
                        
                        //console.log('=====================');
                        var myObj = JSON.parse(data);


                        //if there were zero rows selected from the query, we know no new messages were added to the DB
                        if(myObj.rows!=0)
                        {
                            if($('#'+groupID).find('.btn.btn-danger').text()== "" )
                            {
                                
                                //need to add new message number to string (data)
                                var new_notification = "<div class='text-right' id='notifications'> <a href='#' class='btn btn-danger'>"+myObj.rows+"</a>  </div>";
                                $('#'+groupID).find('.media-body').append(new_notification);

                                //setting the max message ID for the noteifications to 
                                //this new value
                                localStorage.setItem(groupID, myObj.max_msgID);


                            }
                            else
                            {
                                //here we take the current number of messages and add it to the new number 
                                // of messages
                                var note_number = $('#'+groupID).find('.btn.btn-danger').text();
                                note_number = parseInt(note_number);

                                
                                var new_notes= parseInt(myObj.rows);


                                note_number = note_number+new_notes;

                                //we update the notification box here
                                $('#'+groupID).find('.btn.btn-danger').text(note_number);

                                //setting the max message ID for the noteifications to 
                                //this new value
                                localStorage.setItem(groupID, myObj.max_msgID);

                            }
                        }
                    })
                



                }
            },1500);
        })
    }
    updateNotes();

});