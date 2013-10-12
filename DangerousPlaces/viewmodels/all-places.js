var app = app || {};
app.viewModels = app.viewModels || {};

(function (a) {
    function getAllPlaces() {
        app.data.placesPersister.getAllPlaces()
        .then(function (data) {
            viewModel.set("allPlaces", data);
        }, function (error) {
            alert(error);
        });
    }

    function selectPlace(param) {
        app.viewModels.placeDetails.loadPlace(param.data);
    }

    function filterPlaces() {
        console.log();
        if(isNaN(parseFloat(viewModel.kilometers))) {
            alert("Invalid kilometers value");
            return;
        }
        
        app.utilities.geolocation.getPosition()
            .then(function (position) {
                var kilometers = parseFloat(viewModel.kilometers);
                var nearPlaces = new Array();

                var currentLat = position.coords.latitude;
                var currentLon = position.coords.longitude;

                app.data.placesPersister.getAllPlaces()
                    .then(function (data) {
                        for (var i = 0; i < data.length; i++) {
                            var currentPlace = data[i];
                            var distance = app.utilities.geolocation.calculateDistance(
                                currentLat, currentLon, currentPlace.latitude, currentPlace.longitude);
                            
                            if (distance <= kilometers) {
                                nearPlaces.push(currentPlace);
                            }
                        }
                        
                        viewModel.set("allPlaces", nearPlaces);
                    }, function (error) {
                        alert(error);
                    });

            }, function (error) {
                alert(error);
            });
    }

    var viewModel = kendo.observable({
        allPlaces: [],
        kilometers: "",
        selectPlace: selectPlace,
        filterPlaces: filterPlaces
    });

    function init(e) {
        kendo.bind(e.view.element, viewModel);
        getAllPlaces();
    }

    a.allPlaces = {
        init: init
    };
}(app.viewModels));
