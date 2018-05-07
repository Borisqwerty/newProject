var PostsModel = require('../models/post');

var PostsHandler = function () {
    this.getAllPosts = function (req, res, next) {
        PostsModel.find({}, function (err, result) {
            if (err) {
                return next(err);
            }

            res.status(200).send({data: result});
        })
    };

    this.createPost = function (req, res, next) {
        var body = req.body;
        var postModel = new PostsModel(body);

        postModel.save(function (err, result) {
            if (err) {
                return next(err);
            }

            res.status(201).send(result);
        })
    }
    this.getPostsWithUser = function (req, res, next) {
        /* PostsModel
             .find({})
             .populate('userId', {name: 1, _id: 0})
             .exec(function(err,result){
             if(err){
                 return next(err);
             }
             res.status(200).send({data: result});
         })*/
        PostsModel.aggregate([
            {
                $match: {
                    title: 'Hello'
                }
            }, {
                $project: {
                    title: 1,
                    userId: 1
                }

            }, {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: 'userId'
                }
            },{
                $project: {
                    title: 1,
                    userId: {$arrayElemAt:['$userId', 0]}
                }


            }], function (err, result) {
            if (err) {
                return next(err);
            }
            res.status(200).send({data: result})
        })

    }

};

module.exports = PostsHandler;