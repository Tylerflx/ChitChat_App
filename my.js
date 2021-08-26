$(document).ready(function () {

    $(window).on("unload", function(e) {
        alert("call");
        console.log("this will be triggered");
    });
    
    $(".default_option_class").click(function () {
    
        var set=1;
        
        $( ".dropdown-class ul " ).slideDown(  );
       // $(".dropdown-class ul").prop("required", true);

       

       $(".dropdown-class ul ").hover(function() 
       {


       
           $(".dropdown-class ul").addClass("active").click(
               function()
               {
                $(".dropdown-class ul").fadeOut(200);
               }
           )
          
           // $( ".dropdown-class ul ").fadeIn( 10000 );

       },
       function()
       {
        
            $(".dropdown-class ul ").fadeOut( 200 );
        
       }
       );
    },
    )

    $(".dropdown-class ul li").click(function () {
        var text = $(this).text();
        $(".default_option_class").text(text);
        $(".dropdown-class ul").removeClass("active");
    });



    /*
    $("html").click(function (e) {

        if(e.target.id != '.dropdown-class ul')
        {
            $(".dropdown-class ul").removeClass("active");
        }
        else{
            var text = $(this).text();
            $(".default_option_class").text(text);
            $(".dropdown-class ul").removeClass("active");

        }

    });
    */
    
    $(".default_option_people").click(function () {

        $(".dropdown-people ul").slideDown();
        $(".dropdown-people ul ").hover(function() 
        {
            $(".dropdown-people ul").addClass("active").click(
                function()
                {
                    $(".dropdown-people ul").fadeOut(200);
                }
            )
            },
            function()
            {
                $(".dropdown-people ul ").fadeOut( 800 );
            });
        


    });

    $(".default_option_name").click(function () {

        $(".dropdown-name ul").slideDown();
        $(".dropdown-name ul ").hover(function() 
        {
            $(".dropdown-name ul").addClass("active").click(
                function()
                {
                    $(".dropdown-name ul").fadeOut(200);
                }
            )
            },
            function()
            {
                $(".dropdown-name ul ").fadeOut( 800 );
            });
        


    });



    $(".dropdown-people ul li").click(function () {
        var text = $(this).text();
        $(".default_option_people").text(text);
        $(".dropdown-people ul").removeClass("active");
    });
    
        $(".default_option_name").click(function () {
        $(".dropdown-name ul").addClass("active");
    });

    $(".dropdown-name ul li").click(function () {
        var text = $(this).text();
        $(".default_option_name").text(text);
        $(".dropdown-name ul").removeClass("active");
    });
});
