

exports.customError=({status=500,message="Server Error"})=>{
    const error =new Error()
    error.message=message;
    error.status=status
    return error
}
exports.errorHandler=(err,res)=>{
    console.log("in error handler", err.message);
    return res.status(500).json({ success: false, message:"server error" });
   
}