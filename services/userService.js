const {UserRepository} = require('../repositories/userRepository');
// const errorsOfCreatingUser = {
//     "phone": "Phone number is exist",
//     "email": "Email is exist",
//     "all": "Phone number and email is exist"
// }

class UserService {
    // TODO: Implement methods to work with user

    getAllUsers() {
        if (UserRepository.getAll()) {
            return UserRepository.getAll()
        } else {
            throw Error('Database is empty')
        }

    }

    getSingleUser(id) {
        if (id !== ":id") {
            if (UserRepository.getOne({id: id})) {
                return UserRepository.getOne({id: id})
            } else {
                 throw Error(`User not found ${id}`)
            }
        } else {
            throw Error(`Write correct id`)
        }
    }

    create(item) {
        const data = {
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
            phoneNumber: item.phoneNumber,
            password: item.password
        }

        const userEmail = this.search({email: item.email})
        const userPhoneNumber = this.search({phoneNumber: item.phoneNumber})

        // need to do more difficult explanation
        // if (userEmail && userPhoneNumber) {
        //     throw errorsOfCreatingUser.all
        // }
        // else if (userEmail)  {
        //     throw errorsOfCreatingUser.email
        // }
        // else if (userPhoneNumber) {
        //     throw errorsOfCreatingUser.phone
        // } else {
        //     return UserRepository.create(data)
        // }
        if (userEmail || userPhoneNumber) {
            return null
        } else {
            return UserRepository.create(data)
        }
    }

    update(id, newData) {
        //slishkom mnogo bukavak
        // create some doc
        const user = UserRepository.getOne({id: id})
        if (user && user) {
            if (Object.keys(newData).every(key => {
                return key in user;
            }))
            return UserRepository.update(id, newData)
            else {
                throw Error("User model hasn't such property")
            }
        } else {
            throw Error(`User not found`)
        }
    }

    delete(id) {
        if (id !== ":id") {
            if (UserRepository.getOne({id: id})) {
                return UserRepository.delete(id)
            } else {
                throw Error(`User not found with id ${id}`)
            }
        }
    }

    search(search) {
        const item = UserRepository.getOne(search);
        if (!item) {
            return null;
        }
        return item;
    }
}

module.exports = new UserService();
