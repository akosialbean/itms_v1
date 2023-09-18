import React, { useEffect, useState } from 'react'
import { Container, Card, Row, Button, Col, Table } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import { FaDesktop, FaLaptop, FaMobile, FaMobileAlt, FaPhone } from 'react-icons/fa'
import { Link, LinkContainer } from 'react-router-bootstrap'
import axios from 'axios'


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
  return (
    <>
      <Container>
        <Card>
          <CardHeader>
            <Card.Title>Devices</Card.Title>
          </CardHeader>
          <Card.Body>
            <Row>
              <Col xs={12} md={12} lg={12}>
                <LinkContainer to='/devices/add'>
                  <Button variant='primary' className='btn-sm'>Add Device</Button>
                </LinkContainer>
              </Col>
            </Row>
            
            {/* //AXIOS */}
            {devices.length > 0 ?
            (<Row className='mt-3'>
              {devices.map((device) => (
              <Col xs={12} s={12} md={3} lg={3} className='mb-4' key={device._id}>
                <LinkContainer to={`/devices/device/${device._id}`} style={{width:'100%'}}>
                  <Button variant='light' className='shadow'>
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
                      </Col>

                      <Col xs={8} s={8} md={8} lg={8} className='p-2' style={{fontSize: '9px', textAlign: 'left'}}>
                        <strong>{device.d_hostName}</strong><br/>
                        {device.d_type}<br/>
                        {device.d_brand}<br/>
                        {device.d_model}<br/>
                        {device.d_sn}<br/>
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
    </>
  )
}

export default Devices