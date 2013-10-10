var app = app || {};
app.viewModels = app.viewModels || {};

(function (a) {
    var placeToAdd = {
        title: "",
        description: "",
        pictureUrl: "",
        latitude: 0,
        longitude: 0
    };
    var container = null;

    function addPlace() {
        // TODO: validation

        getPosition()
            .then(function (position) {
                viewModel.place.latitude = parseFloat(position.coords.latitude);
                viewModel.place.longitude = parseFloat(position.coords.longitude);

                app.data.placesPersister.addPlace(viewModel.place)
                    .then(function () {
                        alert("Place added");
                        navigator.notification.vibrate(1000);
                        app.application.navigate("views/all-places.html");
                    }, function (error) {

                    });
            }, function(error) {
            });
    }

    function takePicture() {
        app.utilities.camera.takePicture().then(function(url) {
            viewModel.place.pictureUrl = url;
            kendo.bind(container, viewModel);
        }, function() {
            console.log("failed");
        });
    }

    function getPosition(){
        return RSVP.Promise(function (success, error) {
            var options = {
                enableHighAccuracy: true
            };
            
            navigator.geolocation.getCurrentPosition(function (position) {
                success(position);
            }, function (e) {
                error(e);
            }, options);
        });
    }

    var viewModel = kendo.observable({
        place: placeToAdd,
        addPlace: addPlace,
        takePicture: takePicture
    });

    function init(e) {
        container = e.view.element;
        kendo.bind(container, viewModel);
    }

    a.addPlace = {
        init: init
    };
}(app.viewModels));

