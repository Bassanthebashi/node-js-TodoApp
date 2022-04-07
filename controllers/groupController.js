const Todo = require("../models/TodoModel");
const { Group } = require("../models/GroupModel");
const User = require("../models/UserModel");

module.exports = {
    AddGroup: async (req, res, err) => {

        const { user, title } = req.body;
        const userObj = await User.findById(user);
        if (!userObj)  return res.status(404).json({ success: false, message: "user doesn't exist " });
        const oldgroup = await Group.findOne({ title });
        if (oldgroup)  return res.status(409).json({ success: false, message: "topic already exist " });
        const group = await new Group(req.body);
        await group.save();
        res.status(200).send({ success: true, group });
    },
    GetAllGroups: async (req, res, err) => {

        const { user } = req.query;
        let groups;
        if (user) {
            let userObj = await User.findById(user);
            if (!userObj)  return res.status(404).json({ success: false, message: "user doesn't exist " });
            groups = await Group.find({ user }).populate('user');
        }
        else { 
            groups = await Group.find().populate('user'); 
        }
        res.status(200).send({ success: true, groups });
    },
    GetGroupsByUserId: async (req, res, err) => {

        const { id } = req.params
        let groups = await Group.find({ user: id }).populate(['user','todos'])
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

        const { id } = req.params
        const group = await Group.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        if (!group)  return res.status(404).json({ success: false, message: "group doesn't exist " });
        res.status(200).send({ success: true, group });

    },
    DeletegroupById: async (req, res, err) => {

        const { id } = req.params
        Todo.deleteMany({group:id});

        const group = await Group.findByIdAndDelete(id);
        if (!group)  return res.status(404).json({ success: false, message: "group doesn't exist " });
        res.status(200).send({ success: true, group });

    }
}