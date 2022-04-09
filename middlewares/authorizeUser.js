const util = require('util');
const jwt = require('jsonwebtoken');
const verifyAsync=util.promisify(jwt.verify)


exports.authorizedUser = function (req, res, next) {
    let token = req.headers('authentication');
    if (!token) return res.status(401).send("Access Denied");

    try {
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length).trimLeft();
        }
        if(Object.values(token).length!=0){
            var payLoad=verifyAsync(token.toString(),process.env.SECRET_KEY);
            console.log(payload);
            if(payLoad){

                return next();  
            }
        }
        return res.status(401).send("unauthorized");
    }
    catch (err) {
        res.status(400).send("Invalid Token");
    }
}