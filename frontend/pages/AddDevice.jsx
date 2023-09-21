import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from '../src/components/Loader'
import FormContainer from '../src/components/FormContainer'
import { useAddMutation } from '../src/slices/deviceApiSlice'
import axios from 'axios'

const AddDevice = () => {
  const [d_type, setDeviceType] = useState('')
  const [d_brand, setDeviceBrand] = useState('')
  const [d_model, setDeviceModel] = useState('')
  const [d_sn, setSerialNumber] = useState('')
  const [d_hostName, setHostName] = useState('')
  //NEW
  const [d_ipAddress, setIpAddress] = useState('')
  const [d_macAddress, setMacAddress] = useState('')
  const [d_assignedToDepartment, setAssignedToDepartment] = useState('')
  const [d_assignedToEmployee, setAssignedToEmployee] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [add, {isLoading}] = useAddMutation()

  const [isDisabled, setIsDisabled] = useState(false)

  const handleClick = (e) => {
    setIsDisabled(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
        const res = await add({
          d_type,
          d_brand,
          d_model,
          d_sn,
          d_hostName,
          d_ipAddress,
          d_macAddress,
          d_assignedToDepartment,
          d_assignedToEmployee
        }).unwrap()
        dispatch(useAddMutation({...res}))
    }catch(err){
        toast.error(err?.data?.message || err.error)
    }
    navigate('/devices')
  }

  const getIp = () => {
    return axios.get('http://localhost:8000/api/ip/inactive')
  }

  const [ip, setIp] = useState([])

  useEffect(() => {
    getIp().then((response) => {
        setIp(response.data)
    })
  }, [])
  return (
    <>  
        <Container className='mb-5'>
            <Card className='border border-primary border-3'>
                <Card.Header className='bg-primary text-light'>
                    <Card.Title>
                        <h1>New Device</h1>
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='my-2' controlId='d_type'>
                            <Form.Label>Type</Form.Label>
                            <Form.Select onChange={(e) => setDeviceType(e.target.value)} required>
                                <option value=''>--</option>
                                <option value='Desktop'>Desktop</option>
                                <option value='Laptop'>Laptop</option>
                                <option value='Mini PC'>Mini PC</option>
                                <option value='Server'>Server</option>
                                <option value='Phone'>Phone</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className='my-2' controlId='d_brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type='text' placeholder='Lenovo'
                            value={d_brand}
                            onChange={(e) => setDeviceBrand(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group className='my-2' controlId='d_model'>
                            <Form.Label>Model</Form.Label>
                            <Form.Control type='text' placeholder='L390'
                            value={d_model}
                            onChange={(e) => setDeviceModel(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group className='my-2' controlId='d_sn'>
                            <Form.Label>Serial Number</Form.Label>
                            <Form.Control type='text' placeholder='DKFUSS923D'
                            value={d_sn}
                            onChange={(e) => setSerialNumber(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group className='my-2' controlId='d_hostName'>
                            <Form.Label>Host Name</Form.Label>
                            <Form.Control type='text' placeholder='DKFUSS923D'
                            value={d_hostName}
                            onChange={(e) => setHostName(e.target.value)}></Form.Control>
                        </Form.Group>

                        <hr />

                        <Form.Group className='my-2' controlId='d_ipAddress'>
                            <Form.Label>IP Address</Form.Label>
                            <Form.Select onChange={(e) => setIpAddress(e.target.value)} required>
                                <option value=''>--</option>
                                {ip.map((item, index) => (
                                    <option key={index} value={item.ip}>
                                    {item.ip}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className='my-2' controlId='d_macAddress'>
                            <Form.Label>MAC Address</Form.Label>
                            <Form.Control type='text' placeholder='00:00:00:00:00'
                            value={d_macAddress}
                            onChange={(e) => setMacAddress(e.target.value)}></Form.Control>
                        </Form.Group>

                        <hr />

                        <Form.Group className='my-2' controlId='d_assignedToDepartment'>
                            <Form.Label>Assigned to Department (Multiple Users)</Form.Label>
                            <Form.Control type='text' placeholder='Department Name'
                            value={d_assignedToDepartment}
                            onChange={(e) => setAssignedToDepartment(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group className='my-2' controlId='d_assignedToEmployee'>
                            <Form.Label>Assigned to Employee (Dedicated User)</Form.Label>
                            <Form.Control type='text' placeholder='Employee Name'
                            value={d_assignedToEmployee}
                            onChange={(e) => setAssignedToEmployee(e.target.value)}></Form.Control>
                        </Form.Group>

                        {isLoading && <Loader />}

                        <Button type='submit' variant='primary' className='mt-3' onClick={handleClick} disabled={isDisabled}>
                            Add Device
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    </>
  )
}

export default AddDevice