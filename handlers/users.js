var UsersModel = require('../models/user');
var sha256 = require("crypto-js/sha256");

var UsersHandler = function () {
    this.getAllUsers = function (req, res, next) {
        UsersModel.find({}, function (err, result) {
            if (err) {
                return next(err);
            }

            res.status(200).send({data: result});
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

        UsersModel.findByIdAndUpdate(id, body, {new: true}, function (err, result) {
            if (err) {
                return next(err);
            }

            res.status(201).send({updated: result});
        })
    }

    this.signUp = function (req, res, next) {
        var body = req.body;
        var email = body.email;
        var pass = body.pass;
        var err = new Error();

        err.status = 500;
        err.message = "Password is required";

        if (!pass) {
            return next(err)
        }

        UsersModel.find({email: email}).count(function (error, count) {
            if (error) {
                return next(error);
            }

            if (count) {
                err.message = "This email is already exist";
                return next(err)
            }
            body.pass = sha256(body.pass);

            var user = new UsersModel(body);

            user.save(function (err, result) {
                if (err)
                    return next(err);
            })

        })

    }

    this.signIn = function (req, res, next) {
        var body = req.body;
        var email = body.email;
        var pass = body.pass;
        var cryptedPass = sha256(pass);

        UsersModel.findOne({email: email, pass: cryptedPass}, function (err, users) {
            if (err) {
                return next(err);
            }
            if (users && users._id) {
                //req.session.userId = users._id;
                // req.session.loggedIn = true;
            }

            res.status(201).send(result)

    }
)
}};


module.exports = UsersHandler;