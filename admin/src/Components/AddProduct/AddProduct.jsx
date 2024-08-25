import React, { useState } from "react";
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
const [image,setImage] = useState(false);
const [productDetails,setProductDetails] = useState({
    name:"",
    image:"",
    category:"women",
    new_price:"",
    old_price:""
});
//covering with the imaage
const imageHandler =(e)=>{
   setImage(e.target.files[0]);
}
const changeHandler =(e)=>{
    setProductDetails({...productDetails,[e.target.name]:e.target.value});
}

//adding image to the upload folder in the backend
const Add_Product=async ()=>{
    console.log(productDetails);
    let responseData;
    let product = productDetails;
    let formData = new FormData();
    formData.append('product',image);

    await fetch('http://localhost:4000/upload',{
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
        body: formData,
    }).then((resp)=>resp.json()).then((data)=>{responseData=data})
    if(responseData.success){
        product.image=responseData.image_url;
        console.log(product);
        await fetch('http://localhost:4000/addproduct',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        }).then((resp)=>resp.json()).then((data)=>{
            // data.success?alert("product added successfully"):alert("failed");
            if(data){
                alert("added successfully");
            }
        })
        
    }
}
  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input type="text" name="name" value={productDetails.name} onChange={changeHandler} placeholder="Type here" />
      </div>
      <div className="addproduct-itemfield">
        <p>Product description</p>
        <input type="text" name="description"  placeholder="Type here" />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input type="number" value={productDetails.old_price}  onChange={changeHandler} name="old_price"placeholder="Type here" />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input type="number" value={productDetails.new_price}  onChange={changeHandler} name="new_price" placeholder="Type here" />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product category</p>
        <select  value={productDetails.category} onChange={changeHandler} name="category" className="add-product-selector" >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
     <div className="addproduct-itemfield">
        <label htmlFor="file-input">
            <img src={image?URL.createObjectURL(image):upload_area} className="addproduct-thumnail-img" alt="no image found" />
        </label>
        <input type="file" onChange={imageHandler}  name="image" id="file-input"hidden />

     </div>
      <button onClick={()=>{Add_Product()}} className="addproduct-btn">Add</button>
    </div>
  );
};

export default AddProduct;
