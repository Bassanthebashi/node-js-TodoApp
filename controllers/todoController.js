const Todo = require("../models/TodoModel");


module.exports = {
    AddTodo: async (req, res, err) => {
        // if (group) {
        //     const _group = await Group.findById(group);

        //     if (!_group) res.status(404).json({ success: false, ErrorMessage: "this Group does not exist" });
        //     // Group.updateOne({ _id: group }, { $push: { todos: todo._id } });

        // }
        // Group.updateOne({ _id: group }, { $push: { todos: todo._id } });
        const { title } = req.body;
        todoFound = await Todo.findOne({ title });
        if (todoFound) res.status(400).json({ success: false, ErrorMessage: "Todo already exists" });
        const todo = await new Todo(req.body);
        todo.save();
        res.status(200).send({ success: true, todo });

    },
    GetAllTodos: async (req, res, err) => {

        const { status } = req.query;
        // if (group) {
        //     const _group = await Group.findById(group);
        //     if (!_group) res.status(404).json({ success: false, ErrorMessage: "this Group not existed" });
        // }
        if (status) {

            if (!(status == "Pending" || status == "InProgress" || status == "Completed" || status == "Missed")) res.status(404).send({ success: false, ErrorMessage: "this Group not existed" });
        }
        const todos = await Todo.find({status:{$regex: status?? "" }}).populate('user');
        res.status(200).send({ success: true, todos });
    },
    GetTodoById: async (req, res, err) => {

        const { id } = req.params
        const todo = await Todo.findById(id).populate('user');
        if (!todo) res.status(404).send({ success: false, ErrorMessage: "Todo doesn't exist" });
        res.status(200).json({ success: true, todo });
    },
    UpdateTodoById: async (req, res, err) => {

        const { id } = req.params
        const todo = await Todo.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        if (!todo) res.status(404).send({ success: false, ErrorMessage: "Todo doesn't exist" });
        res.status(200).send({ success: true, todo });

    },
    DeleteTodoById: async (req, res, err) => {

        const { id } = req.params
        const todo = await Todo.findByIdAndDelete(id);
        // const user = User.findById(todo.user);

        if (!todo) res.status(404).send({ success: false, ErrorMessage: "Todo doesn't exist" });

        // user.todos.pull(todo._id);
        res.status(200).send({ success: true, todo });

    }
}