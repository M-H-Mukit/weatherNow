var x = document.getElementById("state");
var lon;
var lat;
var url = "https://astro82.000webhostapp.com/";

function setPosition(position) {
    "use strict";
    lon = Math.floor(position.coords.latitude);
    lat = Math.floor(position.coords.longitude);
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


function loadData() {
    "use strict";
    //$(state).text("idvhsdj");
    $.getJSON(url, function (data) {
        $(state).text(data);
    });

};

loadData();
