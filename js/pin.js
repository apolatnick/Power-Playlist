$(document).ready(function pinFunction(){
	$("#enterButton").click(function(){
		var isCorrect;
		jQuery.ajax({
    	type: "POST",
    	url: 'http://localhost:8888/~apolatnick/SeniorDesign/php/approvePin.php',
    	dataType: 'json',
    	data: {functionname: 'pinAuthentication', arguments: [$("#pinEntry").val()]},

    	success: function (result,textstatus) {
                  	if( !('error' in result) ) {
                      	isCorrect = result.output;
												if(isCorrect == true){
														alert("Successful Pin Authentication");
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
  });
});
