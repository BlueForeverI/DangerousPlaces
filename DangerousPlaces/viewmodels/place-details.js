var app = app || {};
app.viewModels = app.viewModels || {};

(function (a) {
    var container = null;

    function loadPlace(place) {
        var request = new XMLHttpRequest();

        var method = 'GET';
        var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + place.latitude + ',' + place.longitude + '&sensor=true';
        var async = true;

        request.open(method, url, async);
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                var data = JSON.parse(request.responseText);
                var address = data.results[0];
                place.address = address.formatted_address;
                place.mapAddress = "http://maps.google.com/maps?z=15&t=m&q=loc:" + place.latitude + "+" + place.longitude;
                
                viewModel.place = place;
            }
        };
        
        request.send();
    }

    var viewModel = kendo.observable({
        place: {}
    });

    function init(e) {
        container = e.view.element;
        kendo.bind(container, viewModel);
    }

    a.placeDetails = {
        init: init,
        loadPlace: loadPlace
    };
}(app.viewModels));

