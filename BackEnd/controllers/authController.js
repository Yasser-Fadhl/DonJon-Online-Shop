const User= require('../models/user')
const catchAsyncErorrs =require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken')
exports.registerUser =catchAsyncErorrs(async(req,res,next) => {
    const{name, email, password} =req.body;
    const user =await User.create({
                       name,
                       email,
                       password,
                       avatar:{
                        public_id:'',
                        url:''
                       }
                    })
   sendToken(user,200,res);
});

exports.loginUser=catchAsyncErorrs(async(req, res, next)=>{
    const {email,password}=req.body
    if (!email || !password){
       return next(new ErrorHandler('Please enter email or Password',400)) 
    } 
     const user= await User.findOne({email}).select('+password')
  if (!user){
 return next(new ErrorHandler('Invalid email or password',401))
}
   const isPaswordMatched=await user.comparePassword(password)
   if (!isPaswordMatched) {return next(new ErrorHandler('Invalid password or Email 2',401))}
   sendToken(user,200,res);
    
})