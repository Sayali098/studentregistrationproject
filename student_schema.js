//var mongoose=require('mongoose');


//mongoose.connect('mongodb://localhost:27017/StudentDB');
//mongoose.set('strictQuery', true);
var mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
mongoose.connect("mongodb://0.0.0.0:27017/StudentDB")
.then(()=>{
  console.log('connection done');

}).catch(()=>{
   console.log('connection failed');
});




const userSchema=new mongoose.Schema({
  _id:
      {
    //    type:mongoose.ObjectId
        type:mongoose.Schema.Types.ObjectId
        },
 
    studname:{
        type:String
    },
    address:
    {
        type:String
    },
    standard:{
        type:Number
    },
    cont:{
        type:Number
    },

    gender:{
        type:String
    },
    dob:{
        type:Date
    },
    email:
    {
        type:String
    },
    password:
    {
        type:String
    },
    tokens:[{
        token:{
            type:String
        }
    }]

});

userSchema.methods.generatetoken=async function(){
    try{
        console.log(this._id)
  const token=jwt.sign({_id:this._id.toString()},"ACCESS-KEY");
  this.tokens=this.tokens.concat({token:token})
  //console.log(token);
await this.save();
  return token;
 
    }
    catch(error){
console.log("the error part is" +error)
    }
}

const student_registers=mongoose.model('student_registers',userSchema);
module.exports=student_registers;