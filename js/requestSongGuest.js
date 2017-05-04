var baseurl = "http://10.0.0.11:80/Power-Playlist-master/php/playlistManager.php";

function onLoad(){
	update();
	setInterval(update, 3000);
}

function generateSuggestedPlaylist(ar)
{
	//$(".example").empty();
	$("#dropdown").empty();
	for(var it = 0; it < ar.length; it++)
	{
		$(".suggestedExample").append('<li id='+ar[it][8]+' data-ogg='+ar[it][5]+'><'+ar[it][0]+'<img src="images/upVote.png" class="upVote" ontouchend="upVoteSuggList(event)"><img src="images/downVote.png" class="downvote" ontouchend="downVoteSuggList(event)"><p class="counter">'+ar[it][7]+'</p><br /><p class="artist">'+ar[it][1]+'</p></li>');
	}
}

function generatePlaylist(ar)
{
	//$(".example").empty();
	$("#dropdown").empty();
	for(var it = 0; it < ar.length; it++)
	{
		$(".example").append('<li id='+ar[it][8]+' class="searchList evenSong" data-ogg='+ar[it][5]+'>'+ar[it][0]+'<img src="images/upVote.png" class="upVote" onclick="upVotePlaylist(event)"><img src="images/downVote.png" class="downvote" onclick="downVotePlaylist(event)"><p class="counter">'+ar[it][7]+'</p><br /><p class="artist">'+ar[it][1]+'</p></li>');
		$(".evenSong:even").css("background", "#333333");
	}
}

function update()
{
	jQuery.ajax({
			type: "POST",
			// url: 'http://localhost:8888/~apolatnick/Power-Playlist8/master/php/playlistManager.php',
			url: baseurl,
			dataType: 'json',
			async: false,
			data: {functionname: 'updatePlaylists', arguments: [1]},

			success: function (result,textstatus) {
				if(!('error' in result))
				{
					arrayResult = result.output;
					if(arrayResult.length == 0)
					{
						//show "no songs on list p tag"
					}
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
				// url: 'http://localhost:8888/~apolatnick/Power-Playlist8/master/php/playlistManager.php',
				url: baseurl,
				dataType: 'json',
				async: false,
				data: {functionname: 'updatePlaylists', arguments: [2]},

				success: function (result,textstatus) {
					if(!('error' in result))
					{
						arrayResult = result.output;
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
				var response = xhr.responseText;
				alert(response);
				var statusMessage = xhr.status + ' ' + xhr.statusText;
				var message  = 'Query failed, php script returned this status: ';
				var message = message + statusMessage + ' response: ' + response;
				alert(message);
			}
			});
}

function addToSuggestedPlaylist(artist,aResult){
	$("#emptyalso").empty();
	var fl;
	for(var i = 0; i < aResult.length; i++)
	{
		if(aResult[i][1] == artist)
		{
			fl = i;
			break;
		}
	}
	var arrayResult;
	//alert(aResult[0]);
	jQuery.ajax({
			type: "POST",
			// url: 'http://localhost:8888/~apolatnick/Power-Playlist8/master/php/playlistManager.php',
			url: baseurl,
			dataType: 'json',
			async: false,
			data: {functionname: 'addToSuggestedPlaylist', arguments: [aResult[fl]]},

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
    		// url: 'http://localhost:8888/~apolatnick/Power-Playlist8/master/php/search.php',
    		url: 'http://10.0.0.11:80/Power-Playlist-master/php/search.php',
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
							$(newList).append('<li class="searchList" data-ogg='+aResult[i][5]+'>'+aResult[i][0]+'<br /><p class="artist">'+aResult[i][1]+'</p></li>');
						}
						$(".searchList").click(function(e){
							var text = e.target.childNodes[2];
							addToSuggestedPlaylist(text.textContent,aResult);
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
				var response = xhr.responseText;
				alert(response);
				var statusMessage = xhr.status + ' ' + xhr.statusText;
				var message  = 'Query failed, php script returned this status: ';
				var message = message + statusMessage + ' response: ' + response;
				alert(message);
			}
			});
		}
	});
});
