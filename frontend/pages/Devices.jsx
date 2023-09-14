import React, { useEffect, useState } from 'react'
import { Container, Card, Row, Button, Col } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import { FaDesktop, FaLaptop } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'

const Devices = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const url = 'http://localhost:8000/api/devices'
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    await fetch(url, requestOptions)
      .then((response) => response.json())
      .then((json) => setDevices(json))
  }, [])
  return (
    <>
      <Container className='mt-5'>
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

            <Row className='mt-3'>
              <Col xs={12} s={12} md={3} lg={3}>
              <ul>
                {devices.map((device) => (
                  <li key={device._id}>{device.d_type}</li>
                ))}
              </ul>

                <Card>
                  <Card.Body className='border'>
                    <Row>
                      <Col xs={4} s={4} md={4} lg={4}>
                        <FaLaptop />
                        <FaDesktop />
                      </Col>
                      <Col xs={8} s={8} md={8} lg={8}>
                        WMCN0041<br/>
                        Laptop<br/>
                        Lenovo<br/>
                        L390
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} s={12} md={3} lg={3}>
                <Card>
                  <Card.Body className='border'>
                    <Row>
                      <Col xs={4} s={4} md={4} lg={4}>
                        <FaLaptop />
                        <FaDesktop />
                      </Col>
                      <Col xs={8} s={8} md={8} lg={8}>
                        WMCN0041<br/>
                        Laptop<br/>
                        Lenovo<br/>
                        L390
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} s={12} md={3} lg={3}>
                <Card>
                  <Card.Body className='border'>
                    <Row>
                      <Col xs={4} s={4} md={4} lg={4}>
                        <FaLaptop />
                        <FaDesktop />
                      </Col>
                      <Col xs={8} s={8} md={8} lg={8}>
                        WMCN0041<br/>
                        Laptop<br/>
                        Lenovo<br/>
                        L390
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} s={12} md={3} lg={3}>
                <Card>
                  <Card.Body className='border'>
                    <Row>
                      <Col xs={4} s={4} md={4} lg={4}>
                        <FaLaptop />
                        <FaDesktop />
                      </Col>
                      <Col xs={8} s={8} md={8} lg={8}>
                        WMCN0041<br/>
                        Laptop<br/>
                        Lenovo<br/>
                        L390
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}

export default Devices