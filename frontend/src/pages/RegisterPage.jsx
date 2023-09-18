import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'

const RegisterPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // const { userInfo } = useSelector((state) => state.auth)

    const [register, {isLoading}] = useRegisterMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            toast.error('Passwords do not match')
        }else{
            try{
                const res = await register({
                    name,
                    email,
                    password
                }).unwrap()
                dispatch(setCredentials({...res}))
                navigate('/')
            }catch(err){
                toast.error(err?.data?.message || err.error)
            }
        }
    }
  return (
    <>
        <FormContainer>
            <h1>Sign Up</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='my-2' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder='Dodong Skwerut'
                    value={name}
                    onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' placeholder='email@sample.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Set Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>

                {isLoading && <Loader />}

                <Button type='submit' variant='primary' className='mt-3'>
                    Sign Up
                </Button>
            </Form>
        </FormContainer>
    </>
  )
}

export default RegisterPage