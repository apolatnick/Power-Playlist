<?php

header('Content-Type: application/json');//what would this do?
$pin = $_POST['pinEntry'];
//$nameOfFile = "eventData/". $key . ".txt"; not implementing the key yet
function pinAuthentication($pin){
  $filename = "txt/debug.txt";
  file_put_contents ($filename , $pin);
  $nameOfFile = "eventData/data.txt";
  $userFile = fopen($nameOfFile,"r") or die ("Error, file could not be opened or does not exist");
  $contents = fread($userFile, filesize($nameOfFile));
  $isCorrect = false;
  if($contents == $pin)
  {
    file_put_contents ($filename , "Correct Pin");
    $isCorrect = true;
  } else {
      file_put_contents ($filename , "Incorrect Pin");
  }
  fclose($userFile);
  return $isCorrect;
}

//$key = $_POST['key']; //how do I get this?
//var key = $("meta[name=key]").attr("content"); in javascript?

  $result = array();
  if( !isset($_POST['functionname']) ){
      $result['error'] = 'No function name';
      file_put_contents("txt/test.txt","No function name");
   }
  elseif( !isset($_POST['arguments']) ) {
      $result['error'] = 'No function arguments';
      file_put_contents("txt/test.txt","No function arguments!");
   }
  else{
      switch($_POST['functionname']) {
          case 'pinAuthentication':
             if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 1) ) {
                 $result['error'] = 'Error in function arguments';
                 file_put_contents("txt/test.txt","Error in function arguments!");
             }
             else {
                file_put_contents("txt/test.txt","Function called in PHP");
                $result['output'] = pinAuthentication(floatval($_POST['arguments'][0]));
             }
             break;

          default:
             file_put_contents("txt/test.txt","Could not match function!");
             $result['error'] = 'Could not match function';
             break;
        }
    }
    //show i use a json encoded array? wasnt working for me before...
    echo json_encode($result);
?>
