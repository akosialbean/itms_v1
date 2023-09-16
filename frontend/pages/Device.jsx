import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { FaDesktop, FaLaptop, FaMobileAlt } from 'react-icons/fa'

const Device = () => {
    
    const id = useParams().id
    const [device, setDevice] = useState([])
    const [d_type, setDeviceType] = useState('')
    const [d_brand, setDeviceBrand] = useState('')
    const [d_model, setDeviceModel] = useState('')
    const [d_sn, setSerialNumber] = useState('')
    const [d_hostName, setHostName] = useState('')
    
    const handleSubmit = (e) => {
        alert('testing submit')
    }

    useEffect(() => {
        const getDevice = () => {
            return axios.get(`http://localhost:8000/api/devices/device/${id}`)
        }

        getDevice().then((response) => {
            setDevice(response.data)
        })

        setDeviceType(device.d_type)
        setDeviceBrand(device.d_brand)
        setDeviceModel(device.d_model)
        setSerialNumber(device.d_sn)
        setHostName(device.d_hostName)
    }, [])
    
    
  return (
    <>
        <Container>
            <Card>
                <CardHeader key={device._id}>
                <Card.Title>{device.d_hostName}</Card.Title>
                </CardHeader>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col xs={12} s={12} md={3} lg={3} className='text-center'>
                                {
                                device.d_type == 'Laptop' ? (
                                    <FaLaptop size={100}/>
                                ) : ('')
                                }
                                {
                                device.d_type == 'Desktop' ? (
                                    <FaDesktop size={100}/>
                                ) : ('')
                                }
                                {
                                device.d_type == 'Phone' ? (
                                    <FaMobileAlt size={100}/>
                                ) : ('')
                                }
                            </Col>

                            <Col xs={12} s={12} md={9} lg={9}>
                                <h1>Update Device Details</h1>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className='my-2' controlId='d_type'>
                                        <Form.Label>Type</Form.Label>
                                        <Form.Select onChange={(e) => setDeviceType(e.target.value)} required>
                                            <option value='{device.d_type}'>{device.d_type}</option>
                                            <option value='Desktop'>Desktop</option>
                                            <option value='Laptop'>Laptop</option>
                                            <option value='Phone'>Phone</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className='my-2' controlId='d_brand'>
                                        <Form.Label>Brand</Form.Label>
                                        <Form.Control type='text' placeholder='Lenovo'
                                        value={device.d_brand}
                                        onChange={(e) => setDeviceBrand(e.target.value)}></Form.Control>
                                    </Form.Group>

                                    <Form.Group className='my-2' controlId='d_model'>
                                        <Form.Label>Model</Form.Label>
                                        <Form.Control type='text' placeholder='L390'
                                        value={device.d_model}
                                        onChange={(e) => setDeviceModel(e.target.value)}></Form.Control>
                                    </Form.Group>

                                    <Form.Group className='my-2' controlId='d_sn'>
                                        <Form.Label>Serial Number</Form.Label>
                                        <Form.Control type='text' placeholder='DKFUSS923D'
                                        value={device.d_sn}
                                        onChange={(e) => setSerialNumber(e.target.value)}></Form.Control>
                                    </Form.Group>

                                    <Form.Group className='my-2' controlId='d_hostName'>
                                        <Form.Label>Host Name</Form.Label>
                                        <Form.Control type='text' placeholder='DKFUSS923D'
                                        value={device.d_hostName}
                                        onChange={(e) => setHostName(e.target.value)}></Form.Control>
                                    </Form.Group>

                                    {/* {isLoading && <Loader />} */}

                                    <Button type='submit' variant='primary' className='mt-3'>
                                        Update Device
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        </Container>
    </>
  )
}

export default Device