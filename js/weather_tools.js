const weatherCodes = {
	"clear": [ 0 ],
	"cloudy": [ 1, 2, 3 ],
	"fog": [ 45, 48 ],
	"drizzle": [ 51, 53, 55, 56, 57 ],
	"rain": [ 61, 63, 65, 66, 67 ],
	"snow": [ 71, 73, 75, 77 ],
	"shower": [ 80, 81, 82, 85, 86 ],
	"thunder": [ 95, 96, 99 ],
};

const weatherIcons = {
	"clear": { icon: "fa-sun", color: "weather-orange" },
	"cloudy": { icon: "fa-cloud", color: "weather-grey" },
	"fog": { icon: "fa-water", color: "weather-grey" },
	"drizzle": { icon: "fa-cloud-rain", color: "weather-cyan" },
	"rain": { icon: "fa-cloud-rain", color: "weather-cyan" },
	"snow": { icon: "fa-snowflake", color: "weather-cyan" },
	"shower": { icon: "fa-cloud-showers-heavy", color: "weather-grey" },
	"thunder": { icon: "fa-bolt-lightning", color: "weather-orange" },
};

fillElement = function( element, data ) {
	document.getElementById( element ).innerHTML = data.toString();
}

styleElement = function( element, style ) {
	document.getElementById( element ).className += " " + style;
}

rotateElement = function( element, value ) {
	document.getElementById( element ).style.rotate = value.toString() + "deg";
}

getFormattedTime = function( datetime ) {
	return new Date( datetime + "Z" ).toLocaleTimeString( 
		[], { hour: "2-digit", minute: "2-digit" } 
	).replace( /AM|PM/, "" );
}

getWeatherType = function( id ) {
	for ( var name in weatherCodes ) {
		var codes = weatherCodes[ name ];

		for( var i = 0; i < codes.length; i++ ) {
			if ( codes[ i ] == id ) {
				return name;
			}
		}
	}
	return "";
}

getNextHourIndexFrom = function( data ) {
	var dateObj = new Date();
	dateObj.setTime( dateObj.getTime() + ( 60*60*1000 ));

	var nextISO = dateObj.toISOString();
	var nextStr = nextISO.slice( 0, nextISO.indexOf( ":" )) + ":00";

	for ( var index = 0; index < data.length; index++ ) {
		if ( data[ index ] == nextStr ) {
			return index;
		}
	}
	return -1;
}

capitalizeString = function( str ) {
	return str != "" ? str.charAt( 0 ).toUpperCase() + str.slice( 1 ) : "";
}
