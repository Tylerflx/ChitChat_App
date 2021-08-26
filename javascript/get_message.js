$(document).ready(function () {
  
    $("#Send_Message_Btn" ).click(function () {

        newMessage = document.getElementById("Send_Message_Box").value;

        var dateTime = new Date();
        dateTime = dateTime.toISOString().slice(0, 19).replace('T', ' ')
        var z_no = 1;
        var group_id =1;

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

        console.log(newMessage);
        console.log(dateTime);

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
                console.log("ayyyeyeye");

                //here we will handle errors and validation erros
                                })
    });
});