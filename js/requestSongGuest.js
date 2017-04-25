function generateSuggestedPlaylist(ar)
{
	//$(".example").empty();
	$("#dropdown").empty();
	for(var it = 0; it < ar.length; it++)
	{
		$(".suggestedExample").append('<li data-ogg='+ar[it][5]+'><'+ar[it][0]+'<img src="images/upVote.png" class="upVote" onclick="upVoteSuggList(event)"><img src="images/downVote.png" class="downvote" onclick="downVoteSuggList(event)"><p class="counter">'+ar[it][7]+'</p><br /><p class="artist">'+ar[it][1]+'</p></li>');
	}
}

function generatePlaylist(ar)
{
	//$(".example").empty();
	$("#dropdown").empty();
	for(var it = 0; it < ar.length; it++)
	{
		$(".example").append('<li class="searchList evenSong" data-ogg='+ar[it][5]+'>'+ar[it][0]+'<img src="images/upVote.png" class="upVote" onclick="upVotePlaylist(event)"><img src="images/downVote.png" class="downvote" onclick="downVotePlaylist(event)"><p class="counter">'+ar[it][7]+'</p><img src="images/Remove.png" class="deleteSong" onclick="removeSong(event)"><br /><p class="artist">'+ar[it][1]+'</p></li>');
	}
}

function addToSuggestedPlaylist(aResult){
	//put song at the end of the playlist
	//$("#empty").remove();
	$("#emptyalso").remove();
	//var example = document.querySelector("#suggestedList");
	//example.appendChild(song);
	//var str = JSON.stringify(aResult);
	var arrayResult;
	jQuery.ajax({
			type: "POST",
			url: 'http://localhost:8888/~apolatnick/Power-Playlist7/master/php/playlistManager.php',
			dataType: 'json',
			async: false,
			data: {functionname: 'addToSuggestedPlaylist', arguments: [aResult[0]]},

			success: function (result,textstatus) {
				if(!('error' in result))
				{
					arrayResult = result.output;
					//alert(arrayResult);
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

function upVote(song,list)
{
	jQuery.ajax({
			type: "POST",
			url: 'http://localhost:8888/~apolatnick/Power-Playlist7/master/php/playlistManager.php',
			dataType: 'json',
			async: false,
			data: {functionname: 'upVote', arguments: [song,list]},

			success: function (result,textstatus) {
				if(!('error' in result))
				{
					arrayResult = result.output;
					if(list == 1)
					{
						$(".example").empty();
						generatePlaylist(arrayResult);
					}
					else{
						$(".suggestedExample").empty();
						generatePlaylist(arrayResult);
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

function downVote(song,list)
{
	jQuery.ajax({
			type: "POST",
			url: 'http://localhost:8888/~apolatnick/Power-Playlist7/master/php/playlistManager.php',
			dataType: 'json',
			async: false,
			data: {functionname: 'downVote', arguments: [song,list]},

			success: function (result,textstatus) {
				if(!('error' in result))
				{
					arrayResult = result.output;
					if(list == 1)
					{
						$(".example").empty();
						generatePlaylist(arrayResult);
					}
					else{
						$(".suggestedExample").empty();
						generatePlaylist(arrayResult);
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
							$(newList).append('<li class="searchList" data-ogg='+aResult[i][5]+'>'+aResult[i][0]+'<br /><p class="artist">'+aResult[i][1]+'</p></li>');
						}
						$(".searchList").click(function(e){
							//alert(e.target.textContent);
							addToSuggestedPlaylist(e.target,aResult);
							//newList.remove();
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
	});
});
