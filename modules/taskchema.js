const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://lakhichan007:12345@cluster0.wj9up0u.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("connnected to task dataBase")
})
.catch((err)=>{
    console.log(err)
})

const tastSchema= new mongoose.Schema({
    id:{type:Number},
    title:{type:String},
    is_completed:{type:Boolean}

})

const Task =mongoose.model("myTask",tastSchema)

module.exports =Task