const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');


const router = Router();

router.get('/:id', function (req, res, next) {
    try {
        res.data =  FighterService.getSingleFighter(req.params.id);
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }

}, responseMiddleware);

router.get('/', function (req, res, next) {
    try {

        res.data = FighterService.getAllFighters();
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }

}, responseMiddleware);

router.post('/', createFighterValid, function (req, res, next) {
    try {
        res.data = FighterService.create(req.body);
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);



router.delete('/:id', function (req, res, next) {
    try {
        res.data =  FighterService.delete(req.params.id);
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }

}, responseMiddleware);

router.put('/:id', updateFighterValid, function (req, res, next) {
    try {
        res.data = FighterService.update(req.params.id, req.body);
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }

}, responseMiddleware);





// TODO: Implement route controllers for fighter

module.exports = router;