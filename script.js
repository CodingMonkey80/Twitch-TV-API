$(function() {
	
	var channels = ["Chris_Weidman_UFC", "leg_kick_mma", "UFCUltimateTeam", "Dauphin_Gaming", "ufcaovivo", "FreeCodeCamp", "Machinima"]; // some mma channels ;)
	
	
	function channel_online(channel) { 
		
		$.ajax({
			
			url: 'https://wind-bow.gomix.me/twitch-api/streams/' + channel,
			dataType: 'jsonp',
			success: function(data) {
				
				if (data.stream != null) { // If user is online
					
					if (data.stream.channel.logo === null) { // Channel without logo
						$(".streamers").append("<a class='onlineChannels'" + "href='https://www.twitch.tv/" + data.stream.channel.name + "' " + "target='_blank'><p><img id='logo' src=" + "'" + placeholder + "'" + ">" + "<strong id='channel_name'>" + data.stream.channel.display_name + "</strong>" + "<br>" + "<i>" + "<strong>" + data.stream.game + ": " + "</strong>" + data.stream.channel.status + "<i>" + "</p></a>");
						$(".streamers p").css("backgroundColor", "#b3ffb3");
					} else { // Channel with logo
						$(".streamers").append("<a class='onlineChannels'" + "href='https://www.twitch.tv/" + data.stream.channel.name + "' " + "target='_blank'><p><img id='logo' src=" + "'" + data.stream.channel.logo + "'" + ">" + "<strong id='channel_name'>" + data.stream.channel.display_name + "</strong>" + "<br>" + "<i>" + "<strong>" + data.stream.game + ": " + "</strong>" + data.stream.channel.status + "<i>" + "</p></a>");
						$(".streamers p").css("backgroundColor", "#6441a5");
					}
					
				} else if (data.status === 422) { // If users account is closed
					$(".streamers").append("<a class='offlineChannels'" + "href='https://www.twitch.tv/" + channel + "' target='_blank'><p><img id='logo' src='" + placeholder + "'><strong id='channel_name'>" + channel + "</strong><br><i class='offline'>Account closed<i></p></a>");
				} else { // when user is offline
					channel_offline(channel);
				}
				
			} 
		
		}); 
		
	} 
	
	function channel_offline(channel) { // Function for offline channels
		
		$.ajax({
			
			url: 'https://wind-bow.gomix.me/twitch-api/channels/' + channel, 
			dataType: 'jsonp',
			success: function(data) {
				
				$(".streamers").append("<a class='offlineChannels'" + "href='https://www.twitch.tv/" + data.name + "' " + "target='_blank'><p><img id='logo' src=" + "'" + data.logo + "'" + ">" + "<strong id='channel_name'>" + data.display_name + "</strong><br><i class='offline'>Offline<i></p></a>");
		
			} 
		
		}); 
		
	} 
	
	$(".switch-field input").on("change", function() { 
		
		if ( $(this).val() === "online" ) {
			$(".offlineChannels").addClass("hidden");
			$(".onlineChannels").removeClass("hidden");
		} else if ( $(this).val() === "offline" ) {
			$(".onlineChannels").addClass("hidden");
			$(".offlineChannels").removeClass("hidden");
		} else {
			$(".onlineChannels").removeClass("hidden");
			$(".offlineChannels").removeClass("hidden");
		}
		
	}); 
	
	for (var i = 0; i < channels.length; i++) { 
		channel_online(channels[i]);
	}
	
}); // End of READY function!