




get_dateTime = function()
{
    var dateTime= new Date();
    var date=  dateTime.toISOString().slice(0, 10).replace('T', ' ');

    var seconds = dateTime.getSeconds();
    
    if(seconds<10){
        seconds = '0'+seconds;
    } 
    var time = dateTime.getHours()+":"+dateTime.getMinutes()+":"+seconds;
    dateTime = date +" "+time;
    return dateTime;
}

/*
var chatTextArea = document.getElementById("Send_Message_Box");
chatTextArea.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        //document.getElementById("myBtn").click();

        console.log(myTextArea.value);
        //get_message();
    }
    }); 


    */
get_message = function() 
{
    newMessage = document.getElementById("Send_Message_Box").value;

    /*dateTime = dateTime.toISOString().slice(0, 20).replace('T', ' ');
    dateTime = dateTime.slice(0, 20).replace('T', ' ');*/

    
    
    let dateTime = get_dateTime();

    var z_no = sessionStorage.getItem('client_z_no');

    var group_id =sessionStorage.getItem("groupID");
    
    console.log(dateTime);


    var newMessageJson = {
        'newMessage': newMessage,
        'z_no' : z_no,
        'group_id' : group_id,
        'dateTime' : dateTime,
    };

    /*var date= (dateTime.toISOString()).slice(0,10);
    var time = (dateTime.toISOString()).slice(11,19);
    
    console.log(date);
    console.log(time);
    */
    

    document.getElementById("Send_Message_Box").value = "";

    $.ajax({
            url: 'SendMessage.php',
            method: 'POST',
            data: newMessageJson,
           // dateType: 'json',
           // encode: true

        })
        .done(function(data) {
            //log data to the console so we can see
            console.log("message recieved...");

            //here we will handle errors and validation erros
        })
        ;
};



$(document).ready(function () {
  
    $("#Send_Message_Btn" ).click(function () {

        get_message();
    });
    
    $('#Send_Message_Box').keydown(function (e){
        if(e.keyCode == 13){
            console.log(document.getElementById("Send_Message_Box").value);
            
            //prevents the new line charactetr (\n) being used in the text area
            //when enter is pressed
            e.preventDefault();

            //this function will pass the message to the database
            get_message();

            //
            //document.getElementById("Send_Message_Box").value = "";

            
        }
    });
});