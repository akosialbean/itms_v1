import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Button, Col, Form, InputGroup, Nav } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import { LinkContainer } from 'react-router-bootstrap'
import DeviceNav from '../src/components/DeviceNav'
import axios from 'axios'
import { FaNetworkWired } from 'react-icons/fa';

const IpAddress = () => {
  const [ip, setIp] = useState([])
  const getIp = () => {
    return axios.get('http://localhost:8000/api/ip')
  }

  useEffect(() => {
    getIp().then((response) => {
      setIp(response.data)
    })
  }, [])

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
                  <Card.Title className='text-light'><strong>IP Addresses</strong></Card.Title>
                </CardHeader>
                <Card.Body>
                  <Row>
                    <Col xs={12} md={12} lg={12}>
                      <InputGroup>
                        <Form.Control className='form-control form-control-md' type='text' placeholder='search here' autoFocus></Form.Control>
                      </InputGroup>
                    </Col>
                  </Row>

                  <hr />
                  
                  {ip.length > 0 ? (
                    <Row>
                      {ip.map((item) => (
                      <Col xs={12} md={4} lg={3} xl={2} className='my-1'>
                        <Button variant={item.status === 'active' ? ('success') : ('danger')} className='shadow w-100'>
                          <FaNetworkWired className='me-5' /> {item.ip}
                        </Button>
                      </Col>
                      ))}
                    </Row>
                  ) : (<h1>Loading</h1>)}
                </Card.Body>
              </Card>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default IpAddress;
