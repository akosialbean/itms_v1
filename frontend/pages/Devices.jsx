import React, { useEffect, useState } from 'react'
import { Container, Card, Row, Button, Col, Form, InputGroup, Nav } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import { FaDesktop, FaLaptop, FaMobileAlt, FaPlusCircle, FaRobot, FaServer, FaSitemap, FaSun } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import axios from 'axios'
import { toast } from 'react-toastify'
import DeviceNav from '../src/components/DeviceNav'


const Devices = () => {
  //PULLING DATA USING AXIOS
  const getDevices = () => {
    return axios.get('http://localhost:8000/api/devices')
  }

  const [devices, setDevices] = useState([])

  useEffect(() => {
    getDevices().then((response) => {
      setDevices(response.data)
    })
  }, [])
  //PULLING DATA USING AXIOS

  //SEARCH RECORD
  const [searchItem, setSearchItem] = useState('')
  //SEARCH RECORD

  return (
    <>
      <Container className='container-fluid'>
        <Row>
        
          <Col xs={12} s={12} md={2} lg={2}>
            
            <DeviceNav />
            
          </Col>
          <Col xs={12} s={12} md={10} lg={10}>
            <Container>
              <Card  className='border border-primary shadow border border-3'>
                <CardHeader className='bg-primary'>
                  <Card.Title className='text-light'><strong>Devices</strong></Card.Title>
                </CardHeader>
                <Card.Body>
                  <Row>
                    <Col xl={12} className='mb-2'>
                      <LinkContainer to='/devices/add'>
                        <div className="d-grip gap-2">
                          <Button variant='success' className='btn-md' style={{width: '100%'}}><strong><FaPlusCircle /> Add Device</strong></Button>
                        </div>
                      </LinkContainer>
                    </Col>
                    <Col xl={12}>
                      <InputGroup>
                        <Form.Control className='form-control form-control-md' type='text' placeholder='Search here' value={searchItem} onChange={(e) => setSearchItem(e.target.value)} autoFocus></Form.Control>
                      </InputGroup>
                    </Col>
                  </Row>

                  <hr />
                  
                  {/* //AXIOS */}
                  {devices.length > 0 ?
                  (<Row className='mt-3'>
                    {devices.filter(device=>device.d_hostName.toLowerCase().includes(searchItem) ||
                    (device.d_type && device.d_type.toLowerCase().includes(searchItem)) || 
                    (device.d_brand && device.d_brand.toLowerCase().includes(searchItem)) || 
                    (device.d_model && device.d_model.toLowerCase().includes(searchItem)) ||
                    (device.d_ipAddress && device.d_ipAddress.includes(searchItem)) ||
                    (device.d_assignedToDepartment && device.d_assignedToDepartment.toLowerCase().includes(searchItem)) ||
                    (device.d_assignedToEmployee && device.d_assignedToEmployee.toLowerCase().includes(searchItem))
                    ).map((device) => (
                    <Col xs={12} s={12} md={4} lg={3} className='mb-4' key={device._id}>
                      <LinkContainer to={`/devices/device/${device._id}`} style={{width:'100%'}}>
                        <Button variant='primary' className='shadow'>
                          <Row>
                            <Col xs={4} s={4} md={4} lg={4} className='p-3 pe-5'>
                              {
                                device.d_type == 'Laptop' ? (
                                  <FaLaptop size={60}/>
                                ) : ('')
                              }
                              {
                                device.d_type == 'Desktop' ? (
                                  <FaDesktop size={60}/>
                                ) : ('')
                              }
                              {
                                device.d_type == 'Phone' ? (
                                  <FaMobileAlt size={60}/>
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

                            <Col xs={8} s={8} md={8} lg={8} className='p-2 ps-4' style={{fontSize: '9px', textAlign: 'left'}}>
                              <span className='h5 mb-4'><strong>{device.d_hostName}</strong></span><br/>
                              <span>{device.d_ipAddress}</span><br/>
                              {device.d_assignedToDepartment}<br/>
                              {device.d_assignedToEmployee}<br/>
                            </Col>
                          </Row>
                        </Button>
                      </LinkContainer>
                    </Col>
                    ))}
                  </Row>)
                  :
                  (<h1>Loading...</h1>)
                  }
                  {/* //ENDAXIOS */}
                </Card.Body>
              </Card>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Devices