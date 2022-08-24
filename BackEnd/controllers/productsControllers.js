
const Product = require('../models/product.js')
const ErrorHandler=require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors.js')

exports.getProducts=catchAsyncErrors(async(req, res, next)=>{
const products= await Product.find()
res.status(200).json({
    success: true ,
    count: products.length,
    products
})
})
exports.newProducts=catchAsyncErrors( async(req, res, next)=>{
    const product= await Product.create(req.body)
    res.status(203).json({success: true, 
                        product})
    })

exports.getOneProduct = catchAsyncErrors(async (req,res,next)=>{
    const product = await Product.findById(req.params.id)
    if(!product) {  
        return next(new ErrorHandler('Product not found',404))
 }
    
    else res.status(200).json({success: true,
                          product})
})

exports.updateProduct = catchAsyncErrors(async (req, res, next)=>{
    const product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators:true,
        useFindAndModify: false,
    })
    if (product) {
        res.status(200).json({ 
            success: true ,
            product
    })}
    if(!product) {  
        return next(new ErrorHandler('Product not found',404))
 }})
 
 exports.deleteProduct =catchAsyncErrors(async(req, res, next)=>{
    const product = await Product.findByIdAndDelete(req.params.id)
    if(!product) return next(new ErrorHandler('Product not found',404))
    if(product)res.status(200).send({message:'Product deleted successfully',product})
 })