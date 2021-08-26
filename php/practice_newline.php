<?php
  $myArray = array(
    'foo' => 'big',
    'bar' => 'Small'
    
);
    $myArray['foo'] .=  "\r\n" . $myArray['bar'] ;
    echo $myArray['foo'];

?>