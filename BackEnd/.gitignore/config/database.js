const mongoose= require('mongoose')
const  DatabaseConnection= async()=>{
    await mongoose.connect(process.env.DB_URL)
    //mongodb+srv://YasserFadhl:yasoory1996@cluster0.feh0e.mongodb.net/test
    .then((c)=>{
        console.log('DataBase is Connected');
    })
    //.catch(ex=>{
       // console.log(""+ex);
   // })
//     const productSchema = new mongoose.Schema({
//      name: String,
//      model: String
//     })
//     const product = mongoose.model('Product', productSchema)
//      const Shirt= new product({name:'Polo',
//     model:'426386272dsmxnw2'})
// Shirt.save()

    
}
module.exports=DatabaseConnection;