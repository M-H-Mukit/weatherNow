var x = document.getElementById("state");
var lon;
var lat;
var tempF;
var tempC;
var sunSetTime;
var sunRiseTime;
var url = "https://api.darksky.net/forecast/9a43c00e75ee78d188f6de54364989ed";

function setPosition(position) {
    "use strict";
    lon = Math.floor(position.coords.latitude);
    lat = Math.floor(position.coords.longitude);
    console.log(lon);
    console.log(lat);
    loadData();
}


function getLocation() {
    "use strict";
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition);

    } else {
        // Error should shown 
    }
}
var state = $("#state");
var tempDiv = $("#temperature");
var weatherCon = $("#weatherCon");
var weatherNow;

function loadData() {
    "use strict";
    url = url + "/" + lon + "," + lat;
    $.getJSON(url, function (data) {
        $(state).text(data.timezone);
        tempF = Math.round(data.currently.temperature);
        $(tempDiv).text(tempF);
        $("#weatherStatus").text(data.hourly.summary);
        console.log(data.hourly.summary);
        weatherNow=data.currently.summary;
        $(weatherCon).text(weatherNow);
        sunSetTime = data.daily.data[0].sunsetTime;
        sunRiseTime = data.daily.data[0].sunriseTime;
        console.log(data);
        getSunTime();
        setDivImage();

    });

}
function setDivImage(){
    if (weatherNow="Drizzle"){
        document.getElementById("imgDiv").src = "image/cloudy.png"
        console.log(" ia ma okay :)");
    }
}

function getSunTime() {
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var setTime = new Date(sunSetTime * 1000);
    // Hours part from the timestamp
    var hours = setTime.getHours() - 12;
    // Minutes part from the timestamp
    var minutes = "0" + setTime.getMinutes();
    var formattedSetTime = hours + ':' + minutes.substr(-2);
    $("#sunSet").text(formattedSetTime);
    console.log(formattedSetTime);

    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var riseTime = new Date(sunRiseTime * 1000);
    // Hours part from the timestamp
    hours = riseTime.getHours();
    // Minutes part from the timestamp
    minutes = "0" + riseTime.getMinutes();
    var formattedRiseTime = hours + ':' + minutes.substr(-2);
    $("#sunRise").text(formattedRiseTime);
    console.log(formattedRiseTime);
}

function f2c() {
    "use strict";
    document.getElementById("rectC").style.backgroundColor = "#444444";
    document.getElementById("rectF").style.backgroundColor = "#555555";
    document.getElementById("temperature").innerHTML = Math.round((5 / 9) * (tempF - 32));
}


function c2f() {
    "use strict";
    document.getElementById("rectF").style.backgroundColor = "#444444";
    document.getElementById("rectC").style.backgroundColor = "#555555";
    document.getElementById("temperature").innerHTML = tempF;

}
