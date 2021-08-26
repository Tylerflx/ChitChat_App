<?php
// Do not change the following two lines.
$teamURL = dirname($_SERVER['PHP_SELF']) . DIRECTORY_SEPARATOR;
$server_root = dirname($_SERVER['PHP_SELF']);

// You will need to require this file on EVERY php file that uses the database.
// Be sure to use $db->close(); at the end of each php file that includes this!

$dbhost = 'localhost';  // Most likely will not need to be changed
$dbname = 'acadoret2018';   // Needs to be changed to your designated table database name
$dbuser = 'acadoret2018';   // Needs to be changed to reflect your LAMP server credentials
$dbpass = 'Zc3HEH3aSy'; // Needs to be changed to reflect your LAMP server credentials

$db = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

if($db->connect_errno > 0) {
    die('Unable to connect to database [' . $db->connect_error . ']');
}
else{
    echo "Connected to Database";
    $groupID = 1;
    $sql= "SELECT * FROM Users WHERE  f_name='Phillip';";

    

    $query = mysqli_query($db,$sql);

    if($query == false )
    {
        echo "\nfalse!";
    }
    else{
        echo "\ntrue";
        #echo $query;
    }
    $db->close();
    
}

