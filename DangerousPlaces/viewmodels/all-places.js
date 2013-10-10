var app = app || {};
app.viewModels = app.viewModels || { };

(function (a) {
    function getAllPlaces() {
        app.data.placesPersister.getAllPlaces()
        .then(function (data) {
            viewModel.set("allPlaces", data);
        });
    }

    var viewModel = kendo.observable({
        allPlaces: []
    });

    function init(e) {
        kendo.bind(e.view.element, viewModel);
        getAllPlaces();
    }

    a.allPlaces = {
        init: init
    };
}(app.viewModels));
