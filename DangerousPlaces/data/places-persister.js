var app = app || {};
app.data = app.data || {};

(function (a) {
    function getAllPlaces() {
        var promise = new RSVP.Promise(function(successHandler, errorHandler) {
            var el = new Everlive("3NvUWbP8C6AzHShK");
            el.Users.login("admin", "adminPassword")
                .then(function() {
                    return el.data("Places").get();
                })
                .then(function (data) {
                    var places = new Array();
                    for (var i = 0; i < data.result.length; i++) {
                        places.push(data.result[i].PlaceData);
                    }
                    
                    successHandler(places);
                }, function (error) {
                    errorHandler(error);
                });
        });

        return promise;
    }

    function addPlace(place) {
        var promise = new RSVP.Promise(function (successHandler, errorHandler) {
            var el = new Everlive("3NvUWbP8C6AzHShK");
            el.Users.login("admin", "adminPassword")
                .then(function() {
                    el.data("Places").create({ "PlaceData": place })
                        .then(function (createdData) {
                            successHandler();
                        }, function (error) {
                             errorHandler(error);
                        });
                }, function (error) {
                    errorHandler(error);
                });
        });

        return promise;
    }

    a.placesPersister = {
        getAllPlaces: getAllPlaces,
        addPlace: addPlace
    };
}(app.data));
