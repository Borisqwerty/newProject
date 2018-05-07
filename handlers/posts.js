var PostsModel = require('../models/post');

var PostsHandler = function () {
    this.getAllPosts = function (req, res, next) {
        PostsModel.find({}, function (err, result) {
            if (err){
                return next(err);
            }

            res.status(200).send({data: result});
        })
    };

    this.createPost = function (req, res, next) {
        var body = req.body;
        var postModel = new PostsModel(body);

        postModel.save(function (err, result) {
            if (err){
                return next(err);
            }

            res.status(201).send(result);
        })
    }
};

module.exports = PostsHandler;