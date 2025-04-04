const mongoose=require('mongoose');
// const mongoURI="mongodb+srv://23ee01025:KrishnenduBir@cluster0.f4nm2.mongodb.net/notes?retryWrites=true&w=majority&appName=Cluster0"
// const mongoURI="mongodb://localhost:27017/inoteBook"
const mongoURI="mongodb+srv://23ee01025:Krishnendu987@cluster0.lzvnzgn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const ConnectToMongo=()=>{
    mongoose.connect(mongoURI,).then(()=>console.log("connected"))
}
module.exports=ConnectToMongo