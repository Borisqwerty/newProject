var usersRouter = require('./users');
var postsRouter = require('./posts');

module.exports = function (app) {

    app.use(function (req, res, next) {
        req.reqDate = new Date();

        next();
    });

    app.use('/users', usersRouter);
    app.use('/posts', postsRouter);

    app.use(function (err, req, res, next) {
        var status = err.status || 500;

        res.status(status).send(err);
    })
};