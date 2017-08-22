function sendEmail()
{
  var guestName = document.getElementById("guestName").value;
  var guestEmail = document.getElementById("guestEmail").value;
  var location = document.getElementById("location").value;
  var description = document.getElementById("description").value;
  //alert(guestName + " " + guestEmail + " " + location + " " + description);

  document.getElementById("guestName").value = "";
  document.getElementById("guestEmail").value = "";
  document.getElementById("location").value = "";
  document.getElementById("description").value = "";

  jQuery.ajax({
			type: "POST",
			url: 'http://localhost:80/~apolatnick/Power-Playlist13/master/php/SharePin.php',
			dataType: 'json',
			data: {functionname: 'sendEmail', arguments: [guestName,guestEmail,location,description]},

			success: function (result,textstatus) {
				if(!('error' in result))
				{
          alert("Invitation Sent");
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
