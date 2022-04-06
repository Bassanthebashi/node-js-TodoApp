const util = require('util');
const jwt = require('jsonwebtoken');
const { nextTick } = require('process');

const verifyAsync=util.promisify(jwt.verify)


exports.authorizeUser = async (req, res, err) => {
    const { authorization: token }=req.headers;
    await verifyAsync(token,process.env.SECRETKEY);
    nextTick()

}