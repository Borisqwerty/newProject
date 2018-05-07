var UsersModel = require('../models/user');

var UsersHandler = function () {
    this.getAllUsers = function (req, res, next) {
        UsersModel.find({}, function (err, result) {
            if (err) {
                return next(err);
            }

            res.status(200).send({ data: result });
        })
    };

    this.createUser = function (req, res, next) {
        var body = req.body;
        var userModel = new UsersModel(body);

        userModel.save(function (err, result) {
            if (err) {
                return next(err);
            }

            res.status(201).send(result);
        })
    };

    this.updateUser = function (req, res, next) {
        var body = req.body;
        var id = req.params.id;

        UsersModel.findByIdAndUpdate(id, body, { new: true }, function (err, result) {
            if (err) {
                return next(err);
            }

            res.status(201).send({ updated: result });
        })
    }
};

module.exports = UsersHandler;