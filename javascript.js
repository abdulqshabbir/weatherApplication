require("jsdom").env("", function(err, window) {
	if (err) {
		console.error(err);
		return;
	}
	var $ = require("jquery")(window);

	console.log("hi"); 

});

//get position coordinates and call the getApiData function
function getLocation(position) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getApiData);
    }
}

//use getLocation function to get location coordinates.
//create api call based on longitude and latitude.
//display api information by linking to html.

function getApiData(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon="+ lon + "&appid=867ed23a9a61fefc12bb5209f87bb417";
    $.getJSON(url, function(json) {
        var city = json.name;
        console.log(city);
        var country = json.sys.country;

        var tempKel = json.main.temp;
        var tempCel = (tempKel - 273.15).toFixed(0);
        var tempFar = ((tempKel -273.15)*1.8 +32).toFixed(0);

        var windSpeed = json.wind.speed;
        var humidity = json.main.humidity;
        var description = json.weather[0].description;

        $("#myLocation").append("<p>"+ city + ", " + country + "</p>");
        $("#myTemp").append("<p>"+ tempCel + "<sup>&#8451</sup>"+ "</p>");
        $("#myWind p").append("<p>"+ windSpeed + " m/s</p>");
        $("#myHumidity").append("<p>"+ humidity + " %</p>");
        $("#myDescription").append("<p>"+ description + "</p>");

        $("#myCelToggle").click(function(){
            $("#myTemp p").replaceWith("<p>" + tempCel + "<sup>&#8451</sup></p>");
        });

        $("#myFarToggle").click(function(){
            $("#myTemp p").replaceWith("<p>" + tempFar + "<sup>&#8457</sup></p>");
        });

    });
}




$("document").ready(function() {
    getLocation();
});
