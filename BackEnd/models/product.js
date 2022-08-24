const mongoose=require('mongoose')
const productSchema=require = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter the product name'],
        trim: true,
        maxlenght:[100, 'product name should be less than 100 characters'],
    },
    price : {
        type: Number,
        required: [true,'Please enter the product Number'],
        maxlenght:[5, 'product Number should be less than 5 characters'],
        default:0.0000 
        },
         description : {
            type: String,
            required: [true,'Please enter the product description'],
            },
        ratings : {
                type: Number,
                default:0                },
        image : [{
                    public_id:{
                        type: String,
                        required: true
                    }, 
                    url:{
                        type: String,
                        required: true
                    }
                }],
        category: {
            type: String,
            required:[ true, 'please enter a valid category name'],
            enum:{
            values: ['Electronics','Accessories', 'Cameras','Food'],
            message: 'please enter a valid category name'}
        },
        seller: { 
            type: String,
            required: [true,'Please enter a valid seller name']
        },
        stock: { 
            type: Number,
            required: [true,'Please enter a stock number'],
            maxLength:[5, 'product name should be less than 5 characters'],
            default:0
        },
        numOfReviews: { 
            type: Number,
            default:0
        },
        reviews: [{
            name:{
                type: String,
                required: true
            },
            rating:{
                type: String,
                required: true
            },
            comment:{
                type: String,
                required: true
            }
           
        }],
        createdAt: {
            type: Date,
            default: Date.now
        }
       }
)
module.exports = mongoose.model('Product', productSchema)