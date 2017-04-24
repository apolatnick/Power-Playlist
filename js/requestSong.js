
function addToPlaylist(aResult){
	//add to html playlist
	$("#empty").remove();
	// $("#emptyalso").remove();
	var example = document.querySelector(".example");
	//example.appendChild(song);
	$(".evenSong:even").css("background-color", "#333333");

	var arrayResult;
	jQuery.ajax({
			type: "POST",
			url: 'http://localhost:8888/~apolatnick/Power-Playlist7/master/php/playlistManager.php',
			dataType: 'json',
			async: false,
			data: {functionname: 'addToPlaylist', arguments: [aResult[0]]},

			success: function (result,textstatus) {
				if(!('error' in result))
				{
					arrayResult = result.output;
					//alert(arrayResult.length);
					// for(var j = 0; j < arrayResult.length; j++)
					// {
					// 	alert(arrayResult[j][0]);
					// }
					$(".example").empty();
					$("#dropdown").empty();
					for(var it = 0; it < arrayResult.length; it++)
					{
						//alert(i);
						//alert(arrayResult[i][0]);
						$(".example").append('<li class="searchList evenSong" data-ogg='+arrayResult[it][5]+'>'+arrayResult[it][0]+'<img src="images/upVote.png" class="upVote" onclick="upVotePlaylist(event)"><img src="images/downVote.png" class="downvote" onclick="downVotePlaylist(event)"><p class="counter">0</p><img src="images/Remove.png" class="deleteSong" onclick="removeSong(event)"><br /><p class="artist">'+arrayResult[it][1]+'</p></li>');
					}

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
			url: 'http://localhost:8888/~apolatnick/Power-Playlist7/master/php/playlistManager.php',
			dataType: 'json',
			async: false,
			data: {functionname: 'moveSong', arguments: [songName1,songName2]},

			success: function (result,textstatus) {
				if(!('error' in result))
				{
					arrayResult = result.output;
					alert(arrayResult[0][0]);
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
			url: 'http://localhost:8888/~apolatnick/Power-Playlist7/master/php/playlistManager.php',
			dataType: 'json',
			async: false,
			data: {functionname: 'deleteSong', arguments: [song,list]},

			success: function (result,textstatus) {
				if(!('error' in result))
				{
					arrayResult = result.output;
					alert(arrayResult[0][0]);
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
			url: 'http://localhost:8888/~apolatnick/Power-Playlist7/master/php/playlistManager.php',
			dataType: 'json',
			async: false,
			data: {functionname: 'approveSong', arguments: [song]},

			success: function (result,textstatus) {
				if(!('error' in result))
				{
					arrayResult = result.output;
					alert(arrayResult[0][0]);
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


$(document).ready(function searchSong(){
	$("#find").keypress(function(event){
		if(event.which == 13){
    		var aResult;
				var newList;
		jQuery.ajax({
    		type: "POST",
    		url: 'http://localhost:8888/~apolatnick/Power-Playlist7/master/php/search.php',
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
							var obj;
							var txt = aResult[i][0] + " - " + aResult[i][1];
							$(newList).append('<li class="dropList" data-ogg='+aResult[i][5]+'>'+aResult[i][0]+'<br /><p class="dropArtist">'+aResult[i][1]+'</p></li>');
							$(".dropList").click(function(e){
								addToPlaylist(aResult);
							});

						}
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
