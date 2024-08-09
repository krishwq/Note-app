const mongoose=require('mongoose');
const mongoURI="mongodb+srv://23ee01025:r9kaZA93cVd3ApmR@cluster0.hjgbzkh.mongodb.net/notes?retryWrites=true&w=majority&appName=Cluster0"
const ConnectToMongo=()=>{
    mongoose.connect(mongoURI,).then(()=>console.log("connected"))
}
module.exports=ConnectToMongo