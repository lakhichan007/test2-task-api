const express = require("express")
const cors= require("cors")
const app=express()
app.use(cors())
const Task= require("../modules/taskchema")
const port =process.env.PORT || 5001

app.use(express.json())


app.get("/",(req,res)=>{
    res.send("hello world")
})

app.post("/addTask",async(req,res)=>{

    try{
        const totalCount=await Task.count()
        if(Array.isArray(req.body)){
            for(let ele of req.body){

                await Task.create({
                    id:totalCount+1,
                    title:ele.title,
                    is_completed:ele.status
                })
            }
        }
        else{
            await Task.create({
                id:totalCount+1,
                title:req.body.title,
                is_completed:req.body.is_completed
            })
        }
        res.status(201).json({
            id:totalCount+1
        })
    }
    catch(err){
        res.json({
            message:err
        })
    }
})

app.get("/alltask",async(req,res)=>{
    try{

        let data = await Task.find()


        res.status(201).json({
            data
        })
    }
    catch(err){
        res.json({
            message:err
        })
    }
})

app.get("/task/:id",async(req,res)=>{

    try{

    let data= await Task.find({id:req.params.id})

    res.status(201).json({
        data
    })
    }
    catch(err){
        res.json({
            message:err
        })
    }
})

app.delete("/task/:id",async(req,res)=>{

    try{
        const data= await Task.deleteOne({id:req.params.id})
        res.status(201).json({
            message:"deleted",
            data
        })
    }
    catch(err){
        res.json({
            message:err
        })
    }
})

app.patch("task/:id",async(req,res)=>{
    const data= await Task.findOneAndUpdate({id:req.params.body},{title:req.body.title,
        is_completed:req.body.is_completed})
})

app.delete("/task",async(req,res)=>{
    try{
        let deleteed=[]
        for(ele of req.body){
            const itemdelete= await Task.deleteOne({id:ele})
            deleteed.push(itemdelete)
        }
        res.status(201).json({
            message:"deleted",
            deleteed
        })

    }
    catch(err){
        res.json({
            message:err
        })
    }
})

app.listen(port,()=>{
    console.log(`your server is runnig at ${port}`)
})