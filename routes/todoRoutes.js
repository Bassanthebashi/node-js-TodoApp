const express = require('express');
const router = express.Router();
const todo=require('../controllers/todoController');




router.delete('/:id',todo.DeleteTodoById);
router.patch('/:id',todo.UpdateTodoById);
router.get('/:id',todo.GetTodoById);
router.get('/',todo.GetAllTodos);
router.post('/',todo.AddTodo);

module.exports=router
