

exports.customError=({status=500,message="Server Error"})=>{
    error =new Error()
    error.message=message;
    error.status=status
    

}
exports.errorHandler=(err,res)=>{
   
    return res.status(404).json({ success: false, message:err.message });
}