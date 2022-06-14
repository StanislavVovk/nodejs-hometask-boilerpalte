const {user} = require('../models/user');

const mailValidator = /.+@(gmail)\.com$/;
const phoneNumberValidator = /^(\+380)?\d{9}$/;

// we can use it for checking strong password. Need to split this to groups
// const PasswordValidator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*])(?=.{8,})/

const whiteSpaceFinder = /(?=.*\s)/;

const createValidUser = (req, res, next) => {
    // TODO: Implement validation for user entity during creation
    let error = isValidUser(req.body);
    if (error) {
        res.status(400)
            .send({
                error: true,
                message: `${error}`
            });
    } else {
        next();
    }
}

const updateValidUsersData = (req, res, next) => {
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
    // TODO: Implement validation for user entity during update

}

function isValidUser(newUser) {
    if (isEmpty(newUser)) return isEmpty(newUser);
    if (validFields(newUser)) return validFields(newUser);
    if (validFirstName(newUser.firstName)) return validFirstName(newUser.firstName);
    if (validLastName(newUser.lastName)) return validLastName(newUser.lastName);
    if (validEmail(newUser.email)) return validEmail(newUser.email);
    if (validPhoneNumber(newUser.phoneNumber)) return validPhoneNumber(newUser.phoneNumber);
    if (validPassword(newUser.password)) return validPassword(newUser.password);
    return false
}

function isEmpty(newUser) {
    let errorMessage = '';
    Object.keys(user).forEach(key => {
        if (!newUser[key] && key !== 'id') {
            errorMessage += `field ${key} can't be empty `;
        }
    });
    if (errorMessage) return errorMessage;
    return false
}

function validFields(newUser) {
    if (newUser.hasOwnProperty('id')) return `Request body shouldn't contain "id" field`
    let userLength = Object.keys(user).length,
        newUserLength = Object.keys(newUser).length;
    if (newUserLength > (userLength - 1)) return "Request contain unnecessary fields"
    return false
}

function validFirstName(firstName) {
    if (typeof firstName !== 'string') return 'Firstname field should be string'
    return false
}

function validLastName(lastName) {
    if (typeof (lastName) !== 'string') return 'Lastname field, should be string'
    return false
}

function validPassword(data) {
    // not so good method of validation really :)
    if (whiteSpaceFinder.test(data)) return "Password shouldn't contain white spaces";
    if (data.length < 3) return 'Password should be at least 3 characters long';
    return false
}

function validPhoneNumber(phoneNumber) {
    if (!phoneNumberValidator.test(phoneNumber)) return 'Not correct phone number, should be +380XXXXXXXXX'
    return false
}

function validEmail(email) {
    if (!mailValidator.test(email)) return 'Not correct email, should contain "@gmail.com"'
    return false;
}

function validUpdateData(updateUser) {
    if (updateUser.id || updateUser.firstName || updateUser.lastName || updateUser.email || updateUser.phoneNumber || updateUser.password) return false;
    return 'You need to fill at least one field, to update your user data'
}

exports.createUserValid = createValidUser;
exports.updateUserValid = updateValidUsersData;