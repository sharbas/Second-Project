import { useState,useEffect } from "react";
import {Link} from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import FromContainer from '../components/FormContainer.jsx'
import {useDispatch,useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import Loader from '../components/Loader'
import {useRegisterMutation} from '../slices/usersApiSlice.js'
import { setCredentials } from "../slices/authSlice.js";


const RegisterScreen=()=>{
    const [name,setName]=useState('')

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')

const submitHandler=async(e)=>{
    e.preventDefault()
    console.log('submit');
}

    return (
        <FromContainer>
            <h1>Sign Up</h1>
            <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controllId='email'>
    <Form.Label>Name</Form.Label>
    <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
</Form.Group>

<Form.Group className="my-2" controllId='email'>
    <Form.Label>Email Address</Form.Label>
    <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
</Form.Group>

<Form.Group className="my-2" controllId='password'>
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
</Form.Group>

<Form.Group className="my-2" controllId='confirmPassword'>
    <Form.Label>Confirm password</Form.Label>
    <Form.Control type="password" placeholder="Enter confirmPassword" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
</Form.Group>

<Button type="submit" variant="primary" className="mt-3">Sign Up</Button>
<Row className="py-3">
   <Col>
   Already have an account? 
   <Link to='/login'>Login</Link>
   </Col>
</Row>
            </Form>
        </FromContainer>
    )
}
export default RegisterScreen