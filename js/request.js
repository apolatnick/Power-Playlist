var baseurl = "http://172.20.126.172:8888/~apolatnick/Power-Playlist8/master";

function loadFunction()
{
	alert("hi");
	//document.getElementById("chosenSong").addEventListener("click", testFunction);
}

// function generateList(array,len)
// {
// 	alert("testing success");
// 	var newList;
// 	newList = document.querySelector("#dropdown");
// 	for(var i = 0; i < aLength; i++)
// 	{
// 		//concatinate song name with artist maybe? make it a variable and use it for text content?
// 		var obj;
// 		obj = newList.appendChild(document.createElement("li"));
// 		obj.textContent = aResult[i][1];
// }

$(document).ready(function searchSong(){
	$("#tags").keypress(function(event){
		if(event.which == 13){
    		var aResult;
				var newList;
		jQuery.ajax({
    		type: "POST",
    		url: 'http://localhost:8888/~apolatnick/Power-Playlist2/Power-Playlist-master/php/search.php',
    		dataType: 'json',
				async: false,
    		data: {functionname: 'find', arguments: [$("#tags").val()]},

    		success: function (result,textstatus) {
        	if(!('error' in result))
					{
        		aResult = result.output;
						var aLength;
						aLength = aResult.length;
          	newList = document.querySelector("#dropdown");
						for(var i = 0; i < aLength; i++)
						{
							//concatinate song name with artist maybe? make it a variable and use it for text content?
							var obj;
							obj = newList.appendChild(document.createElement("li"));
							obj.textContent = aResult[i][1];
						//generateList(aResult,aLength);

						}
						// newList.addEventListener("cleck",function(e)){
						// 	if(e.target && e.target.nodeName === "LI")
						// 	{
						// 		alert("hi");
						// 	}
						// });
						if(aLength == 0)
						{
							newList.appendChild(document.createElement("li")).textContent = "no results found";
						}
						// else {
						// 	var temp = document.getElementById("#dropdown");
						// 	var x;
						// 	for (x=0; x<temp.length; x++) {
						// 		temp[x].addEventListener("click" function()) {
						// 			alert("yay");
						// 		}
						// 	}
						// }

						var nextSong = document.getElementById("#dropdown li");
						nextSong.addEventListener("onclick", function(){alert("success");});
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
			// newList.addEventListener("cleck",function(e)){
			// 	if(e.target && e.target.nodeName === "LI")
			// 	{
			// 		alert("hi");
			// 	}
			// });
		}
	});
});
