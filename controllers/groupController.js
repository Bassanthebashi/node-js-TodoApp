const Todo = require("../models/TodoModel");
const { Group } = require("../models/GroupModel");
const User = require("../models/UserModel");
const jwt = require('jsonwebtoken');
const util = require('util');
const verifyAsync=util.promisify(jwt.verify)

module.exports = {
    AddGroup: async (req, res, err) => {

        // token
        let token = req.header('authentication');
        console.log(token);
        if (!token) return res.status(401).send("Access Denied");
        token = token.slice(7, token.length).trimLeft();
        var payLoad=verifyAsync(token.toString(),process.env.SECRET_KEY);
        userid=await payLoad.then(d=>d.userid);
        //token

        const {  title } = req.body;
        const userObj = await User.findById(userid);
        if (!userObj)  return res.status(404).json({ success: false, message: "user doesn't exist " });
        const oldgroup = await Group.findOne({ title,user:userid });
        if (oldgroup)  return res.status(409).json({ success: false, message: "topic already exist " });
        const group = await new Group({title,user:userid});
        await group.save();
        res.status(200).send({ success: true, group });
    },
    GetAllGroups: async (req, res, err) => {

        // token
        let token = req.header('authentication');
        console.log(token);
        if (!token) return res.status(401).send("Access Denied");
        token = token.slice(7, token.length).trimLeft();
        var payLoad=verifyAsync(token.toString(),process.env.SECRET_KEY);
        userid=await payLoad.then(d=>d.userid);
        //token
        let groups;
        if (user) {
            let userObj = await User.findById(userid);
            if (!userObj)  return res.status(404).json({ success: false, message: "user doesn't exist " });
            groups = await Group.find({ userid }).populate('user');
        }
        else { 
            groups = await Group.find().populate('user'); 
        }
        res.status(200).send({ success: true, groups });
    },
    GetGroupsByUserId: async (req, res, err) => {

        // token
        let token = req.header('authentication');
        console.log(token);
        if (!token) return res.status(401).send("Access Denied");
        token = token.slice(7, token.length).trimLeft();
        var payLoad=verifyAsync(token.toString(),process.env.SECRET_KEY);
        userid=await payLoad.then(d=>d.userid);
        //token
        let groups = await Group.find({ user: userid }).populate(['user','todos'])
        if (!groups)  return res.status(404).json({ success: false, message: "no group found" });
        res.status(200).json({ success: true, groups });
    },
    GetGroupById: async (req, res, err) => {
        const { id } = req.params
        const group = await Group.findById(id).populate('user');
        if (!group)  return res.status(404).json({ success: false, message: "group doesn't exist " });
        res.status(200).json({ success: true, group });
    },
    UpdateGroupById: async (req, res, err) => {

              // token
              let token = req.header('authentication');
              console.log(token);
              if (!token) return res.status(401).send("Access Denied");
              token = token.slice(7, token.length).trimLeft();
              var payLoad = verifyAsync(token.toString(), process.env.SECRET_KEY);
              userid = await payLoad.then(d => d.userid);
              //token
        const { id } = req.params
        const group = await Group.findOneAndUpdate({ id, user: userid }, { $set: req.body }, { new: true });
        if (!group)  return res.status(404).json({ success: false, message: "group doesn't exist " });
        res.status(200).send({ success: true, group });

    },
    DeletegroupById: async (req, res, err) => {

              // token
              let token = req.header('authentication');
              console.log(token);
              if (!token) return res.status(401).send("Access Denied");
              token = token.slice(7, token.length).trimLeft();
              var payLoad = verifyAsync(token.toString(), process.env.SECRET_KEY);
              userid = await payLoad.then(d => d.userid);
              //token
        const { id } = req.params
        Todo.deleteMany({group:id});

        const group = await Group.findOneAndDelete({ id, user: userid });
        if (!group)  return res.status(404).json({ success: false, message: "group doesn't exist " });
        res.status(200).send({ success: true, group });

    }
}