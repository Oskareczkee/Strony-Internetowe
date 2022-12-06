
const geocoder = new google.maps.Geocoder();
const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: { lng: 0, lat: 0 },
});
window.onload = function () {
    $.getJSON('https://api.db-ip.com/v2/free/self', function (data) {
        $("#ip").text(data.ipAddress);
    }).fail(function () {
        $("#ip").text("#");
    });
    navigator.geolocation.getCurrentPosition(function (position) {
        $("#latitude").text(position.coords.latitude);
        $("#longtitude").text(position.coords.longitude);
        $("#altitude").text(position.coords.altitude || "#");
        $("#speed").text(position.coords.speed || 0);
        const latlng = { lat: position.coords.latitude, lng: position.coords.longitude };
        geocoder.geocode({ location: latlng }, function (results) {
            if (results[1]) {
                $("#address").text(results[1].formatted_address);
            }
            else {
                $("#address").text("o chuj tu chodzi");
            }
        });
        let coords = { lat: position.coords.latitude, lng: position.coords.longitude };
        map.setCenter(coords);
        const marker = new google.maps.Marker({
            position: coords,
            map: map,
        });
    }, function (msg) {
        $("#latitude").text("#");
        $("#longtitude").text("#");
        $("#altitude").text("#");
        $("#speed").text("#");
        console.log(msg.message);
    });
};
