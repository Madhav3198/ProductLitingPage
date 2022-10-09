import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { CartState } from '../context/Context'
import {AiFillDelete} from 'react-icons/ai'
import './styles.css'

const Cart = ({prod}) => {

  const {
    state:{cart},dispatch,
  } = CartState();

  const [cart1,setCart] = useState([]);

  const handleChange = (prod, d) => {
    const ind = cart.indexOf(prod);
    const arr = cart;
    arr[ind].amount += d;

    if (arr[ind].amount === 0) arr[ind].amount = 1;
    setCart([...arr]);
  };

  const space={margin:20}
  const qtyButton ={height:30,width:30,marginTop:20}


  const [total,setTotal]=useState();

  useEffect(()=>{
   setTotal(cart.reduce((acc,curr)=>acc+Number(curr.price)*curr.qty,0))
   },[cart])


  const [quant,setQuant]=useState();
   useEffect(()=>{
    setQuant(cart.reduce((acc,curr)=>acc+Number(curr.qty),0))
    },[cart])
   
  
  return (
    <div className='home'>
      <div className='productContainer'>
      <div className="labels1">
     <div className="Remove">
      <span>Remove </span>
     </div>
     <div className="Image1">
      <span>Image</span>
     </div>
     <div className="Product1">
      <span>Product</span>
     </div>
     <div className="Color1">
      <span>Color</span>
     </div>
     <div className="Size1">
      <span>Size</span>
     </div>
     <div className="Price1">
      <span>Price</span>
     </div>
     <div className="Qty1">
      <span>Qty</span>
     </div>
     <div className="addToCart">
      <span>Subtotal</span>
     </div>
     </div>  

        <ListGroup>
      {
        cart.map((prod)=>(
          <ListGroup.Item key={prod.id} style={{width:975}}>
            <Row>
            <Col md={1}style={space}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: prod,
                      })
                    }
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
              <Col md={2}>
                <Image src={prod.img} alt={prod.title} fluid rounded/>
              </Col>
              <Col md={1} style={space}>
                <span>{prod.title}</span>
              </Col>
              <Col md={1} style={space}>
                <span>{prod.color}</span>
              </Col>
              <Col md={1} style={{marginTop:20}}>
                <span>{prod.size}</span>
              </Col>
              <Col md={1} style={space}>
                <span>₹ {prod.price}</span>
              </Col>

             
              <Form.Control style={{height:40,width:40,marginTop:20,paddingBottom:10}}
                 as="select"
                 value={prod.qty}
                 onChange={(e)=>{
                   dispatch({
                     type:"CHANGE_CART_QTY",
                     payload:{
                         id:prod.id,
                         qty:e.target.value
                     }
                   })
                 }}
                >
                 {[...Array(prod.stock).keys()].map((x)=>(
                  <option key={x+1}>{x+1}</option>
                 ))}
                </Form.Control> 
                
                <Col md={1} style={space}>
                <span>₹ {prod.price*prod.qty}</span>
              </Col>
            </Row>
          </ListGroup.Item>
        ))
      }
        </ListGroup>
      </div>
      <div className='SubTotal summary'>
        <span style={{fontWeight:200,fontSize:20,marginTop:60}} className='title'>Subtotal ({quant}) items</span>
        <span style={{fontWeight:400,fontSize:25}}>Total: ₹ {total}</span>
        <Link to="/checkout">
          <Button variant="success" type="button" disabled={cart.length ===0}>
            Proceed to Checkout
          </Button>
        </Link>
      </div> 
    </div>
  )
}

export default Cart
