$(document).ready(function (){

    $('#start_chat_button').click(function()
    {


        var class_name =  $("#class_dropdown").text();

        var type_of_user = $("#type_dropdown").text();

        var person_name =  $("#name_dropdown").text();

        
        if(class_name === "Class")
        {
            alert("Must select a class name...");
        }
        else if (type_of_user === "Type")
        {
            alert("Must select a type...");
        }
        else if(person_name === "Name")
        {
            alert("Must select a type of user...");
        }
        
        else{

            console.log('class: ', class_name);
            console.log('user type:',type_of_user);
            console.log('name: ',person_name);
        }
        

        $("#conv1").on('click', function(){
            console.log("click!!!");
        });


        

        //console.log(class_name,' ',type_of_user,' ',person_name,' ');



    });
   





});