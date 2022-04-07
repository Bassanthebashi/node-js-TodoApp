const express = require('express');
const router = express.Router();
const group=require('../controllers/groupController');


router.get('/user/:id',group.GetGroupsByUserId);
router.delete('/:id',group.DeletegroupById);
router.patch('/:id',group.UpdateGroupById);
router.get('/:id',group.GetGroupById);
router.get('/',group.GetAllGroups);
router.post('/',group.AddGroup);
module.exports=router
