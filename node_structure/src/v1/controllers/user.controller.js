'use strict'

const userService = require('../service/user.service');

class UserController {
    login = async (req, res, next) => {
        try {
            const {username, password} = req.body;
            const user = await userService.login({username, password});

            res.status(200).json({
                metadata: user,
                status: 200
            });
            
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = new UserController();