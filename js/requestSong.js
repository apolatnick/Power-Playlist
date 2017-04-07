function loadFunction()
{
	alert("hi");
	//document.getElementById("chosenSong").addEventListener("click", testFunction);
}


$(document).ready(function searchSong(){
	$("#tags").keypress(function(event){
		if(event.which == 13){
    		var aResult;
				var newList;
		jQuery.ajax({
    		type: "POST",
    		url: 'http://localhost:8888/~apolatnick/Power-Playlist3/master/php/search.php',
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
							//var txt = aResult[i][0] + " - " + aResult[i][1];
							obj.textContent = aResult[i][1];
							$(obj).addClass("searchList");
							$(".searchList").click(function(e){
								alert("testing on click");
							});

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


						//var nextSong = document.getElementById("#dropdown li");
						//nextSong.addEventListener("onclick", function(){alert("success");});
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
