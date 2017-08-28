module.exports = function(registrationsSchemaModel) {
    var regNumberList = {};
    var plateList = [];

    registrationsSchemaModel.find({}, function(err, shan) {
        if (err) {
            console.log(err);
        } else {
            plateList = shan;
        }
    });

    const regPlateNumberFunction = function(req, res) {
        var regPlate = req.body.regNumbers;
        var place = req.body.place;
        var button = req.body.button;
        var filteredPlates = [];

        if (button == 'add') {
            if (regNumberList[regPlate] == undefined) {
                regNumberList[regPlate] = 1;
                plateList.push({registrationPlates: regPlate});

                registrationsSchemaModel.create({
                    registrationPlates: regPlate
                });

                res.render('add', {
                    plateNumbers: plateList
                });
            } else {
                res.render('add', {
                    plateNumbers: plateList
                });
            }
        } else if (button == 'search') {
            for (var i = 0; i < plateList.length; i++) {
                var currentPlate = plateList[i].registrationPlates;
                if (place == 'CA' && currentPlate.startsWith('CA')) {
                    filteredPlates.push({registrationPlates: currentPlate});
                } else if (place == "CJ" && currentPlate.startsWith('CJ')) {
                    filteredPlates.push({registrationPlates: currentPlate});
                } else if (place == 'CY' && currentPlate.startsWith('CY')) {
                    filteredPlates.push({registrationPlates: currentPlate});
                } else if (place == "ALL") {
                    filteredPlates.push({registrationPlates: currentPlate});
                }
            }
            res.render('add', {
                plateNumbers: filteredPlates
            });
        }
    };
    return {
        regPlateNumberFunction
    };
};
