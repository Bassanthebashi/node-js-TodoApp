const User = require("../models/userModel");
const { default: mongoose } = require('mongoose');
const { customError } = require("../middlewares/errorHandler");


exports.addUser = async (req, res, err) => {

    const { body: { name, email, password } } = req;
    const user = await new User({ name, email, password });
    user.save();
    res.status(201).send({ success: true, user });

}
exports.getAllUsers = async (req, res, err) => {
    const users = await User.find({});
    console.log(users);
    if (users.length == 0) throw customError({ status: 404, ErrorMessage: "users not found" });
    res.status(200).send({ success: true, users });
}
exports.getUserById = async (req, res, err, next) => {
        const { id } = req.params
        console.log(id);
        const user = await User.findById(id);
        console.log(user);
        if (!user) return next( Error({ status: 404, message: "user doesn't exist" }));
        res.status(200).send({ success: true, user });
    
}
exports.UpdateUserById = async (req, res, err) => {
    const { id } = req.params;
    let user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) throw customError({ status: 404, ErrorMessage: "user doesn't exist" });
    return res.status(200).json({ success: true, user })
}
exports.DeleteUserById = async (req, res, err) => {
    const { id } = req.params;
    let user = await User.findByIdAndDelete(id);
    if (!user) throw customError({ status: 404, ErrorMessage: "user doesn't exist" });
    return res.status(200).json({ success: true, user });
}
exports.Login = async (req, res, err) => {

    const { email, password } = req.body;
    console.log(email);
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) throw customError({ status: 404, ErrorMessage: "user doesn't have account" });
    const passwordCorrect = user.IsValidPassword(password);
    if (!passwordCorrect) throw customError({ status: 404, ErrorMessage: "Wrong password" });
    token = await User.GenerateToken({ name: user.name, email: user.email });
    return res.status(200).json({ success: true, user, token });
}
