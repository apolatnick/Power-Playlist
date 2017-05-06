var baseurl = "http://172.21.123.107:80/~apolatnick/Power-Playlist10/master/php/playlistManager.php";
var selectId = 0;

function onLoad(){
	update();
	setInterval(update, 10000);
}

function generatePlaylist(ar)
{
	//$(".example").empty();
	//alert($("#name").textContent);
	for(var it = 0; it < ar.length; it++)
	{
		// if(ar[it][1] == $("#name").textContent)
		// {
		// 	$(".example").append('<li class="searchList evenSong selected" id='+ar[it][8]+' data-ogg='+ar[it][5]+'>'+ar[it][0]+'<img src="images/upVote.png" class="upVote" onclick="upVotePlaylist(event)"><img src="images/downVote.png" class="downvote" onclick="downVotePlaylist(event)"><p class="counter">'+ar[it][7]+'</p><img src="images/Remove.png" class="deleteSong" onclick="removeSong(event)"><br /><p class="artist">'+ar[it][1]+'</p></li>');
		// }
		//else{
		if(ar[it][8] == selectId)
		{
			$(".example").append('<li class="searchList evenSong selected" id='+ar[it][8]+' data-ogg='+ar[it][5]+'>'+ar[it][0]+'<img src="images/upVote.png" class="upVote" onclick="upVotePlaylist(event)"><img src="images/downVote.png" class="downvote" onclick="downVotePlaylist(event)"><p class="counter">'+ar[it][7]+'</p><img src="images/Remove.png" class="deleteSong" onclick="removeSong(event)"><br /><p class="artist">'+ar[it][1]+'</p></li>');
		}
		else{
			$(".example").append('<li class="searchList evenSong" id='+ar[it][8]+' data-ogg='+ar[it][5]+'>'+ar[it][0]+'<img src="images/upVote.png" class="upVote" onclick="upVotePlaylist(event)"><img src="images/downVote.png" class="downvote" onclick="downVotePlaylist(event)"><p class="counter">'+ar[it][7]+'</p><img src="images/Remove.png" class="deleteSong" onclick="removeSong(event)"><br /><p class="artist">'+ar[it][1]+'</p></li>');
		}
		$(".evenSong:even").css("background", "#333333");

		//}
	}
}

function generateSuggestedPlaylist(ar)
{
	//$(".example").empty();
	//$("#dropdown").empty();
	for(var it = 0; it < ar.length; it++)
	{
		$(".suggestedExample").append('<li id='+ar[it][8]+'><img src="images/addSong.png" class="addButton" onclick="appSong(event)"><img src="images/rejectSong.png" class="rejectButton" onclick="rejectSong(event)">'+ar[it][0]+'<img src="images/upVote.png" class="upVote" onclick="upVoteSuggList(event)"><img src="images/downVote.png" class="downvote" onclick="downVoteSuggList(event)"><p class="counter">'+ar[it][7]+'</p><br /><p class="artist">'+ar[it][1]+'</p></li>');
	}
}

function update()
{
	//alert($('.example li').length);
	for(var i = 0; i < $('.example li').length; i++)
	{
		//alert($('.example li')[i]);
		//alert($('.example li')[i].className);
		if($('.example li')[i].className == 'searchList evenSong selected')
		{
			//alert($('.example li')[i].id);
			//alert("in if");
			selectId = $('.example li')[i].id;
		}
	}

	jQuery.ajax({
			type: "POST",
			// url: 'http://localhost:8888/~apolatnick/Power-Playlist8/master/php/playlistManager.php',
			url: baseurl,
			dataType: 'json',
			async: false,
			data: {functionname: 'updatePlaylists', arguments: [1,selectId]},

			success: function (result,textstatus) {
				if(!('error' in result))
				{
					arrayResult = result.output;
					if(arrayResult.length != 0)
					{
						$("#empty").empty();
					}
					//alert(arrayResult);
					$(".example").empty();
					generatePlaylist(arrayResult);

				}
				else
				{
					alert(result.error);
				}
			},
		error: function(xhr)
		{
			//alert("No Search Results");
			var response = xhr.responseText;
			alert(response);
			var statusMessage = xhr.status + ' ' + xhr.statusText;
			var message  = 'Query failed, php script returned this status: ';
			var message = message + statusMessage + ' response: ' + response;
			alert(message);
		}
		});
		jQuery.ajax({
				type: "POST",
				url: baseurl,
				dataType: 'json',
				async: false,
				data: {functionname: 'updatePlaylists', arguments: [2,selectId]},

				success: function (result,textstatus) {
					if(!('error' in result))
					{
						arrayResult = result.output;
						if(arrayResult.length != 0)
						{
							$("#emptyalso").empty();
						}
						$(".suggestedExample").empty();
						generateSuggestedPlaylist(arrayResult);

					}
					else
					{
						alert(result.error);
					}
				},
			error: function(xhr)
			{
				//alert("No Search Results");
				var response = xhr.responseText;
				alert(response);
				var statusMessage = xhr.status + ' ' + xhr.statusText;
				var message  = 'Query failed, php script returned this status: ';
				var message = message + statusMessage + ' response: ' + response;
				alert(message);
			}
			});
}

function addToPlaylist(id,aResult){
	var fl;
	for(var i = 0; i < aResult.length; i++)
	{
		if(aResult[i][8] == id)
		{
			fl = i;
			break;
		}
	}
	//aResult[fl][8] = uniqid();
	//alert(aResult[fl][8]);
	$("#dropdown").empty();
	$("#empty").empty();
	var example = document.querySelector(".example");
	//$(".evenSong:even").css("background-color", "#333333");

	var arrayResult;
	jQuery.ajax({
			type: "POST",
			url: baseurl,
			dataType: 'json',
			async: false,
			data: {functionname: 'addToPlaylist', arguments: [aResult[fl]]},

			success: function (result,textstatus) {
				if(!('error' in result))
				{
					arrayResult = result.output;
					//alert(arrayResult);
					update();
				}
				else
				{
					alert(result.error);
				}
			},
		error: function(xhr)
		{
			//alert("No Search Results");
			var response = xhr.responseText;
			alert(response);
			var statusMessage = xhr.status + ' ' + xhr.statusText;
			var message  = 'Query failed, php script returned this status: ';
			var message = message + statusMessage + ' response: ' + response;
			alert(message);
		}
		});
}

function moveSong(songName1,songName2)
{
	jQuery.ajax({
			type: "POST",
			url: baseurl,
			dataType: 'json',
			async: false,
			data: {functionname: 'moveSong', arguments: [songName1,songName2]},

			success: function (result,textstatus) {
				if(!('error' in result))
				{
					arrayResult = result.output;
					update();
				}
				else
				{
					alert(result.error);
				}
			},
		error: function(xhr)
		{
			//alert("No Search Results");
			var response = xhr.responseText;
			alert(response);
			var statusMessage = xhr.status + ' ' + xhr.statusText;
			var message  = 'Query failed, php script returned this status: ';
			var message = message + statusMessage + ' response: ' + response;
			alert(message);
		}
	});
}

function deleteSong(song,list)
{
	jQuery.ajax({
			type: "POST",
			url: baseurl,
			dataType: 'json',
			async: false,
			data: {functionname: 'deleteSong', arguments: [song,list]},

			success: function (result,textstatus) {
				if(!('error' in result))
				{
					arrayResult = result.output;
					update();
					// if(arrayResult.length == 0)
					// {
					// 	document.getElementById("empty").innerHTML = "Your playlist is currently empty.";
					// }
				}
				else
				{
					alert(result.error);
				}
			},
		error: function(xhr)
		{
			//alert("No Search Results");
			var response = xhr.responseText;
			alert(response);
			var statusMessage = xhr.status + ' ' + xhr.statusText;
			var message  = 'Query failed, php script returned this status: ';
			var message = message + statusMessage + ' response: ' + response;
			alert(message);
		}
	});
}

function approveSong(song)
{
	jQuery.ajax({
			type: "POST",
			url: baseurl,
			dataType: 'json',
			async: false,
			data: {functionname: 'approveSong', arguments: [song]},

			success: function (result,textstatus) {
				if(!('error' in result))
				{
					arrayResult = result.output;
					update();
				}
				else
				{
					alert(result.error);
				}
			},
		error: function(xhr)
		{
			//alert("No Search Results");
			var response = xhr.responseText;
			alert(response);
			var statusMessage = xhr.status + ' ' + xhr.statusText;
			var message  = 'Query failed, php script returned this status: ';
			var message = message + statusMessage + ' response: ' + response;
			alert(message);
		}
	});
}

function upVote(song,list)
{
	jQuery.ajax({
			type: "POST",
			// url: 'http://localhost:8888/~apolatnick/Power-Playlist8/master/php/playlistManager.php',
			url: baseurl,
			dataType: 'json',
			async: false,
			data: {functionname: 'upVote', arguments: [song,list]},

			success: function (result,textstatus) {
				if(!('error' in result))
				{
					arrayResult = result.output;
					update();
				}
				else
				{
					alert(result.error);
				}
			},
		error: function(xhr)
		{
			var response = xhr.responseText;
			alert(response);
			var statusMessage = xhr.status + ' ' + xhr.statusText;
			var message  = 'Query failed, php script returned this status: ';
			var message = message + statusMessage + ' response: ' + response;
			alert(message);
		}
	});
}

function downVote(song,list)
{
	jQuery.ajax({
			type: "POST",
			// url: 'http://localhost:8888/~apolatnick/Power-Playlist8/master/php/playlistManager.php',
			url: baseurl,
			dataType: 'json',
			async: false,
			data: {functionname: 'downVote', arguments: [song,list]},

			success: function (result,textstatus) {
				if(!('error' in result))
				{
					arrayResult = result.output;
					update();
				}
				else
				{
					alert(result.error);
				}
			},
		error: function(xhr)
		{
			var response = xhr.responseText;
			alert(response);
			var statusMessage = xhr.status + ' ' + xhr.statusText;
			var message  = 'Query failed, php script returned this status: ';
			var message = message + statusMessage + ' response: ' + response;
			alert(message);
		}
	});
}


$(document).ready(function searchSong(){
	$("#find").keypress(function(event){
		if(event.which == 13){
    		var aResult;
				var newList;
		jQuery.ajax({
    		type: "POST",
    		url: 'http://172.21.123.107:80/~apolatnick/Power-Playlist10/master/php/search.php',
    		dataType: 'json',
				async: false,
    		data: {functionname: 'find', arguments: [$("#find").val()]},

    		success: function (result,textstatus) {
        	if(!('error' in result))
					{
        		aResult = result.output;
						var aLength;
						aLength = aResult.length;
          	newList = document.querySelector("#dropdown");
						for(var i = 0; i < aLength; i++)
						{
							//var obj;
							//var txt = aResult[i][0] + " - " + aResult[i][1];
							$(newList).append('<li class="dropList" id='+aResult[i][8]+' data-ogg='+aResult[i][5]+'>'+aResult[i][0]+'<br /><p class="dropArtist">'+aResult[i][1]+'</p></li>');
						}
						$(".dropList").click(function(e){
							// alert($("#find").val());
							$("#find").val("");
							//var text = e.target.childNodes[2];
							var x = e.target;
							var id = x.id;
							// alert(e.target.childNodes[4]);
							addToPlaylist(id,aResult);
						});
						if(aLength == 0)
						{
							newList.appendChild(document.createElement("li")).textContent = "no results found";
						}
        	}
        	else
					{
						alert(result.error);
          }
        },
			error: function(xhr)
			{
				alert("No Search Results");
				var response = xhr.responseText;
				alert(response);
				var statusMessage = xhr.status + ' ' + xhr.statusText;
				var message  = 'Query failed, php script returned this status: ';
				var message = message + statusMessage + ' response: ' + response;
				alert(message);
			}
			});
		//}
		}
	});
});
