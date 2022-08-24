const mongoose= require('mongoose')
const bcrypt= require('bcryptjs')
const validator= require('validator')
const JWT= require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your name cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Your password must be longer than 6 characters'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
          //  required: true
        },
        url: {
            type: String,
        // required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date

})
userSchema.pre('save', async function() {
    if (!this.isModified('password')){ next();}
       

  this.password = await bcrypt.hash(this.password,10) })

userSchema.methods.comparePassword=async function(insertedPassword){
    return await bcrypt.compare(insertedPassword,this.password)
}

userSchema.methods.getJwt = function(){
    return JWT.sign({id:this._id},process.env.JWT_SECRET_KEY,
       {expiresIn: process.env.JWT_EXPIRY }
          )
}


module.exports = mongoose.model('User', userSchema)