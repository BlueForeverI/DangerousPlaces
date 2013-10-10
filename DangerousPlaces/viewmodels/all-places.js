var app = app || {};
app.viewModels = app.viewModels || { };

(function (a) {
    function getAllPlaces() {
        app.data.placesPersister.getAllPlaces()
        .then(function (data) {
            viewModel.set("allPlaces", data);
        });
    }

    function selectPlace(param) {
        app.viewModels.placeDetails.loadPlace(param.data);
        app.application.navigate("views/place-details.html");
    }
    
    var viewModel = kendo.observable({
        allPlaces: [],
        selectPlace: selectPlace
    });

    function init(e) {
        kendo.bind(e.view.element, viewModel);
        getAllPlaces();
    }

    a.allPlaces = {
        init: init
    };
}(app.viewModels));
