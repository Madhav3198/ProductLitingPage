import React, { useEffect, useState } from 'react'
import { Card, Form } from 'react-bootstrap'
import { CartState } from '../context/Context'

const SingleProduct = ({prod}) => {

   const {state:{cart},dispatch}= CartState() ;

    
    const cardStyle={height:100,width:100,marginTop:30}
  
    
  const [quant,setQuant]=useState();
  useEffect(()=>{
   setQuant(cart.reduce((acc,curr)=>acc+Number(curr.qty),0))
   },[cart])
    
    
  return (
    <div>
      <Card style={{display:'flex',flexDirection:'row',justifyContent:'space-around',marginBottom:20,height:150,width:1300,marginLeft:100,marginTop:20}}>
        <Card.Img variant="top" src={prod.img} alt={prod.title} style={cardStyle}/>
            <Card.Title style={{height:100,width:130,marginTop:30,fontWeight:300, fontSize:20}}>{prod.title}</Card.Title>
            <Card.Title style={{height:100,width:100,marginTop:30,fontWeight:300,fontSize:20}}>{prod.color}</Card.Title>
            <Card.Title style={{height:100,width:100,marginTop:30,fontWeight:300,fontSize:20}}>{prod.size}</Card.Title>
            <Card.Title style={{height:100,width:100,marginTop:30,fontWeight:300,fontSize:20}}>{prod.inStock}</Card.Title>
            <Card.Title style={{height:100,width:100,marginTop:30,fontWeight:300,fontSize:20}}>₹ {prod.price}</Card.Title>
            
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

            <Form.Check onClick={(event)=>{
              if(event.target.checked){
              dispatch({
                type:'ADD_TO_CART',
                payload:prod,
              })}
              else{
                dispatch({
                  type:'REMOVE_FROM_CART',
                  payload:prod,
                })
              }

            }} style={{marginTop:30,fontSize:25}}/>
      </Card>
    </div>
  )
}

export default SingleProduct
