const express=require('express')
const router= express.Router();
const{getProducts,getOneProduct,newProducts,updateProduct,deleteProduct}=require('../controllers/productsControllers')

router.route('/products').get(getProducts)
router.route('/products/new').post(newProducts)
router.route('/products/:id').get(getOneProduct)
router.route('/admin/products/:id')
                .put(updateProduct)
                .delete(deleteProduct)


module.exports=router;

