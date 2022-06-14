const {FighterRepository} = require('../repositories/fighterRepository');
const {UserRepository} = require("../repositories/userRepository");


class FighterService {
    getSingleFighter(id) {
        if (id !== ":id") {
            if (FighterRepository.getOne({id: id})) {
                return FighterRepository.getOne({id: id})
            } else {
                throw  Error (`${FighterRepository.getOne({id: id})}`);
            }
        } else {
            throw Error(`Write correct id`)
        }
    }

    getAllFighters() {
        return FighterRepository.getAll()
    }

    create(item) {
        const data = {
            name: item.name,
            health: item.health || 100,
            power: item.power,
            defense: item.defense,
        }

        const fighterName = this.search({name: item.name})

        if (fighterName) {
            return null
        } else {
            return FighterRepository.create(data)
        }
    }

    update(id, dataToUpdate) {
        const fighter = FighterRepository.getOne({id: id})
        if (fighter && dataToUpdate) {
            if (Object.keys(dataToUpdate).every(key => {
                return key in fighter;
            }))
                return FighterRepository.update(id, dataToUpdate)
            else {
                throw Error("Fighter model hasn't such property")
            }
        } else {
            throw Error(`Fighter not found`)
        }
    }

    delete(id) {
        if (id !== ":id") {
            if (FighterRepository.getOne({id: id})) {
                return FighterRepository.delete(id)
            } else {
                throw Error(`Fighter not found with id ${id}`)
            }
        }
    }

    search(search) {
        const item = FighterRepository.getOne(search);
        if (!item) {
            return null;
        }
        return item;
    }
}

module.exports = new FighterService();