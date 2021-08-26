$(document).ready(function (){
     //need to generically set z_no for the user 
    //when they log in 

    var z_no = 10;
    sessionStorage.setItem('client_z_no',z_no);
    sessionStorage.setItem('groupID','');
    var setStatus = {
        
        'z_no' : z_no,
    };


    //this function is called when the user exits the session
    //the attributes that signify that the user is logged in and viewing
    //chat are set to 0

    $(window).on('unload', function() {
        // async: false will make the AJAX synchronous in case you're using jQuery
        $.ajax({
            url: 'php/client_offline.php',
            method: 'POST',
            data: setStatus,
            async: false
            // dateType: 'json',
            // encode: true
    
        })
        .done(function(data) {
            console.log('user status:');
            console.log(data);
    
    }); });

    /*
    window.addEventListener("beforeunload", function (e) {
      
        
        $.ajax({
            url: 'php/client_offline.php',
            method: 'POST',
            data: setStatus,
            async: false
            // dateType: 'json',
            // encode: true
    
        })
        .done(function(data) {
            console.log('user status:');
            console.log(data);
    
        })

        

        
        (e || window.event).returnValue = null;

        return null;
      });
      */

    /*
    $(window).on("beforeunload", function() { 
 
        

        $.ajax({
            url: 'php/client_offline.php',
            method: 'POST',
            data: setStatus,
            // dateType: 'json',
            // encode: true
    
        })
        .done(function(data) {
            console.log('user status:');
            console.log(data);
    
        })

        return 'leaving site!';
        


    });

    */
    //////////
    $.ajax({
        url: 'php/client_online.php',
        method: 'POST',
        data: setStatus,
        // dateType: 'json',
        // encode: true

    })
    .done(function(data) {
        //appending the data (a <div> message) to the Messages window
        
        //converting the json string returned from
        //the backend into
        //something that js can read
        

        console.log(data)

        //open_chat_max 
        //is a variable that will store the maximum 
        //message of the chat the that the user has open
        

        
        //this function (from fetch_new_messages.js)
        //will continously call the backend every 2 seconds
        //and add new messages to the messages box 

    })


    //console.log(sessionStorage.getItem('client_z_no'))
});