<?php
$a = ["a","ap",1];
$b = ["b","alex",2];
$c = ["c","alexander",3];
$d = ["d","alepol",4];
$e = ["e","apo",5];

function addToPlaylist($input){
//read and unserialize file contents
  //$playlist = array();
  if(filesize("../txt/playlist.txt") != 0)
  {
    $playlist = unserialize(file_get_contents("../txt/playlist.txt"));
  }
  $counter = count($playlist);
  $playlist[$counter] = $input;
  $playlistPHP = $playlist;

  $myfile = fopen("../txt/playlist.txt", "w") or die("Unable to open file!");
  fwrite($myfile, serialize($playlist));
  fclose($myfile);

  //echo $playlistPHP[1][0];
  return array_values($playlistPHP);

}

function addToSuggestedPlaylist($input){

  if(filesize("../txt/suggestedPlaylist.txt") != 0)
  {
    $playlist2 = unserialize(file_get_contents("../txt/suggestedPlaylist.txt"));
  }
  $counter2 = count($playlist2);
  $playlist2[$counter2] = $input;
  $playlistPHP2 = $playlist2;

  $myfile2 = fopen("../txt/suggestedPlaylist.txt", "w") or die("Unable to open file!");
  fwrite($myfile2, serialize($playlist2));
  fclose($myfile2);

  //echo $playlistPHP2[1][0];
  return array_values($playlistPHP2);

}

function deleteSong($input,$list){
  if($list == 1){
    $playlist = unserialize(file_get_contents("../txt/playlist.txt"));
    $flag = -1;
    for($i = 0; $i < count($playlist); $i++)
    {
      if($input == $playlist[$i][0])
      {
        $flag = $i;
      }
    }
    if($flag != -1)
    {
      if(count($playlist) > 1)
      {
        for($j = $flag; $j < count($playlist)-1; $j++)
        {
          $playlist[$j] = $playlist[$j+1];
        }
      }
      unset($playlist[count($playlist)-1]);
      $playlistPHP = $playlist;
      $myfile = fopen("../txt/playlist.txt", "w") or die("Unable to open file!");
      fwrite($myfile, serialize($playlist));
      fclose($myfile);
      //echo $playlistPHP[1][0];
      return array_values($playlistPHP);
    }
  }
  else{
    $playlist = unserialize(file_get_contents("../txt/suggestedPlaylist.txt"));
    $flag == -1;
    for($i = 0; $i < count($playlist); $i++)
    {
      if($input == $playlist[$i][0])
      {
        $flag = $i;
      }
    }
    if($flag != -1)
    {
      if(count($playlist > 1))
      {
        for($j = $flag; $j < count($playlist)-1; $j++)
        {
          $playlist[$j] = $playlist[$j+1];
        }
      }
      unset($playlist[count($playlist)-1]);
      $playlistPHP = $playlist;
      $myfile = fopen("../txt/suggestedPlaylist.txt", "w") or die("Unable to open file!");
      fwrite($myfile, serialize($playlist));
      fclose($myfile);
      //echo $playlistPHP[1][0];
      return array_values($playlistPHP);
    }
  }
}

function moveSong($input1,$input2){
  $playlist = unserialize(file_get_contents("../txt/playlist.txt"));
  $flag1;
  $flag2;
  for($i = 0; $i < count($playlist); $i++)
  {
    if($playlist[$i][0] == $input1)
    {
      $flag1 = $i;
    }
    if($playlist[$i][0] == $input2)
    {
      $flag2 = $i;
    }
  }
  $temp = $playlist[$flag2];
  $playlist[$flag2] = $playlist[$flag1];
  if($flag1 > $flag2)
  {
    for($j = $flag1; $j > $flag2 + 1; $j--)
    {
      $playlist[$j] = $playlist[$j-1];
    }
    $playlist[$flag2 + 1] = $temp;
  }
  else{
    for($j = $flag1; $j < $flag2 - 1; $j++)
    {
      $playlist[$j] = $playlist[$j+1];
    }
    $playlist[$flag2 - 1] = $temp;
  }

  $playlistPHP = $playlist;
  $myfile = fopen("../txt/suggestedPlaylist.txt", "w") or die("Unable to open file!");
  fwrite($myfile, serialize($playlist));
  fclose($myfile);
  //echo $playlistPHP[1][0];
  return array_values($playlistPHP);
}

function upVote($input,$list){
  if($list == 1){
    $playlist = unserialize(file_get_contents("../txt/playlist.txt"));
    for($i = 0; $i < count($playlist); $i++)
    {
      if($input == $playlist[$i][0])
      {
        $playlist[$i][7]++;
        break;
      }
    }
    $playlistPHP = $playlist;
    $myfile = fopen("../txt/playlist.txt", "w") or die("Unable to open file!");
    fwrite($myfile, serialize($playlist));
    fclose($myfile);
    //echo $playlistPHP[0][2];
    return array_values($playlistPHP);
  }
  else{
    $playlist = unserialize(file_get_contents("../txt/suggestedPlaylist.txt"));
    for($i = 0; $i < count($playlist); $i++)
    {
      if($input == $playlist[$i][0])
      {
        $playlist[$i][2]++;
        break;
      }
    }
    $playlistPHP = $playlist;
    $myfile = fopen("../txt/suggestedPlaylist.txt", "w") or die("Unable to open file!");
    fwrite($myfile, serialize($playlist));
    fclose($myfile);
    return array_values($playlistPHP);
  }
}

function downVote($input,$list){
  if($list == 1){
    $playlist = unserialize(file_get_contents("../txt/playlist.txt"));
    for($i = 0; $i < count($playlist); $i++)
    {
      if($input == $playlist[$i][0])
      {
        $playlist[$i][7]--;
        break;
      }
    }
    $playlistPHP = $playlist;
    $myfile = fopen("../txt/playlist.txt", "w") or die("Unable to open file!");
    fwrite($myfile, serialize($playlist));
    fclose($myfile);
    //echo $playlistPHP[1][0];
    return array_values($playlistPHP);
  }
  else{
    $playlist = unserialize(file_get_contents("../txt/suggestedPlaylist.txt"));
    for($i = 0; $i < count($playlist); $i++)
    {
      if($input == $playlist[$i][0])
      {
        $playlist[$i][7]--;
        break;
      }
    }
    $playlistPHP = $playlist;
    $myfile = fopen("../txt/suggestedPlaylist.txt", "w") or die("Unable to open file!");
    fwrite($myfile, serialize($playlist));
    fclose($myfile);
    //echo $playlistPHP[1][0];
    return array_values($playlistPHP);
  }
}

function approveSong($input){
  $playlist = unserialize(file_get_contents("../txt/suggestedPlaylist.txt"));
  for($i = 0; $i < count($playlist); $i++)
  {
    if($input == $playlist[$i][0])
    {
      addToPlaylist($playlist[$i]);
      deleteSong($playlist[$i],2);
      break;
    }
  }
}

//addToPlaylist($e);
//addToPlaylist($b);
//addToSuggestedPlaylist($b);
//deleteSong("d",1);
//upVote("a",1);
//approveSong("d");
moveSong("a","c");



// $result = array();
// if( !isset($_POST['functionname']) ){
//     $result['error'] = 'No function name';
//     // file_put_contents("txt/t.txt","No function name");
//  }
// elseif( !isset($_POST['arguments']) ) {
//     $result['error'] = 'No function arguments';
//     // file_put_contents("txt/t.txt","No function arguments!");
//  }
// else{
// switch($_POST['functionname']) {
//         case 'addToPlaylist':
//            if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 1) ) {
//                $result['error'] = 'Error in function arguments';
//               //  file_put_contents("txt/t.txt","Error in function arguments!");
//            }
//            else {
//               $result['output'] = addToPlaylist($_POST['arguments'][0]);
//               // file_put_contents("txt/t.txt",$_POST['functionname']);
//            }
//            break;
//         case 'addToSuggestedPlaylist':
//             if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 1) ) {
//                 $result['error'] = 'Error in function arguments';
//                 //  file_put_contents("txt/t.txt","Error in function arguments!");
//             }
//             else {
//                 $result['output'] = addToSuggestedPlaylist($_POST['arguments'][0]);
//                 // file_put_contents("txt/t.txt",$_POST['functionname']);
//             }
//         case 'deleteSong':
//             if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
//                 $result['error'] = 'Error in function arguments';
//                 //  file_put_contents("txt/t.txt","Error in function arguments!");
//             }
//             else {
//                 $result['output'] = deleteSong($_POST['arguments'][0],$_POST['arguments'][1]);
//                 // file_put_contents("txt/t.txt",$_POST['functionname']);
//             }
//         case 'moveSong':
//             if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
//                 $result['error'] = 'Error in function arguments';
//                 //  file_put_contents("txt/t.txt","Error in function arguments!");
//             }
//             else {
//                 $result['output'] = moveSong($_POST['arguments'][0],$_POST['arguments'][1]);
//                 // file_put_contents("txt/t.txt",$_POST['functionname']);
//             }
//         case 'upVote':
//             if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
//                 $result['error'] = 'Error in function arguments';
//                 //  file_put_contents("txt/t.txt","Error in function arguments!");
//             }
//             else {
//                 $result['output'] = upVote($_POST['arguments'][0],$_POST['arguments'][1]);
//                 // file_put_contents("txt/t.txt",$_POST['functionname']);
//             }
//         case 'downVote':
//             if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
//                 $result['error'] = 'Error in function arguments';
//                 //  file_put_contents("txt/t.txt","Error in function arguments!");
//             }
//             else {
//                 $result['output'] = downVote($_POST['arguments'][0],$_POST['arguments'][1]);
//                 // file_put_contents("txt/t.txt",$_POST['functionname']);
//             }
//         case 'approveSong':
//             if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 1) ) {
//                 $result['error'] = 'Error in function arguments';
//                 //  file_put_contents("txt/t.txt","Error in function arguments!");
//             }
//             else {
//                 $result['output'] = approveSong($_POST['arguments'][0]);
//                 // file_put_contents("txt/t.txt",$_POST['functionname']);
//             }
//             break;
//
//         default:
//           //  file_put_contents("txt/t.txt","Could not match function!");
//            $result['error'] = 'Could not match function';
//            break;
//       }
//   }
//   //show i use a json encoded array? wasnt working for me before...
//   echo json_encode($result);

?>
