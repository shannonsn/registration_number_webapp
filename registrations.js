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
                var curPlate = plateList[i].registrationPlates;
                if (place == 'CA' && curPlate.startsWith('CA')) {
                    filteredPlates.push({registrationPlates: curPlate});
                } else if (place == "CJ" && curPlate.startsWith('CJ')) {
                    filteredPlates.push({registrationPlates: curPlate});
                } else if (place == 'CY' && curPlate.startsWith('CY')) {
                    filteredPlates.push({registrationPlates: curPlate});
                } else if (place == "ALL") {
                    filteredPlates.push({registrationPlates: curPlate});
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
