$(document).ready(function searchSong(){
	$("#search").keypress(function(event){
		if(event.which == 13){
    		var aResult;
		jQuery.ajax({
    		type: "POST",
    		url: 'http://localhost:8888/~apolatnick/SeniorDesign/php/search.php',
    		dataType: 'json',
				async: true,
    		data: {functionname: 'find', arguments: [$("#search").val()]},

    		success: function (result,textstatus) {
                  		if(!('error' in result))
				{
                      			aResult = result.output;
					alert(aResult[0][1]);
                      			//alert("In success function");
					var str = aResult[0][0];
                          		var newList;
                          		newList = document.querySelector(".example");
                          		newList.appendChild(document.createElement("li")).textContent = str;
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
