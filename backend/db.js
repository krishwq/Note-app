const mongoose=require('mongoose');
const mongoURI="mongodb+srv://23ee01025:Krish@123@cluster0.wxfk6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const ConnectToMongo=()=>{
    mongoose.connect(mongoURI,).then(()=>console.log("connected"))
}
module.exports=ConnectToMongo