const { Schema,model } = require('mongoose');
const mongoose= require('mongoose');

const GroupSchema = new Schema({
    title: {
        type: "string",
        required: true
    },
    description: {
        type: "string",
        required: false,
        default:"I want to make regular small habits for this topic to be hero"
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    }
    // ,
    // todos:[{
    //     type:mongoose.Types.ObjectId,
    //     ref:'Todo',
    //     required:false
    // }]
},{timestamps:true});

exports.Group=model("Group",GroupSchema);