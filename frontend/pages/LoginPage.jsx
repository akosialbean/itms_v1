import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../src/components/FormContainer'
import { useLoginMutation } from '../src/slices/usersApiSlice'
import { setCredentials } from '../src/slices/authSlice'
import { toast } from 'react-toastify'
import Loader from '../src/components/Loader'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, {isLoading}] = useLoginMutation()

    const { userInfo } = useSelector((state) => state.auth)

    useEffect(() => {
        if(userInfo){
            navigate('/')
        }
    }, [navigate, userInfo])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const res = await login({
                email,
                password
            }).unwrap()
            dispatch(setCredentials({...res}))
            navigate('/')
        }catch(err){
            toast.error(err?.data?.message || err.error)
        }
    }
  return (
    <>
        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' placeholder='email@sample.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='******'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
                </Form.Group>

                {isLoading && <Loader />}

                <Button type='submit' variant='primary' className='mt-3'>
                    Sign In
                </Button>

                <Row className='py-3'>
                    <Col>
                        New User? <Link to='/register'>Register</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    </>
  )
}

export default LoginPage