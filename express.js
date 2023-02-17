const dotenv=require('dotenv').config();
var express=require('express');
var app=express();
var mongoose=require('mongoose');

// var session = require('express-session');

 const jwt = require('jsonwebtoken');

const path=require('path')
const publicpath=path.join(__dirname,'public');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
// app.use(session({
//     secret: "secret",
//     saveUninitialized:true,

//     resave: false 
// }));

app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');




app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));

  var student_registers=require('./student_schema');



 

//app.use(express.static('public'));
app.get('/express',(req,resp)=>{
    resp.sendFile(__dirname  +'/stud.html');
   
});



app.post('/express',async(req,resp)=>{
      


var formdata=  new student_registers(req.body);
    // studname:req.body.studname,
    // address:req.body.address,
    // standard:req.body.standard,
    // cont:req.body.cont,
    // gender:req.body.gender,
    // dob:req.body.dob,
    // email:req.body.email,
    // password:req.body.password

//});
console.log("the success part is" +formdata);
const token=await formdata.generatetoken();
console.log(token);
await formdata.save();

resp.send(formdata);
});




// app.get('/a',(req,resp)=>{
//     resp.sendFile(__dirname  +'/homepage.html');
// });

app.get('/asd',(req,resp)=>{

    student_registers.find().then(result=>{
        resp.render(`../views/homepage`,{result});
      
    })
    .catch((y)=>{
        console.log(y);
    
    });
    
    
    });


    app.get('/student_registers/:id',(req,resp)=>{
        var _id=(req.params.id);
        student_registers.findById(_id).then(result=>{
            resp.status(200).json({display:result})
        }).catch((err)=>{
       resp.status(500).json({error:err})
        })
    })

app.get('/',(req,resp)=>{

student_registers.find().then(result=>{
    resp.status(200).json({data:result});

})
.catch((err)=>{
    resp.status(500).json({error:err})

});


});


   // get a html file --- 

// app.get('/abc',(req,resp)=>{
//     resp.sendFile(__dirname  +'/views/homepage.html');
    
   
// });





app.put('/student_registers/:id',(req,resp)=>{
   
student_registers.findOneAndUpdate({id:req.params.id},
    {
        $set:{
            
             studname:req.body.studname,
    address:req.body.address,
    standard:req.body.standard,
    cont:req.body.cont,
    gender:req.body.gender,
    dob:req.body.dob,
    email:req.body.email,
    password:req.body.password

        }
    }).then(result=>{
        resp.status(200).json({
            updatedresult:result
        });
    }).catch(err=>{
        resp.status(500).json({
            error:err
        })
    })
});

app.delete('/student_registers/:id',async(req,resp)=>{
//console.log(req.params.id);
var _id=(req.params.id);

 await student_registers.findByIdAndDelete(_id)
.then(result=>{
    resp.status(200).json({deleted:result})
}).catch(err=>{
    resp.status(500).json({error:err})
})
});


//     var _id=(req.params.id);
//    await student_registers.findByIdAndDelete(_id).then(result=>{
//   resp.status(200).json({deleted:result});
//     }).catch(err=>{
//         resp.status(500).json({error:err});
//     })


 


// *** login page ***

app.get('/login',(req,resp)=>{
    resp.sendFile(__dirname +'/login.html');

  
})

 app.get('/pqr',(req,resp)=>{
     resp.redirect('/express');
 })


 
app.post('/login',async(req,resp)=>{

    // *** We can access data from database through email****
    // var email=req.body.email;
    //  var password=req.body.password;
    // const result= await student_registers.findOne({email:email}).then(data=>{
    //     resp.status(200).json({output:data});
    // }).
    // catch(err=>{
    //     resp.status(500).json({error:err});
    // })
  
    // **  way  of login thruogh email  **
    
    try{
        const email = req.body.email;
      const password = req.body.password;
     const result = await student_registers.findOne({email:email});

        if(result.password === password){
            // resp.status(201).redirect('/express');
            resp.send('login successful')
        }
        else{
            resp.send("password is incorrect")
        }
    }
    catch(error){
        resp.status(400).send("invalid user");
    }
});

// app.post('/jwtlogin',async(req,resp)=>{
//    const  token= await Jwt.sign({_id:"63c19d518f855b0d84c0456e"},'ACCESS-KEY');
//     resp.json({
//         token:token
//     })
//})

// const createtoken=async()=>{
//   const token= await jwt.sign({_id:"63c19d518f855b0d84c0456e"},"ACCESS-KEY")
//     console.log(token)
//     const uservar=await jwt.verify(token,"ACCESS-KEY");
//     console.log(uservar);
// }

// createtoken();
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2MxOWQ1MThmODU1YjBkODRjMDQ1NmUiLCJpYXQiOjE2NzYwMzQwNTd9
//.X2xcMR9EwKDZi6plWc4a954EkvVDl0mmfJe_KuGkd94




//});

// console.log(dotenv.parsed.URL);



app.listen(process.env.PORT,()=>{
console.log("server started")
});










// app.delete('/',async(req,resp)=>{
    // var formdata=Student_Register (deleteOne({_Id:ObjectID('63c19a3795d82879c5283955')}))
// resp.send(done);
//})




// let upid=req.params.id;

// let upstudname=req.body.studname;
//     let upaddress=req.body.address;
//    let upstandard=req.body.standard;
//    let upcont=req.body.cont;
//   let upgender=req.body.gender;
//     let updob=req.body.dob;
//     let upemail=req.body.email;
//     let uppassword=req.body.password;


// student_register.findOneAndUpdate({id:upid},{$set:{studname:upstudname, address:upaddress,
// standard:upstandard,cont:upcont,gender:upgender,dob:updob,email:upemail,password:uppassword}})

