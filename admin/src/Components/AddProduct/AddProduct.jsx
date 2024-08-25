import React from "react";
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {


  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input type="text" name="name"  placeholder="Type here" />
      </div>
      <div className="addproduct-itemfield">
        <p>Product description</p>
        <input type="text" name="description"  placeholder="Type here" />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input type="number" name="old_price"placeholder="Type here" />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input type="number" name="new_price" placeholder="Type here" />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product category</p>
        <select name="category" className="add-product-selector" >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
     <div className="addproduct-itemfield">
        <label htmlFor="file-input">
            <img src={upload_area} className="addproduct-thumnail-img" alt="no image found" />
        </label>
        <input type="file"   name="image" id="file-input"hidden />

     </div>
      <button className="addproduct-btn">Add</button>
    </div>
  );
};

export default AddProduct;
