<?php

function generateRandomString($length) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

$pin = $_POST['pin'];

function generatePin(){
  $formId = generateRandomString(15);
  $filename = $formId.".txt";
  $destination = "eventData/".$filename;
  $eventData = fopen($destination, "w");
  fwrite($eventData, $pin);
  fclose($eventData);
}





?>
