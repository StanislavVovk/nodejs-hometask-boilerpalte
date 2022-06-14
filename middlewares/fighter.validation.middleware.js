const {fighter} = require('../models/fighter');

const createFighterValid = (req, res, next) => {
    let error = isValidFighter(req.body);
    if (!error) {
        next();
    } else {
        res.status(400).json({
            error: true,
            message: `${error}`
        });
    }
}

const isValidFighter = (Fighter) => {
    if (isEmpty(Fighter)) return isEmpty(Fighter);
    if (validFields(Fighter)) return validFields(Fighter);
    if (validName(Fighter.name)) return validName(Fighter.name);
    if (validPower(Fighter.power)) return validPower(Fighter.power);
    if (validHealth(Fighter.health)) return validHealth(Fighter.health);
    if (validDefence(Fighter.defense)) return validDefence(Fighter.defense);
}

function isEmpty(Fighter) {
    let errorMessage = '';
    Object.keys(fighter).forEach(key => {
        if (!Fighter[key] && key !== 'id' && key !== 'health') {
            errorMessage += `field ${key} can't be empty \n`
        }
    });
    if (errorMessage) return errorMessage;
    return false
}
function validFields(Fighter) {
    if ( Fighter.hasOwnProperty('id') ) return 'Request body should not contain "id" field'
    const fighterLength = Object.keys(fighter).length,
        newFighterLength = Object.keys(Fighter).length;
    if (Fighter.hasOwnProperty('health') && newFighterLength > (fighterLength - 1) ) return "Request contain unnecessary fields";

    return false
}

function validName(name) {
    if (typeof name !== 'string') return 'name must be a string';
    if (name.length < 3) return 'name must be at least 3 characters';
    if (name.length > 20) return 'name must be less than 20 characters';
    return false
}
function validPower(power) {
    if (typeof power !== 'number') return 'Power must be a number';
    if (power <= 1 || power >= 100) return 'Power must be greater than 1 and less than 100';
    return false
}
function validDefence(defense) {
    if (typeof(defense) !== 'number') return ' defense must be number'
    if ( defense <= 1 || defense >= 10 ) return 'Defence must be more than 1 and less than 10';
    return false
}
function validHealth(health) {
    if ( !health ) return false;
    if (typeof(health) !== 'number') return 'health must be number'
    if ( health <= 80 || health >= 120 ) return 'Health must be more than 80 and less than 120';
    return false
}

function validUpdateData(updateUser) {
    if (updateUser.name || updateUser.power || updateUser.health || updateUser.defense) return false;
    return 'You need to fill at least one field, to update your fighter data'
}


const updateFighterValid = (req, res, next) => {
    let errorMessage = validUpdateData(req.body);
    if (!errorMessage) {
        next();
    } else {
        res
            .status(404)
            .send({
                    error: true,
                    message: `${errorMessage}`
                }
            );
    }
}

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;