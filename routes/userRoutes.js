const express = require('express');
const router = express.Router();
const user=require('../controllers/userController');

router.post('/login',user.Login);
router.delete('/:id',user.DeleteUserById);
router.patch('/:id',user.UpdateUserById);
router.get('/:id',user.getUserById);
router.get('/',user.getAllUsers);
router.post('/',user.addUser);

module.exports=router