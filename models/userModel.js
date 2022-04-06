const { Schema, model } = require('mongoose');
const mongoose= require('mongoose');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt=require('jsonwebtoken');
const {promisify}=require('util');
const jwtSign=promisify(jwt.sign);

const UserSchema = new Schema({
    name: {
        type: "string",
        required:true
    },
    email: {
        type:"string",
        required:true,
        // unique:true


    },
    password: {
        type:"string",
        required:true

    }

},
{
    toJSON: {
        transform: (doc, returnedDoc) => _.omit(returnedDoc, ['_v', 'password'])
    }
},
{timestamps: true})

UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
})

UserSchema.methods.IsValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
UserSchema.statics.GenerateToken=async(user)=>{
    return await jwtSign({name:user.name,email:user.email},process.env.SECRET_KEY,{expiresIn:"30d"});
}

module.exports = mongoose.models.User ||model("User", UserSchema);