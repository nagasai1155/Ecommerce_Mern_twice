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
//add product end point 
app.post('/addproduct',async(req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length > 0){
        let last_product_array = products.slice(-1);
        let last_product= last_product_array[0];
        id=last_product.id+1;
    }else{
        id=1;
    }
        try{
            const product =  new Product({
                id:id,
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

//removing the data from the database 
app.delete('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("removed");
    res.json({name:req.body.name,message:"product removed successfully"})
})

//get all the products from the database
app.get('/getproducts',async(req,res)=>{
    let products = await Product.find({});
    console.log("all products fecthd");
    res.send(products);
})

app.listen(port,(error)=>{
    if(!error){
        console.log(`Server is running on port ${port}`);
    }else{
        console.log(`Error in running the server `);
    }
})
