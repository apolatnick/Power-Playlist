// $(document).ready(function(){
	// $("#submitPin").click(function(){
function checkPin(){
		var one = document.getElementById("one");
    var two = document.getElementById("two");
    var three = document.getElementById("three");
    var four = document.getElementById("four");
    var str = one.value + two.value + three.value + four.value;
		var isCorrect;
		jQuery.ajax({
    	type: "POST",
    	url: 'http://playlist.engr.scu.edu/Power-Playlist-master/php/approvePin.php',
    	dataType: 'json',
    	data: {functionname: 'pinAuthentication', arguments: [str]},

    	success: function (result,textstatus) {
                  	if( !('error' in result) ) {
                      	isCorrect = result.output;
												if(isCorrect == true){
														alert("Successful Pin Authentication");
														//move to guest home page
														return true;
												}
												alert("Invalid Pin Number");
												return false;
                  	}
                  	else {
                      	console.log(result.error);
                  	}
            	},
				error: function()
				{
						alert("function failure");
						var response = xhr.responseText;
						alert(response);
						var statusMessage = xhr.status + ' ' + xhr.statusText;
						var message  = 'Query failed, php script returned this status: ';
						var message = message + statusMessage + ' response: ' + response;
						alert(message);
				}
		});
	}
  // });
// });
