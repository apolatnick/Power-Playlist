<?php
// $a = ["a","ap",1];
// $b = ["b","alex",2];
// $c = ["c","alexander",3];
// $d = ["d","alepol",4];
// $e = ["e","apo",5];

function updatePlaylists($list,$id){
  if($list == 1){
    if(filesize("../eventData/playlist.txt") != 0)
    {
      $playlist = unserialize(file_get_contents("../eventData/playlist.txt"));
    }
    else{
      $playlist = array();
    }
    if($id!=-1) {
      for($i = 0; $i < count($playlist); $i++)
      {
        if($playlist[$i][9] == 1)
        {
          $playlist[$i][9] = 0;
        }
      }
      for($i = 0; $i < count($playlist); $i++)
      {
        file_put_contents("../txt/t.txt",$id);
        if($id == $playlist[$i][8])
        {
          file_put_contents("../txt/debug.txt","hi");
          $playlist[$i][9] = 1;
          break;
        }
      }
    }
    $myfile = fopen("../eventData/playlist.txt", "w") or die("Unable to open file!");
    fwrite($myfile, serialize($playlist));
    fclose($myfile);
    return array_values($playlist);
  }
  else{
    if(filesize("../eventData/suggestedPlaylist.txt") != 0)
    {
      $playlist = unserialize(file_get_contents("../eventData/suggestedPlaylist.txt"));
    }
    else{
      $playlist = array();
    }
    return array_values($playlist);
  }
}

function addToPlaylist($input){
//read and unserialize file contents
  //$playlist = array();
  if(filesize("../eventData/playlist.txt") != 0)
  {
    $playlist = unserialize(file_get_contents("../eventData/playlist.txt"));
  }
  else{
    $playlist = array();
  }
  $counter = count($playlist);
  $playlist[$counter] = $input;
  $playlist[$counter][8] = uniqid();
  $playlistPHP = $playlist;

  $myfile = fopen("../eventData/playlist.txt", "w") or die("Unable to open file!");
  fwrite($myfile, serialize($playlist));
  fclose($myfile);

  //echo $playlistPHP[1][0];
  return array_values($playlistPHP);

}

function addToSuggestedPlaylist($input){

  if(filesize("../eventData/suggestedPlaylist.txt") != 0)
  {
    $playlist2 = unserialize(file_get_contents("../eventData/suggestedPlaylist.txt"));
  }
  else{
    $playlist2 = array();
  }
  $counter2 = count($playlist2);
  $playlist2[$counter2] = $input;
  $playlist2[$counter2][8] = uniqid();
  $playlistPHP2 = $playlist2;

  $myfile2 = fopen("../eventData/suggestedPlaylist.txt", "w") or die("Unable to open file!");
  fwrite($myfile2, serialize($playlist2));
  fclose($myfile2);

  //echo $playlistPHP2[1][0];
  return array_values($playlistPHP2);

}

function deleteSong($input,$list){
  if($list == 1){
    $playlist = unserialize(file_get_contents("../eventData/playlist.txt"));
    $flag = -1;
    for($i = 0; $i < count($playlist); $i++)
    {
      if($input == $playlist[$i][8])
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
      $myfile = fopen("../eventData/playlist.txt", "w") or die("Unable to open file!");
      fwrite($myfile, serialize($playlist));
      fclose($myfile);
      //echo $playlistPHP[1][0];
      //return array_values($playlistPHP);
      //file_put_contents("../txt/t.txt",array_values($playlistPHP[0]));
      //file_put_contents("scratch2.txt", json_encode(array_values($playlistPHP)));

      return array_values($playlistPHP);
    }
  }
  else{
    $playlist = unserialize(file_get_contents("../eventData/suggestedPlaylist.txt"));
    $flag == -1;
    for($i = 0; $i < count($playlist); $i++)
    {
      if($input == $playlist[$i][8])
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
      $myfile = fopen("../eventData/suggestedPlaylist.txt", "w") or die("Unable to open file!");
      fwrite($myfile, serialize($playlist));
      fclose($myfile);
      //echo $playlistPHP[1][0];
      return array_values($playlistPHP);
    }
  }
}

function moveSong($input1,$input2){
  $playlist = unserialize(file_get_contents("../eventData/playlist.txt"));
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
  $myfile = fopen("../eventData/suggestedPlaylist.txt", "w") or die("Unable to open file!");
  fwrite($myfile, serialize($playlist));
  fclose($myfile);
  //echo $playlistPHP[1][0];
  return array_values($playlistPHP);
}

function upVote($input,$list){
  if($list == 1){
    $playlist = unserialize(file_get_contents("../eventData/playlist.txt"));
    for($i = 0; $i < count($playlist); $i++)
    {
      if($input == $playlist[$i][8])
      {
        $playlist[$i][7]++;
        break;
      }
    }
    $playlistPHP = $playlist;
    $myfile = fopen("../eventData/playlist.txt", "w") or die("Unable to open file!");
    fwrite($myfile, serialize($playlist));
    fclose($myfile);
    //echo $playlistPHP[0][2];
    return array_values($playlistPHP);
  }
  else{
    $playlist = unserialize(file_get_contents("../eventData/suggestedPlaylist.txt"));
    for($i = 0; $i < count($playlist); $i++)
    {
      if($input == $playlist[$i][8])
      {
        $playlist[$i][7]++;
        break;
      }
    }
    $playlistPHP = $playlist;
    $myfile = fopen("../eventData/suggestedPlaylist.txt", "w") or die("Unable to open file!");
    fwrite($myfile, serialize($playlist));
    fclose($myfile);
    return array_values($playlistPHP);
  }
}

function downVote($input,$list){
  if($list == 1){
    $playlist = unserialize(file_get_contents("../eventData/playlist.txt"));
    for($i = 0; $i < count($playlist); $i++)
    {
      if($input == $playlist[$i][8])
      {
        $playlist[$i][7]--;
        break;
      }
    }
    $playlistPHP = $playlist;
    $myfile = fopen("../eventData/playlist.txt", "w") or die("Unable to open file!");
    fwrite($myfile, serialize($playlist));
    fclose($myfile);
    //echo $playlistPHP[1][0];
    return array_values($playlistPHP);
  }
  else{
    $playlist = unserialize(file_get_contents("../eventData/suggestedPlaylist.txt"));
    for($i = 0; $i < count($playlist); $i++)
    {
      if($input == $playlist[$i][8])
      {
        $playlist[$i][7]--;
        break;
      }
    }
    $playlistPHP = $playlist;
    $myfile = fopen("../eventData/suggestedPlaylist.txt", "w") or die("Unable to open file!");
    fwrite($myfile, serialize($playlist));
    fclose($myfile);
    //echo $playlistPHP[1][0];
    return array_values($playlistPHP);
  }
}

// function approveSong($input){
//   $playlist = unserialize(file_get_contents("../eventData/suggestedPlaylist.txt"));
//   for($i = 0; $i < count($playlist); $i++)
//   {
//     if($input == $playlist[$i][0])
//     {
//       deleteSong($playlist[$i],2);
//       addToPlaylist($playlist[$i]);
//       break;
//     }
//   }
// }


function approveSong($input){
  $playlist = unserialize(file_get_contents("../eventData/suggestedPlaylist.txt"));
  $savedArray;
  $flag == -1;
  for($j = 0; $j < count($playlist); $j++)
  {
    if($input == $playlist[$j][8])
    {
      $savedArray = $playlist[$j];
      $flag = $j;
      break;
    }
  }
  if($flag != -1)
  {
    if(count($playlist > 1))
    {
      for($k = $flag; $k < count($playlist)-1; $k++)
      {
        $playlist[$k] = $playlist[$k+1];
      }
    }
    unset($playlist[count($playlist)-1]);
    $playlistPHP = $playlist;
    $myfile = fopen("../eventData/suggestedPlaylist.txt", "w") or die("Unable to open file!");
    fwrite($myfile, serialize($playlist));
    fclose($myfile);



      file_put_contents("test_file.txt","inside if");
      if(filesize("../eventData/playlist.txt") != 0)
      {
        $playlist2 = unserialize(file_get_contents("../eventData/playlist.txt"));
      }
      else{
        $playlist2 = array();
      }
      $counter = count($playlist2);
      $playlist2[$counter] = $savedArray;
      //file_put_contents("test_file.txt",$playlist2[$counter]);
      //$playlistPHP = $playlist2;

      $myfile = fopen("../eventData/playlist.txt", "w") or die("Unable to open file!");
      fwrite($myfile, serialize($playlist2));
      fclose($myfile);
    //$playlist = unserialize(file_get_contents("../eventData/suggestedPlaylist.txt"));

  }
}

//addToPlaylist($e);
//addToPlaylist($b);
//addToSuggestedPlaylist($b);
//deleteSong("d",1);
//upVote("a",1);
//approveSong("d");
//moveSong("a","c");

$result = array();
if( !isset($_POST['functionname']) ){
    $result['error'] = 'No function name';
    // file_put_contents("txt/t.txt","No function name");
 }
elseif( !isset($_POST['arguments']) ) {
    $result['error'] = 'No function arguments';
    // file_put_contents("txt/t.txt","No function arguments!");
 }
else{
switch($_POST['functionname']) {
        case 'updatePlaylists':
          if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
              $result['error'] = 'Error in function arguments';
              //  file_put_contents("txt/t.txt","Error in function arguments!");
            }
            else {
              $result['output'] = updatePlaylists($_POST['arguments'][0],$_POST['arguments'][1]);
              // file_put_contents("txt/t.txt",$_POST['functionname']);
            }
            break;
        case 'addToPlaylist':
           if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 1) ) {
               $result['error'] = 'Error in function arguments';
              //  file_put_contents("txt/t.txt","Error in function arguments!");
           }
           else {
              $result['output'] = addToPlaylist($_POST['arguments'][0]);
              // file_put_contents("txt/t.txt",$_POST['functionname']);
           }
           break;
        case 'addToSuggestedPlaylist':
            if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 1) ) {
                $result['error'] = 'Error in function arguments';
                //  file_put_contents("txt/t.txt","Error in function arguments!");
            }
            else {
                $result['output'] = addToSuggestedPlaylist($_POST['arguments'][0]);
                // file_put_contents("txt/t.txt",$_POST['functionname']);
            }
            break;
        case 'deleteSong':
            if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
                $result['error'] = 'Error in function arguments';
                //  file_put_contents("txt/t.txt","Error in function arguments!");
            }
            else {
                $result['output'] = deleteSong($_POST['arguments'][0],$_POST['arguments'][1]);
                //file_put_contents("scratch3.txt", json_encode($result));
                //file_put_contents("../txt/t.txt",$result['output']);
                // file_put_contents("txt/t.txt",$_POST['functionname']);
            }
            break;
        case 'moveSong':
            if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
                $result['error'] = 'Error in function arguments';
                //  file_put_contents("txt/t.txt","Error in function arguments!");
            }
            else {
                $result['output'] = moveSong($_POST['arguments'][0],$_POST['arguments'][1]);
                // file_put_contents("txt/t.txt",$_POST['functionname']);
            }
            break;
        case 'upVote':
            if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
                $result['error'] = 'Error in function arguments';
                //  file_put_contents("txt/t.txt","Error in function arguments!");
            }
            else {
                $result['output'] = upVote($_POST['arguments'][0],$_POST['arguments'][1]);
                // file_put_contents("txt/t.txt",$_POST['functionname']);
            }
            break;
        case 'downVote':
            if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
                $result['error'] = 'Error in function arguments';
                //  file_put_contents("txt/t.txt","Error in function arguments!");
            }
            else {
                $result['output'] = downVote($_POST['arguments'][0],$_POST['arguments'][1]);
                // file_put_contents("txt/t.txt",$_POST['functionname']);
            }
            break;
        case 'approveSong':
            if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 1) ) {
                $result['error'] = 'Error in function arguments';
                //  file_put_contents("txt/t.txt","Error in function arguments!");
            }
            else {
                $result['output'] = approveSong($_POST['arguments'][0]);
                // file_put_contents("txt/t.txt",$_POST['functionname']);
            }
            break;

        default:
          //  file_put_contents("txt/t.txt","Could not match function!");
           $result['error'] = 'Could not match function';
           break;
      }
  }
  //file_put_contents("scratch.txt", json_encode($result));
  echo json_encode($result);

?>
