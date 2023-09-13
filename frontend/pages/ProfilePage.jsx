import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormContainer from '../src/components/FormContainer'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../src/components/Loader'
import { setCredentials } from '../src/slices/authSlice'
import { Form, Button } from 'react-bootstrap'
import { useUpdateUserMutation } from '../src/slices/usersApiSlice'

const ProfilePage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { userInfo } = useSelector((state) => state.auth)

    const [updateProfile, {isLoading}] = useUpdateUserMutation()

    useEffect(() => {
        setName(userInfo.name)
        setEmail(userInfo.email)
    }, [userInfo.setName, userInfo.setEmail])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            toast.error('Passwords do not match')
        }else{
            try{
                const res = await updateProfile({
                    _id: userInfo._id,
                    name,
                    email,
                    password
                }).unwrap()
                dispatch(setCredentials(...res))
                toast.success('Profile updated!')
            }catch(err){
                toast.error(err?.data?.message || err.error)
            }
        }
    }
  return (
    <>
        <FormContainer>
            <h1>Update Profile</h1>
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
                    Update Profile
                </Button>
            </Form>
        </FormContainer>
    </>
  )
}

export default ProfilePage