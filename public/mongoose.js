const  mongoose =require('mongoose');
mongoose.connect('mongodb+srv://Sayali:123456%40@cluster0.mk3tnku.mongodb.net/test')



const productschema=new mongoose.Schema({
    name:String,
    price:Number,
    brand:String
})

const main=async()=>{
    const product=mongoose.model('product',productschema);
    let data=new product({
        name:'one-plus',
        price:565,
        brand:'apple'
    });
    const result=await data.save();
    console.log(result);
}
main();