const {Router} = require('express');
const UserService = require('../services/userService');
const {createUserValid, updateUserValid} = require('../middlewares/user.validation.middleware');
const {responseMiddleware} = require('../middlewares/response.middleware');

const router = Router();

// TODO: Implement route controllers for user

router.get("/:id", (req, res, next) => {
    try {
        const user = UserService.getSingleUser(req.params.id);
        res.json(user);
        res.data = user;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);


router.get("/", (req, res, next) => {
    try {
        const users = UserService.getAllUsers();
        res.json(users);
        res.data = users;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);




router.post('/', createUserValid, function (req, res, next) {
    try {
        res.data = UserService.create(req.body);
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.put('/:id', (req, res, next) => {
    try {
        const id = req.params.id;
        const userInfo = req.body;
        const updatedUser = UserService.update(id, userInfo);
        if (updatedUser) {
            res.status(200)
            res.data = updatedUser;
        }
    } catch (err) {
        res.status(400)
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.delete('/:id', (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedUser = UserService.delete(id);
        if (deletedUser) {
            res.status(200)
            res.data = deletedUser;
        }
    } catch (err) {
        res.status(400)
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);


module.exports = router;