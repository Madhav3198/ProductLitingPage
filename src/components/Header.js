import React, { useEffect, useState } from 'react'
import { Badge, Col, Container, Dropdown, Nav, Navbar, SplitButton } from 'react-bootstrap'
import {FaShoppingCart} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { CartState } from '../context/Context'
import Button from 'react-bootstrap/Button';

const Header = () => {

const {
  state:{ cart}
}=CartState();

const [quant,setQuant]=useState();
const space={margin:20}

useEffect(()=>{
 setQuant(cart.reduce((acc,curr)=>acc+Number(curr.qty),0))
 },[cart])

  return (
   <Navbar bg="dark" variant='dark' style={{height:80}}>
    <Container style={{maxWidth:900}}>
        <Navbar.Brand>
            <Link to="/">Madhav's Store</Link>
        </Navbar.Brand>
    <Nav>
   <Link to="/cart">
   <Button variant="success">
              <FaShoppingCart color="white" fontSize="25px" />
             <span>&nbsp;&nbsp;Add to Cart</span>
        </Button>
   </Link>
    </Nav>
    </Container>
   </Navbar>
  )
}

export default Header
