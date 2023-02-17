// var express=require('express');
// var path=require('path');

// var app=express();
// app.get('' ,(req,res)=>
// {

    
//     res.send(`<h1> home page</h1>
    
//     <p>user name<input type="text" placeholder="enter name" value=${req.query.name}></p>
//     <button>click me</button>

    
//     Hi this is home page`);
// });

// app.get( '/about',(req,res)=>
// {
//     res.send(`<a href="/help"> go to help page</a>`);
// });

// app.get( '/help',(req,res)=>
// {
//     res.send("Hi this is  help page");
// });

// app.listen(4200);


//**make  more html file and access it**


// var file=path.join(__dirname,'public')

// app.use(express.static(file));
// app.listen(4200);
//**--access page without extension on server */
// var file=path.join(__dirname,'public');
// app.set('view engine','ejs');
// app.get('',(req,resp)=>
// {
//     resp.sendFile(`${file}/home.html`);
// })

// app.get('/about',(req,resp)=>
// {
//     resp.sendFile(`${file}/about.html`);
// })

// app.get('/contactme',(req,resp)=>
// {
//     resp.sendFile(`${file}/contact.html`);
// })
// if we type missing address in url then by default contact page will open
// app.get('/*',(req,resp)=>
// {
//     resp.sendFile(`${file}/contact.html`);
// })


//ejs used here-----
// app.get('/index',(req,resp)=>
// {
//     var data={
//         name:'abc',
//         email:'abc@gmail.com',
//         contact:'9009786567',
//         skills:['java','javascript','php','python']
//     }
//     resp.render('index',{data});
// })


// app.listen(8080);




//mongodb+srv://Sayali:123456%40@cluster0.mk3tnku.mongodb.net/test
//*--connect mongodb--
//  --For create single operation use this code--
// const {MongoClient}= require('mongodb');
// const url='mongodb+srv://Sayali:123456%40@cluster0.mk3tnku.mongodb.net';
// const client= new MongoClient(url);
// var database='ecom';

// async function getdata(){
//     var result=await client.connect();
//     var db=result.db(database);
//     
  //  var collection=db.collection('product');
//var response= await collection.find({}).toArray();
//console.log(response);
//}

// getdata()




//--To create multiple operation use following code--
//--in this code read  data from monfodb--


// ** mongodb get put post  delete method with  node js **

// var express=require('express');

//const url='mongodb+srv://Sayali:123456%40@cluster0.mk3tnku.mongodb.net';
// const {MongoClient}= require('mongodb');
// const url='mongodb+srv://Sayali:123456%40@cluster0.mk3tnku.mongodb.net/test';
// const client= new MongoClient(url);
// var database='ecom';

// async function getdata(){
//     var result=await client.connect();
//     var db=result.db(database);
//     return db.collection('product');

// }
// getdata();
// var app=express();
// app.use(express.json());  // it is require to acceess data from postman
// // read data in mongodb with node js through api
// app.get('/',async(req,resp)=>{
//   var data=await getdata();
//   data=await data.find().toArray();
//   resp.send(data)
//   console.log(data);

// });

// // write(create) data
// app.post('/',async(req,resp)=>{
//   console.log(req.body);
//   var data=await getdata();
//   var result=await data.insertOne(req.body);

// resp.send(result);
// });


// // update data
// app.put('/',async(req,resp)=>{
//   var data=await getdata();
//   var result= await data.updateOne({name:'sayali'},{
//     $set:req.body//<- or -> {name:'sayali',age:23}
//   });
  
//   resp.send({result:"updated"});

// });


// //** dalete data **
// app.delete('/:id',async(req,resp)=>{
//   var data=await getdata();
//   console.log(req.params.id);
// var result= await data.deleteOne({_id:new mongodb.ObjectId(req.params.id)})
 
//   resp.send(result);
// })



// app.listen(4200)
// getdata().then((resp)=>{
//     resp.find({}).toArray().then((data)=>{
//         console.log(data);
//     })
// })

//or


// const main=async()=>{
//     let data=await getdata();
//     data=await data.find().toArray();
//     console.log(data);

// }



// -- data delete from mongodb
// const main=async()=>{
//      let data=await getdata();
//     var result=await data.deleteOne({name:'vivo'})
 
//       console.log(result);

//  }

//main();



// --update --
//  const main=async()=>{
//  let data=await getdata();
//  var result=await data.updateOne({name:"keyboard"},{$set:{name:'poco'}})

//     console.log(result);

//  }

// main();


// const main=async()=>{
//   let data=await getdata();
//   var result=await data.insertOne({name:"keyboard",price:565})
 
//      console.log(result);
 
//   }
 
//  main();






// mongoose
const  mongoose =require('mongoose');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://Sayali:123456%40@cluster0.mk3tnku.mongodb.net/ecom');

// api method with node js and mongoose ---
var express= require('express');
var app =express();
app.use(express.json());
const productschema= new mongoose.Schema({
    name:String,
    price:Number
});
const products=mongoose.model('product',productschema);
app.post('/create',async(req,resp)=>{
    const data= new products(req.body);
    var result= await data.save();
    console.log(req.body)
    console.log(result);
    resp.send("posted data")
});
app.listen(4200);


// ** crud operation with node js and moongoose ** 
//mongoose.set('strictQuery', true);
//const productschema= new mongoose.Schema({
//     name:String,
//     price:Number
// });

const main=async()=>{
    const products=mongoose.model('product',productschema);
    let data=new products({
        name:'nokia',
        price:565,
        brand:'apple'
    });
    const result=await data.save();
    console.log(result);
}
//main()


const update=async()=>{
    const products=mongoose.model('product',productschema);
    var data=await products.updateOne(
        {name:'nokia'},
        {$set:{name:'one-plus'}}
    )
    console.log(data);
    
}
//update();

const find=async()=>{
    const products=mongoose.model('product',productschema);
    var data=await products.find();
    console.log(data);
}
//find();

const deleteindb=async()=>{
    const products=mongoose.model('product',productschema);
    var data=await products.deleteOne({name:'one-plus'});
    console.log(data);
}
//deleteindb();



// os module --
//const os=require('os');
//console.log(os.arch());
//console.log(os.freemem()/(1024*1024*1024));
//console.log(os.totalmem()/(1024*1024*1024));
// console.log(os.hostname())
// console.log(os.platform())
// console.log(os.userInfo())


// events and eventemitter
var EventEmitter=require('events');
var event=new EventEmitter();

event.on("countAPI",()=>{
    console.log("event called")
})

app.get('/',(req,resp)=>{
    resp.send('api called');
    event.emit("countAPI")
});

app.get('/search',(req,resp)=>{
    resp.send('search api called');
});

app.get('/update',(req,resp)=>{
    resp.send('update api called');
});

app.listen(5000);