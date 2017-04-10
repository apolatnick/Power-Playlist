<?php

header('Content-Type: application/json');


$GLOBALS['songArray'] = array();
// $songArray[0] = new song("Hello","Adele","25","Pop",294,"Adele.mp3","mpeg");
// $songArray[1] = new song("Don't Gotta Work It Out","Ftiz and The Tantrums","Picking Up The Pieces","Alternative",250,"Fitz.mp3","mpeg");
// $songArray[2] = new song("The Good Life","Frank Sinatra","N/A","Pop",148,"Frank Sinatra.mp3","mpeg");
// $songArray[3] = new song("It's A Man's World","James Brown","It's A Man's Man's Man's World","Funk",194,"James Brown.mp3","mpeg");
// $songArray[4] = new song("Smooth","Santana","Supernatural","Rock",268,"Santana.mp3","mpeg");

//switch genre and duration and add counter

$songArray[0] = array("Hello","Adele","25",294,"Pop","music/Adele.mp3","mpeg",0);
$songArray[1] = array("Don't Gotta Work It Out","Ftiz and The Tantrums","Picking Up The Pieces",250,"Alternative","music/Fitz.mp3","mpeg",0);
$songArray[2] = array("The Good Life","Frank Sinatra","N/A",148,"Pop","music/Frank Sinatra.mp3","mpeg",0);
$songArray[3] = array("It's A Man's World","James Brown","It's A Man's Man's Man's World",194,"Funk","music/James Brown.mp3","mpeg",0);
$songArray[4] = array("Smooth","Santana","Supernatural",268,"Rock","music/Santana.mp3","mpeg",0);
$songArray[5] = array("Smooth","Other Guy","Other Album",268,"Rock","music/Santana.mp3","mpeg",0);

class song{
	protected $name;
	protected $artist;
	protected $album;
	protected $genre;
	protected $length;
	protected $votes;

	public function __construct($n,$a,$al,$g,$l,$f,$at)
	{
		$this->name = $n;
		$this->artist = $a;
		$this->album = $al;
		$this->genre = $g;
		$this->length = $l;
		$this->votes = 0;
		$this->filename = $f;
		$this->audioType = $at;
	}
	public function setName($n){
		$this->name = $n;
		//temperarily defined
	}
	public function getName(){
		return $this->name;
	}
	public function setArtist($a){
		$this->artist = $a;
		//temperarily defined
	}
	public function getArtist(){
		return $this->artist;
	}
	public function setAlbum($al){
		$this->album = $al;
		//temperarily defined
	}
	public function getAlbum(){
		return $this->album;
	}
	public function setGenre($g){
		$this->genre = $g;
		//temperarily defined
	}
	public function getGenre(){
		return $this->genre;
	}
	public function setLength($l){
		$this->length = $l;
		//temperarily defined
	}
	public function setFilename($f){
		$this->filename = $f;
		//temperarily defined
	}
	public function getFilename(){
		return $this->filename;
	}
	public function setAudioType($at){
		$this->audioType = $at;//temperarily defined
	}
	public function getAudioType(){
		return $this->audioType;
	}
	public function upVote(){
		$this->votes++;
	}
	public function downVote(){
		$this->votes--;
	}
	public function getVotes(){
		return $this->votes;
	}
	public function toCommaString(){

	}
}

/*
class spotifySong extends song{
	//in this class once we recieve the appropriate information, I am think we can just
	//push the new song infor onto the array that we are searching, or does that use to much memory?
	public function setName(){
	}
	public function setArtist(){
	}
	public function setAlbum(){
	}
	public function setGenre(){
	}
	public function setLength(){
	}
}
*/

// function objectToArray($obj)
// {
// 	$arr = array();
//
// 	$arr[0] = $obj->getName();
// 	$arr[1] = $obj->getArtist();
// 	$arr[2] = $obj->getAlbum();
// 	$arr[3] = $obj->getGenre();
// 	$arr[4] = $obj->getLength();
// 	$arr[5] = $obj->getFilename();
// 	$arr[6] = $obj->getAudioType();
//
// 	return $arr;
// }

// function find($input){
// 	$aResult = array();
// 	$count = 0;
// 	$flag = 0;
// 	$test;
// 	for($i = 0; $i < count($GLOBALS['songArray']); $i++)
// 	{
// 		if(strtolower($input) == strtolower($GLOBALS['songArray'][$i]->getName())){
// 			$aResult[$count] = $GLOBALS['songArray'][$i];
// 			$count++;
// 			$flag++;
// 		}
// 		if(strtolower($input) == strtolower($GLOBALS['songArray'][$i]->getArtist())){
// 			if($flag == 0){
// 				$aResult[$count] = $GLOBALS['songArray'][$i];
// 				$count++;
// 				$flag++;
// 			}
// 		}
// 		if(strtolower($input) == strtolower($GLOBALS['songArray'][$i]->getAlbum())){
// 			if($flag == 0){
// 				$aResult[$count] = $GLOBALS['songArray'][$i];
// 				$count++;
// 				$flag++;
// 			}
// 		}
// 		if(strtolower($input) == strtolower($GLOBALS['songArray'][$i]->getGenre())){
// 			if($flag == 0){
// 				$aResult[$count] = $GLOBALS['songArray'][$i];
// 				$count++;
// 				$flag++;
// 			}
// 		}
// 		$flag = 0;
// 	}
// 	return $aResult;
// }


function find($input){
	$aResult = array();
	$count = 0;
	$flag = 0;
	for($i = 0; $i < count($GLOBALS['songArray']); $i++)
	{
		if(strtolower($input) == strtolower($GLOBALS['songArray'][$i][0])){
			$aResult[$count] = $GLOBALS['songArray'][$i];
			$count++;
			$flag++;
		}
		if(strtolower($input) == strtolower($GLOBALS['songArray'][$i][1])){
			if($flag == 0){
				$aResult[$count] = $GLOBALS['songArray'][$i];
				$count++;
				$flag++;
			}
		}
		if(strtolower($input) == strtolower($GLOBALS['songArray'][$i][2])){
			if($flag == 0){
				$aResult[$count] = $GLOBALS['songArray'][$i];
				$count++;
				$flag++;
			}
		}
		if(strtolower($input) == strtolower($GLOBALS['songArray'][$i][3])){
			if($flag == 0){
				$aResult[$count] = $GLOBALS['songArray'][$i];
				$count++;
				$flag++;
			}
		}
		$flag = 0;
	}

	return array_values($aResult);
}



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
				case 'find':
					 if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 1) ) {
							 $result['error'] = 'Error in function arguments';
							//  file_put_contents("txt/t.txt","Error in function arguments!");
					 }
					 else {

							$result['output'] = find($_POST['arguments'][0]);
							// file_put_contents("txt/t.txt",$_POST['functionname']);
					 }
					 break;

				default:
					//  file_put_contents("txt/t.txt","Could not match function!");
					 $result['error'] = 'Could not match function';
					 break;
			}
	}
	//show i use a json encoded array? wasnt working for me before...
	echo json_encode($result);
//fill array with songs


?>
