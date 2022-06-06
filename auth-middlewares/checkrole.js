const { userSchema } = require('../model/users');

async function checkStaff(req, res, next) {
    const userID = req.decoded;
    const userDetails = await userSchema.findById(userID, '');
    // console.log(userDetails);
    // next();
    if(userDetails.role == 'staff') {
        next();
    } else {
        res.send("only for staffs");
    }

}

module.exports = { checkStaff };