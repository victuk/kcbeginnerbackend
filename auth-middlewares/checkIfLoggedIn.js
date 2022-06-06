const jwt = require('jsonwebtoken');
const { userSchema } = require('../model/users');

function check (req, res, next) {
    // console.log(req.headers);
    // return;
    if(req.headers.authorization) {
        // const token
        if(req.headers.authorization.split(" ")[0] == "Bearer") {
            const token = req.headers.authorization.split(" ")[1];
            jwt.verify(token, process.env.jwtKey, function(err, payload) {
                if(err) console.log(err);
                userSchema.findOne({username: payload.username}, 'username', function (err, user) {
                    if(err) console.log(err);
                    
                    if(!user) {
                        res.send("User does not exist");
                    } else {
                        req.decoded = user._id; 
                        next();
                    }
                });
                
            });
        }

        
    } else {
        res.send("You are not authorized");
    }
}

module.exports = { check };