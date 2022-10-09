import React from 'react'
import { CartState } from '../context/Context'
import SingleProduct from './SingleProduct';
import './styles.css'
import Button from 'react-bootstrap/Button';
import {GrPowerReset} from 'react-icons/gr'


const Home = () => {
  const {
      state: {
          list
      }
  } = CartState();
  console.log(list);

  const [items,setItems] = React.useState(list);
  const [filterType, setFilterType] = React.useState(false);
  const [sizefilterType, setSizeFilterType] = React.useState(false);
  const [colorfilterType,setColorFilterType]=React.useState(false);
  const [pricefilterType,setPriceFilterType]=React.useState(false);
  const [searchTerm, setSearchTerm]= React.useState("");

 
  
const filteredItems = items.filter((item) => {
    return (!filterType || filterType === item.type) &&
           (!searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase())) && 
           (!sizefilterType || sizefilterType === item.size) &&
           (!colorfilterType || colorfilterType === item.color) && 
           (!pricefilterType || pricefilterType === item.price) 

});


function resetProducts(){
setFilterType(false);
setSizeFilterType(false);
setColorFilterType(false);
}
  return (
   <div >
    <div className="main-div">
     <div className="main-div-1">
      <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
        <option value="">All Clothes</option>
        <option value="Hoodie">Hoodies</option>
        <option value="Shirt">Shirt</option>
        <option value="T-Shirt">T-Shirt</option>
        <option value="Jacket">Jackets</option>
        </select>
      </div>
      <div className="main-div-1">
        <select value={sizefilterType} onChange={(e) => setSizeFilterType(e.target.value)}>
          <option value="">All Size</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </div>
      <div className="main-div-1">
        <select value={colorfilterType} onChange={(e) => setColorFilterType(e.target.value)}>
          <option value="">All Colors</option>
          <option value="Blue">Blue</option>
          <option value="Black">Black</option>
          <option value="Red">Red</option>
          <option value="Green">Green</option>
          <option value="Brown">Brown</option>
          <option value="Gray">Gray</option>
        </select>
      </div>
      
      <Button onClick={resetProducts } variant="warning">Reset&nbsp;<GrPowerReset color="white" fontSize="20px"/></Button>{' '}
      <input type="text" className="search" placeholder="Search for Products" onChange={(e) => {setSearchTerm(e.target.value);}}/>
     </div>

     <div className="labels">
     <div className="Image">
      <span>Image</span>
     </div>
     <div className="Product">
      <span>Product</span>
     </div>
     <div className="color">
      <span>Color</span>
     </div>
     <div className="size">
      <span>Size</span>
     </div>
     <div className="stock">
      <span>Stock</span>
     </div>
     <div className="price">
      <span>Price</span>
     </div>
     <div className="addToCart">
      <span>Buy</span>
     </div>
     </div>  
     {filteredItems.map((prod) => (
       <SingleProduct prod={prod} key={prod.id}/>
      ))}
   </div>
  )
}

export default Home