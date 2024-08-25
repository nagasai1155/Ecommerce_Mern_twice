import React from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'
const ListProduct = () => {
  return (
    <div className="listproduct">
    <h1>All Products List</h1>
    <div className="listproduct-format-main">
      <p>Products</p> <p>Title</p> <p>Old Price</p> <p>New Price</p> <p>Category</p> <p>Remove</p>
    </div>
    
  </div>
  )
}

export default ListProduct