//backend process complete with all packages loaded 
const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

//middleware

app.use(express.json());
app.use(cors());

//connect to mongodb
mongoose.connect("mongodb+srv://nagasaibalam:abcd1234@cluster0.kso60hi.mongodb.net/tutorials")

//api creation
app.get("/",(req,res)=>{
    res.send("express app is running");
})

//image storage engine
const storage = multer.diskStorage({
    destination:'./upload/images',
     filename:(req,file,cb)=>{
        return cb(null,`%{file.fieldname}_${Date.now()} ${path.extname(file.originalname)}`)
     }
});

const upload = multer({storage:storage});

//upload route
app.use('/images',express.static('/upload/images'))
app.post('/upload',upload.single('product'),(req,res)=>{
    res.json({
       success:1,
       image_url:`http://localhost:${port}/images/${req.file.fieldname}`
    })
})

//schema for creating products 
const Product = mongoose.model("Product",{
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    new_price:{
        type:Number,
        required:true
    },
    old_price:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    avilable:{
        type:Boolean,
        default:true
    }
})

app.post('/addproduct',async(req,res)=>{
        try{
            const product =  new Product({
                id:req.body.id,
                name:req.body.name,
                image:req.body.image,
                category:req.body.category,
                new_price:req.body.new_price,
                old_price:req.body.old_price
            });
            console.log(product);
            await product.save();
            console.log("saved");
            res.json({message:"product added successfully"})
        }catch(error){
            res.json({error:error.message})
        }
})

app.listen(port,(error)=>{
    if(!error){
        console.log(`Server is running on port ${port}`);
    }else{
        console.log(`Error in running the server `);
    }
})
