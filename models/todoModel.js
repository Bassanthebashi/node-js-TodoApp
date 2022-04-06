const {Schema,model}=require('mongoose');
const {default:mongoose}=require('mongoose');

const TodoSchema=new Schema({
    title:{
        type:"string",
        required:true
    },
    creationDate:{
        type:Date,
        required:true,
        default:Date.now()
    },
    finishingDate:{
        type:Date,
        required:false
    },
    status:{
        type:"string",
        enum:['Pending',"InProgress",'Completed','Missed'],
        required:false,
        default:'Pending'
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    }
})

module.exports =model('Todo',TodoSchema);