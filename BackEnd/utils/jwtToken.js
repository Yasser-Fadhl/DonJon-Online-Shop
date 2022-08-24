
module.exports=sendToken= (user, statusCode, res) =>{
    const token = user.getJwt();
    const options={
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRY*24 * 60 * 60 * 1000),
        httpOnly: true,
    }
res.status(statusCode).cookie('token', token,options).json({
    success:true,
    token,
    user

})

}