const { Todo } = require("../models/TodoModel");
const { Group } = require("../models/GroupModel");
const User = require("../models/UserModel");

module.exports = {
    AddGroup: async (req, res, err) => {

        const { user } = req.body;

        const userObj = await User.findById(user);

        if (!userObj) res.status(404).json({ success: false, ErrorMessage: "this User does not exist" });

        const group = await new Group(req.body);

        await group.save();
        // User.updateOne({ _id: userId }, { $push: { groups: group._id } });

        res.status(200).send({ success: true, group });

    },
    GetAllGroups: async (req, res, err) => {

        const { user } = req.query;
        if (user) {
            let userObj = await User.findById(user);
            if (!userObj) res.status(404).send({ success: false, ErrorMessage: "this User not existed" });
            groups = await Group.find({ user }).populate('user');

        }
        else { groups = await Group.find().populate('user'); }
        res.status(200).send({ success: true, groups });
    },
    GetGroupById: async (req, res, err) => {

        const { id } = req.params
        const group = await Group.findById(id).populate('user');
        if (!group) res.status(404).json({ success: false, ErrorMessage: "Group doesn't exist" });
        res.status(200).json({ success: true, group });
    },
    UpdateGroupById: async (req, res, err) => {

        const { id } = req.params
        const group = await Group.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        if (!group) res.status(404).send({ success: false, ErrorMessage: "Group doesn't exist" });
        res.status(200).send({ success: true, group });

    },
    DeletegroupById: async (req, res, err) => {

        const { id } = req.params
        // const user=User.findById(group.user);
        const group = await Group.findByIdAndDelete(id);
        if (!group) res.status(404).send({ success: false, ErrorMessage: "Group doesn't exist" });
        //user.todos.pull(group._id);
        res.status(200).send({ success: true, group });

    }
}