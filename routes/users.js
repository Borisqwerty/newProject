var UsersHandler = require('../handlers/users');
var express = require('express');
var router = express.Router();
var usersHandler = new UsersHandler();

router.get('/', usersHandler.getAllUsers);
router.post('/', usersHandler.createUser);
router.post('/signUp', usersHandler.signUp);
router.post('/signIn', usersHandler.signIn);
router.patch('/:id', usersHandler.updateUser);

module.exports = router;