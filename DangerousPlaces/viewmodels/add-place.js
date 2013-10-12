var app = app || {};
app.viewModels = app.viewModels || {};

(function (a) {
    var placeToAdd = {
        title: "",
        description: "",
        pictureUrl: "http://i.imgur.com/vLNkdqj.jpg",
        latitude: 0,
        longitude: 0
    };
    var container = null;

    function addPlace() {
        if(viewModel.place.title.toString().length < 5) {
            alert("Title should be at least 5 characters");
            return;
        }
        
        if (viewModel.place.description.toString().length < 5) {
            alert("Description should be at least 5 characters");
            return;
        }

        app.utilities.geolocation.getPosition()
            .then(function (position) {
                viewModel.place.latitude = parseFloat(position.coords.latitude);
                viewModel.place.longitude = parseFloat(position.coords.longitude);

                app.data.placesPersister.addPlace(viewModel.place)
                    .then(function () {
                        alert("Place added");
                        navigator.notification.vibrate(1000);
                        app.application.navigate("views/all-places.html");
                    }, function (error) {
                        alert(error);
                    });
            }, function (error) {
                alert(error);
            });
    }

    function takePicture() {
        viewModel.place.pictureUrl = "styles/images/loading.gif";
        kendo.bind(container, viewModel);
        
        app.utilities.camera.takePicture().then(function(url) {
            viewModel.place.pictureUrl = url;
            kendo.bind(container, viewModel);
        }, function() {
            alert("Could not get picture from camera");
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

