const User = require("../models/userModel");
const { default: mongoose } = require('mongoose');
const { customError } = require("../middlewares/errorHandler");


exports.addUser = async (req, res, err) => {
    console.log(req.body);
    const { body: { name, email, password } } = req;
    const olduser = await User.findOne({ email });
    if (olduser) return res.status(409).json({ success: false, message: "user already exist" });
    const user = await new User({ name, email, password });
    user.save();
    res.status(201).send({ success: true, user });

}
exports.getAllUsers = async (req, res, err) => {
    const users = await User.find({});
    console.log(users);
    if (users.length == 0) return res.status(404).json({ success: false, message: "users not found " });
    res.status(200).send({ success: true, users });
}
exports.getUserById = async (req, res, next) => {
    const { id } = req.params
    let user = await User.findById(id);
    if (!user) return res.status(404).json({ success: false, message: "user doesn't exists" });
    res.status(200).send({ success: true, user });

}
exports.UpdateUserById = async (req, res, err) => {
    const { id } = req.params;
    let user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) return res.status(404).json({ success: false, message: "user doesn't exist " });
    return res.status(200).json({ success: true, user })
}
exports.DeleteUserById = async (req, res, err) => {
    const { id } = req.params;
    let user = await User.findByIdAndDelete(id);
    if (!user)  return res.status(404).json({ success: false, message: "user doesn't exist " });
    return res.status(200).json({ success: true, user });
}
exports.Login = async (req, res, err) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)  return res.status(401).json({ success: false, message: "Not a user" });
    const passwordCorrect = await user.IsValidPassword(password);
    if (!passwordCorrect) return res.status(401).json({ success: false, message: "wrong Email or password" });
    token = await User.GenerateToken({ name: user.name, email: user.email });
    return res.status(200).send({ success: true, user, token });
}
