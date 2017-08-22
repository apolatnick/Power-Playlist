<?php

// error_reporting(-1);
// ini_set('display_errors', 'On');
// set_error_handler("var_dump");

header('Content-Type: application/json');//what would this do?
//$pin = $_POST['pinEntry'];
//$nameOfFile = "eventData/". $key . ".txt"; not implementing the key yet
function sendEmail($name,$email,$location,$descrption){
  //get PIN for party (you will need to switch this once we are dealing with multiple parties and data files)
  $nameOfFile = "../eventData/pin.txt";
  $userFile = fopen($nameOfFile,"r") or die ("Error, file could not be opened or does not exist");
  $pin = fread($userFile, filesize($nameOfFile));
  fclose($userFile);

  //send email functionality
  $subject = "PowerPlaylist Event Invitation";
  $header = "From: no-reply@PowerPlaylist.com";
  $msg = "Dear ".$name.",\n You have been invited to a PowerPlaylist event at ".$location.". The PIN you will need to participate in the party is ".$pin.". Go to www.PowerPlaylist.com to enter the party! See any additional comments from your host below. \n".$description;
  $mail = mail($email, $subject, $msg, $header);
  if($mail)
  {
  	//echo "email sent successfully to ".$email;
    echo $msg;
  }
  else
  {
  	echo "email failed to send";
  }
}


// $name = "Alex";
// $email = "apsfds@gmail.com";
// $location = "1526 Cole Street";
// $description = "Hey come on over to my birthday party!";
//
// sendEmail($name,$email,$location,$description);


  file_put_contents("../txt/debug.txt","In PHP");
  $result = array();
  if( !isset($_POST['functionname']) ){
      $result['error'] = 'No function name';
      file_put_contents("../txt/test.txt","No function name");
   }
  elseif( !isset($_POST['arguments']) ) {
      $result['error'] = 'No function arguments';
      file_put_contents("../txt/test.txt","No function arguments!");
   }
  else{
      switch($_POST['functionname']) {
          case 'sendEmail':
             if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 4) ) {
                 $result['error'] = 'Error in function arguments';
                 file_put_contents("../txt/test.txt","Error in function arguments!");
             }
             else {
                file_put_contents("txt/test.txt","Function called in PHP");
                $result['output'] = sendEmail($_POST['arguments'][0],$_POST['arguments'][1],$_POST['arguments'][2],$_POST['arguments'][3]);
             }
             break;

          default:
             file_put_contents("../txt/test.txt","Could not match function!");
             $result['error'] = 'Could not match function';
             break;
        }
    }
    echo json_encode($result);
?>
