
$(document).ready(function (){
    
    //initilizing the obj

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
 
                 
                     console.log("data: ",data);
                 
                     var myObj = JSON.parse(data);
                     //console.log(myObj.new_div);
                     console.log("-----------");
                     console.log(groupID)
 
                     console.log('user online: ',myObj.online);
                     console.log('user in chat: ',myObj.in_chat)
 
                     console.log("-----------");
 
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
                $('#Messages').empty();


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

                })
                    
            }
        );

    }
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
    
    
    function getNewMessages()
    {
         setInterval(function()
         {
             var groupID = sessionStorage.getItem("groupID");
             var msgID = sessionStorage.getItem("open_chat_max");
             
             var getNewMessages = {
                 'groupID': groupID,
                 'msgID' : msgID,
             };
             
             $.ajax({
                 url: 'php/fetch_new_messages.php',
                 method: 'POST',
                 data: getNewMessages,
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
 
                     //$(".msg-wrap").scrollTop($("#mydiv")[0].scrollHeight);
 
 
                 }
             })
         }, 1000)
     }


    var obj = 0;
    $.ajax({
        //dataType: 'json',
        url: 'php/generate_name.php',
        method: 'GET',
    })
    .done(function(data){
        /*After the connection is successful, use the data to parse as text
        to display in name box*/
        //save data to txt
        var txt = data;
        //parse object to txt
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //MADE CHANGE HERE: TOOK AWAY var
        obj = JSON.parse(txt);
        //console.log(obj);

        //display class drop down
        //remove duplicate string of classes in db
        var class_list = [];
        for(var i = 0; i < obj.length; i++){
            class_list.push (obj[i].course_ID);
        }
        let remove_dup_of_class = class_list.reduce((acc,currentValue,index, array) => {
        if(array.indexOf(currentValue)!=index && !acc.includes(currentValue)) acc.push(currentValue);
        return acc;
        }, []);
        //console.log(remove_dup_of_class);
        
        //create type dropdown
        var ClassItems ="";
        ClassItems = "<option value ='' disabled selected >Class</option>";
        //getting type without duplicating items
        
        for (var i = 0; i < remove_dup_of_class.length; i++){
                ClassItems += "<option value='" + remove_dup_of_class[i] + "'>" + remove_dup_of_class[i] + "</option>";
        }
        $("#class_dropdown").html(ClassItems);

        //display types drop down
        //remove duplicate string of types in db
        var item_list = [];
        for(var i = 0; i < obj.length; i++){
            //this is collect all the user type list
            
            console.log(obj[i].user_type);
            item_list.push (obj[i].user_type);
        }
        //filter out the duplicated items
        let duplicate = item_list.reduce((acc,currentValue,index, array) => {
        if(array.indexOf(currentValue)!=index && !acc.includes(currentValue)) acc.push(currentValue);
        return acc;
        }, []);
        //this one
        //console.log(duplicate);
        
        //create type dropdown
        var TypeItems ="";
        TypeItems = "<option value ='' disabled selected >Type</option>";
        //getting type without duplicating items
        
        for (var i = 0; i < duplicate.length; i++){
                TypeItems += "<option value='" + duplicate[i] + "'>" + duplicate[i] + "</option>";
        }
        $("#type_dropdown").html(TypeItems);

        //update selection from class and type function
        //create name drop down
        var updateSelectionBox = function(classes, type){
            //print out for test
            //console.log('update with' + classes + " " + type);
            var Items ="";
            Items = "<option value ='' disabled selected >Name</option>";
            for(var i = 0; i < obj.length; i++){
                if(obj[i].course_ID == classes && obj[i].user_type == type){
                    Items += "<option value='" + obj[i].z_no + "'>" + obj[i].f_name + " " + obj[i].l_name + "</option>";
                }
            }
            $("select#name_dropdown").html(Items);
        }

        //function call when select different options
        //if change on 
        $('select#type_dropdown').on('change', function(){
            var select_Class = $('#class_dropdown option:selected').text();
            var select_Type = $('#type_dropdown option:selected').text();
            if(select_Class !== "Class" || select_Type !== "Type"){
                updateSelectionBox(select_Class, select_Type);
            }

        });
        $('select#class_dropdown').on('change', function(){
            var select_Class = $('#class_dropdown option:selected').text();
            var select_Type = $('#type_dropdown option:selected').text();
            if(select_Class !== "Class" || select_Type !== "Type"){
                updateSelectionBox(select_Class, select_Type);
            }

        });


    })
    .fail(function(error){
        //if the connection failed, print "bad" to the console
        console.log('Bad');
    });


    $('#start_chat_button').click(function(){
        /*After select class, type and name click on start chat button
        will verify the selections and will create new chat box*/
        var classes = $('#class_dropdown option:selected').text();
        
        if(classes === "Class"){
            alert("Must select a Class");
        }
        //create var to store people
        //alert if not selected
        var type = $('#type_dropdown option:selected').text();
        
        if(type === "Type"){
            alert("Must select a Type");
        }
        // create var to store name
        var name = $("select#name_dropdown option:selected").text();
        
        //alert if not selected
        if(name === "Name"){
            alert("Must select a Name")
        }

        //this is when all drop down menus are properly selected
        if (classes !== "Class" && type !== "Type" && name !=="Name"){
            //if all three has been selected
            //do something
            //console.log(classes + "\n" + type +"\n" + name);

            var first_name = null;
            var other_z_no = null;
            var last_name = null;
            for(var i = 0; i < obj.length; i++){
                var full_name = obj[i].f_name +" "+ obj[i].l_name;
                if (full_name == name){
                    //just need z_no
                    //first_name = obj[i].f_name;
                    other_z_no = obj[i].z_no;
                    //last_name = obj[i].l_name;
                }

            }
            
            //stores the z_no of the currently logged in user
            var client_z_no =sessionStorage.getItem("client_z_no");

            console.log(client_z_no);
            
            var createNewGroup = {
                'client_z_no': client_z_no,
                'other_z_no' : other_z_no,
            };

            $.ajax({
                //dataType: 'json',
                url: 'php/create_new_chat.php',
                method: 'POST',
                data: createNewGroup,
            }).done(function(data)
            {
                
                console.log("my data:");
                console.log(data);  
                var new_groupID = data;
                
                //get group id from the data base 
                //update <div> attribute "id"
                var newConvo = `<div class='media conversation' id='`+ new_groupID +`' href='#'>
                    <a class='pull-left' href='#'>
                        <img class='media-object avatar' data-src='holder.js/64x64' alt="64x64" style='width: 50px; height: 50px;' src='images/avatar.png'>
                    </a>
                    <div class='media-body ' >
                        
                    <div id="status" class="unknown_status"></div>
                        <h5 class='media-heading' >` + name + `</h5>
                                            
                    </div>
                </div>`


                $(".conversation-wrap.col-lg-3").append(newConvo);
                getStatus()
                open_conversation();
                hoverOver();
                getNewMessages();
                updateNotes();
            
            })
            .fail(function(error){
                //if the connection failed, print "bad" to the console
                console.log('an error occured...');
            });
            

        }
        


    });
    

});