import { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { FaDesktop, FaLaptop, FaMobileAlt } from 'react-icons/fa'
import { useUpdateMutation} from '../src/slices/deviceApiSlice'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import Loader from '../src/components/Loader'

const Device = () => {
    const id = useParams().id
    const [device, setDevice] = useState({})
    const [d_type, setDeviceType] = useState('')
    const [d_brand, setDeviceBrand] = useState('')
    const [d_model, setDeviceModel] = useState('')
    const [d_sn, setSerialNumber] = useState('')
    const [d_hostName, setHostName] = useState('')

    const getDevice = () => {
        return axios.get(`http://localhost:8000/api/devices/device/${id}`)
    }

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [update, {isLoading}] = useUpdateMutation()

    useEffect(() => {
        getDevice().then((response) => {
            setDevice(response.data)
            setDeviceType(response.data.d_type)
            setDeviceBrand(response.data.d_brand)
            setDeviceModel(response.data.d_model)
            setSerialNumber(response.data.d_sn)
            setHostName(response.data.d_hostName)
        })
        
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const updateData = {
            id,
            d_type,
            d_brand,
            d_model,
            d_sn,
            d_hostName
        }
        try{
            const res = await update({
                id,
                updateData
            }).unwrap()

            await dispatch(useUpdateMutation({...res}))
        }catch(err){
            toast.error(err?.data?.message || err.error)
        }
        navigate('/devices')
    }

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
                                d_type === 'Laptop' ? (
                                    <FaLaptop size={100}/>
                                ) : ('')
                                }
                                {
                                d_type === 'Desktop' ? (
                                    <FaDesktop size={100}/>
                                ) : ('')
                                }
                                {
                                d_type === 'Phone' ? (
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
                                            <option value={d_type}>{d_type}</option>
                                            <option value='Desktop'>Desktop</option>
                                            <option value='Laptop'>Laptop</option>
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

                                    {isLoading && <Loader />}

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