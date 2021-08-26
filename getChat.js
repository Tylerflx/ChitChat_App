$(document).ready(function ()
{
    
    //checks if the user is online and is view a particular chat
    //this function gets new messages from the currently open chat
    function getStatus()
   {
    $(".media.conversation").each(function()
    {
        var groupID = $(this).attr("id");

        setInterval(function()
        {
            var z_no = sessionStorage.getItem("client_z_no");
            
            var getStatus = {
                'groupID': groupID,
                'z_no' : z_no,
            };
            
            $.ajax({
                url: 'php/get_status.php',
                method: 'POST',
                data: getStatus,
                // dateType: 'json',
                // encode: true

            })
            .done(function(data) {
                //appending the data (a <div> message) to the Messages window
                //console.log("trying for new messages...");
                //console.log("my data: ", data);
                //converting the json string returned from
                //the backend into
                //something that js can read
                if(data!="")
                {   

                
                    //console.log("data: ",data);
                
                    var myObj = JSON.parse(data);
                    //console.log(myObj.new_div);
                    /*console.log("-----------");
                    console.log(groupID)

                    console.log('user online: ',myObj.online);
                    console.log('user in chat: ',myObj.in_chat)

                    console.log("-----------");*/

                    if(myObj.online==1 && myObj.in_chat==1)
                    {
                        $('#'+groupID).find('#status').css("background-color", "#0275d8")
                    }
                    else if(myObj.online==1 && myObj.in_chat==0)
                    {
                        $('#'+groupID).find('#status').css("background-color", "#5cb85c")

                    }
                    else if(myObj.online==0)
                    {
                        $('#'+groupID).find('#status').css("background-color", "#d9534f ");

                    }



                }
            })
        }, 1000)


    });


//////
    }

   
    getStatus();


   

    //Populates the messages with chat selected
    function open_conversation()
    {  
        $(".conversation.media").click(function()
            {

                //this removes the notifications box if it lies within the container
                //$('.media-body').find('#notifications').remove();
                
                //getting the id of group chat
                var groupID = this.id;

                $('#'+groupID).find('#notifications').remove();
                
            //checks if the current chat is already opened in the
                //messanger view
                //if(sessionStorage.getItem("groupID")!= groupID)
                
                //saves the currently loaded id to the session storage
                //this signifies that the current chat is alrady opened within the messanger view
                sessionStorage.setItem('groupID',groupID);

                console.log("this the group id: ",sessionStorage.getItem('groupID') );
                //clears all the messages from the messages box
                $('.media.msg').empty();

                //gets the z_number of the user
                var z_no = sessionStorage.getItem('client_z_no');

                //constructing the JSON message to get the conversation between the users from the database
                var getChatJson = {
                    'groupID': groupID,
                    'z_no' : z_no,
                };

                $.ajax({
                    url: 'php/getChat_3.php',
                    method: 'POST',
                    data: getChatJson,
                    // dateType: 'json',
                    // encode: true
        
                })
                .done(function(data) {
                    //appending the data (a <div> message) to the Messages window
                    
                    //converting the json string returned from
                    //the backend into
                    //something that js can read
                    console.log('returned string' , data);
                    var myObj = JSON.parse(data);
                    $("#Messages").html(myObj.new_div);

                    //open_chat_max 
                    //is a variable that will store the maximum 
                    //message of the chat the that the user has open
                    sessionStorage.setItem("open_chat_max",myObj.max_msgID);
                    this.id;

                    
                    //this function (from fetch_new_messages.js)
                    //will continously call the backend every 2 seconds
                    //and add new messages to the messages box 
                    
                    $("#Messages").scrollTop(9999999999); 

                })
                    
            }
        );

    }
                
            
    //getNewMessages();
        


    //this event listner will highlight a chat 
    //when mouse is hovered over it
    function hoverOver()
    {
        $(".conversation.media").hover( function(){
            $(this).css('background-color', '#D3D3D3');

        },
        function()
        {
            
            $(this).css('background-color','white');
        });

    }
    


    
    //this function gets new messages from the currently open chat
    function getNewMessages()
   {
        setInterval(function()
        {
            var groupID = sessionStorage.getItem("groupID");
            var msgID = sessionStorage.getItem("open_chat_max");
            var z_no = sessionStorage.getItem("client_z_no");
            
            var getNewMessages = {
                'groupID': groupID,
                'msgID' : msgID,
                'z_no' :z_no
            };
            
            $.ajax({
                url: 'php/fetch_new_messages.php',
                method: 'POST',
                data: getNewMessages,
                asunch:false
                // dateType: 'json',
                // encode: true

            })
            .done(function(data) {
                //appending the data (a <div> message) to the Messages window
                //console.log("trying for new messages...");
                //console.log("my data: ", data);
                //converting the json string returned from
                //the backend into
                //something that js can read
                if(data!="")
                {   

                
                
                    var myObj = JSON.parse(data);
                    //console.log(myObj.new_div);
                    


                    //$('#Messages').prepend(myObj.new_div);


                    

                    $('#Messages').append( myObj.new_div );


                    //open_chat_max 
                    //is a variable that will store the maximum 
                    //message of the chat the that the user has open
                    sessionStorage.setItem("open_chat_max",myObj.max_msgID); 

                    localStorage.setItem(sessionStorage.getItem("groupID"),myObj.max_msgID); 
                    $("#Messages").scrollTop(9999999999); 

                    //$(".msg-wrap").scrollTop($("#mydiv")[0].scrollHeight);


                }
            })
        }, 1000)
    }
    
    open_conversation();
    hoverOver();
    getNewMessages();
});
