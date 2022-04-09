const Todo = require("../models/TodoModel");
const User = require("../models/userModel");
const { Group } = require("../models/GroupModel");
const jwt = require('jsonwebtoken');
const util = require('util');
const verifyAsync=util.promisify(jwt.verify)

module.exports = {
    AddTodo: async (req, res, next) => {

        console.log("in adding");
        const { title, group } = req.body;
        // token
        let token = req.header('authentication');
        console.log(token);
        if (!token) return res.status(401).send("Access Denied");
        token = token.slice(7, token.length).trimLeft();
        var payLoad=verifyAsync(token.toString(),process.env.SECRET_KEY);
        userid=await payLoad.then(d=>d.userid);
        //token

        const userObj = await User.findById(userid);
        if (!userObj) return res.status(404).json({ success: false, message: "user doesn't exists" });


        todoFound = await Todo.findOne({ title, user:userid });
        if (todoFound) return res.status(409).json({ success: false, message: "todo already exists" });
        let todo = await new Todo(req.body);
        if (group) {
            const _group = await Group.findById(group);
            if (!_group) return res.status(404).json({ success: false, message: "group doesn't exists" });
            console.log(todo,_group);
            _group.todos.push(todo);
            _group.save();
        }
        todo.save();
        res.status(200).send({ success: true, todo });


    },
    GetAllTodos: async (req, res, err) => {
        
        const { status } = req.query;
        if (status) {

            if (!(status == "Pending" || status == "InProgress" || status == "Completed" || status == "Missed"))
            return res.status(404).json({ success: false, message: "wrong status" });
        }
        const todos = await Todo.find({ status: { $regex: status ?? "" } }).populate(['user', 'group']);
        res.status(200).send({ success: true, todos });
    },
    GetTodoById: async (req, res, err) => {

        const { id } = req.params
        const todo = await Todo.findById(id).populate(['user', 'group']);
        if (!todo) return res.status(404).json({ success: false, message: "todo doesn't exist" });
        res.status(200).json({ success: true, todo });
    },
    GetGeneralTodosByUserId: async (req, res, err) => {
        // token
        let token = req.header('authentication');
        console.log(token);
        if (!token) return res.status(401).send("Access Denied");
        token = token.slice(7, token.length).trimLeft();
        var payLoad=verifyAsync(token.toString(),process.env.SECRET_KEY);
        userid=await payLoad.then(d=>d.userid);
        //token
        const { group } = req.query
        let todos;
        if (group) {
            todos = await Todo.find({ user: userid, group: group });
        }
        else {
            console.log("here");
            todos = await Todo.find({ user: userid, group: null });
        }
        if (!todos) return res.status(404).json({ success: false, message: "todo doesn't exist" });
        res.status(200).json({ success: true, todos });
    },
    GetAllTodosByUserId: async (req, res, err) => {
        console.log("in");
        // token
        let token = req.header('authentication');
        console.log(token);
        if (!token) return res.status(401).send("Access Denied");
        token = token.slice(7, token.length).trimLeft();
        var payLoad=verifyAsync(token.toString(),process.env.SECRET_KEY);
        userid=await payLoad.then(d=>d.userid);
        //token
        const { status } = req.query
        console.log(status);
        if (status) {
            todos = await Todo.find({ user: userid, status: status }).sort({ finishingDate: 1 });
        }
        else {
            todos = await Todo.find({ user: userid }).sort({ finishingDate: 1 });

        }
        if (!todos) return res.status(404).json({ success: false, message: "no todos" });
        res.status(200).json({ success: true, todos });
    },
    UpdateTodoById: async (req, res, err) => {
        const { id } = req.params
        const todo = await Todo.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        if (!todo) return res.status(404).json({ success: false, message: "todo doesn't exist" });
        res.status(200).send({ success: true, todo });

    },
    DeleteTodoById: async (req, res, err) => {
        const { id } = req.params
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) return res.status(404).json({ success: false, message: "todo doesn't exist" });
        res.status(200).send({ success: true, todo });
    }
}