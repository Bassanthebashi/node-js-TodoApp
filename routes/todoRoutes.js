const express = require('express');
const router = express.Router();
const todo=require('../controllers/todoController');



router.get('/user/:id',todo.GetAllTodosByUserId);
router.get('/General/user/:id',todo.GetGeneralTodosByUserId);
router.delete('/:id',todo.DeleteTodoById);
router.patch('/:id',todo.UpdateTodoById);
router.get('/:id',todo.GetTodoById);
router.get('/',todo.GetAllTodos);
router.post('/',todo.AddTodo);

module.exports=router
