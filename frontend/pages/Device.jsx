import { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { FaDesktop, FaLaptop, FaMobileAlt, FaRobot, FaServer } from 'react-icons/fa'
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
    //NEW
    const [d_ipAddress, setIpAddress] = useState('')
    const [d_macAddress, setMacAddress] = useState('')
    const [d_assignedToDepartment, setAssignedToDepartment] = useState('')
    const [d_assignedToEmployee, setAssignedToEmployee] = useState('')

    const [d_ipAddressUpdate, setIpAddressUpdate] = useState('')

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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
            setIpAddress(response.data.d_ipAddress)
            setMacAddress(response.data.d_macAddress)
            setAssignedToDepartment(response.data.d_assignedToDepartment)
            setAssignedToEmployee(response.data.d_assignedToEmployee)
        })

        getIp().then((response) => {
            setIp(response.data)
        })
    }, [])
    
    const handleClick = (e) => {
        setIsButtonDisabled(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const updateData = {
            id,
            d_type,
            d_brand,
            d_model,
            d_sn,
            d_hostName,
            d_ipAddressUpdate,
            d_ipAddress,
            d_macAddress,
            d_assignedToDepartment,
            d_assignedToEmployee
        }
        console.log(updateData)
        try{
            const res = await update({
                id,
                updateData
            }).unwrap()
            console.log(res)
            const updated = await dispatch(useUpdateMutation(...res))
            if(!updated.error){
                toast.success('Device information updated!')
            }else{
                toast.error('Device information update failed!')
            }
        }catch(err){
            toast.error(err?.data?.message || err.error)
        }
        navigate('/devices')
    }

    const getIp = () => {
        return axios.get('http://localhost:8000/api/ip/inactive')
      }
    
    const [ip, setIp] = useState([])
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
                                {
                                device.d_type == 'Server' ? (
                                    <FaServer size={60}/>
                                ) : ('')
                                }
                                {
                                device.d_type == 'Mini PC' ? (
                                    <FaRobot size={60}/>
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

                                    <Form.Group className='my-2' controlId='d_ipAddressUpdate'>
                                        <Form.Label>IP Address</Form.Label>
                                        <Form.Select onChange={(e) => setIpAddressUpdate(e.target.value)} required>
                                            <option value={d_ipAddress}>{d_ipAddress}</option>
                                            {ip.map((item, index) => (
                                                <option key={index} value={item.ip}>
                                                    {item.ip}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    
                                    <Form.Group className='my-2' controlId='d_ipAddress'>
                                        <Form.Control type='hidden' value={d_ipAddress}></Form.Control>
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

                                    <Button type='submit' variant='primary' className='mt-3' onClick={handleClick} disabled={isButtonDisabled}>
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