'use strict'

const {USER} = require('../models/user.model');

class UserService {
    static login = async ({username, password}) => {
        try {
            return await USER.findOne({username, password})

        } catch (err) {
            console.error(err);
        }
    }
}


module.exports = UserService;