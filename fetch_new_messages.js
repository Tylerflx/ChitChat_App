 
 /*
   getNewMessages = function()
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
            console.log("trying for new messages...");

            console.log("my data: ", data);
            //converting the json string returned from
            //the backend into
            //something that js can read
            var myObj = JSON.parse(data);

            
            $("#Messages").html(myObj.new_div);

            //open_chat_max 
            //is a variable that will store the maximum 
            //message of the chat the that the user has open
            sessionStorage.setItem("open_chat_max",myObj.max_msgID); })
            
    }
    , 2000);
        
    
    }
    */
