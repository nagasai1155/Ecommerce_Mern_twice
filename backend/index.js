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
       image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

//login route



app.listen(port,(error)=>{
    if(!error){
        console.log(`Server is running on port ${port}`);
    }else{
        console.log(`Error in running the server `);
    }
})
