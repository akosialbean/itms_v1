import React from 'react'
import Hero from '../src/components/Hero'
import { useSelector, useDispatch} from 'react-redux'
import { Card, Col, Container, Row } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader'

const Home = () => {
  const { userInfo } = useSelector((state) => state.auth)
  return (
    <>
      {userInfo ? (
        <>
          <Container className='mt-5'>
            <Row>

              <Col xs={12} md={2} lg={2}>
                <Card className='card mt-3'>
                  <CardHeader>TOTAL DEVICES</CardHeader>
                  <Card.Body>
                    1000
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} md={2} lg={2}>
                <Card className='card mt-3'>
                  <CardHeader>DESKTOPS</CardHeader>
                  <Card.Body>
                    1000
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} md={2} lg={2}>
                <Card className='card mt-3'>
                  <CardHeader>LAPTOPS</CardHeader>
                  <Card.Body>
                    1000
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} md={2} lg={2}>
                <Card className='card mt-3'>
                  <CardHeader>MOBILE PHONES</CardHeader>
                  <Card.Body>
                    1000
                  </Card.Body>
                </Card>
              </Col>

            </Row>
            
          </Container>
        </>
      ) : (
        <>
          <Hero />
        </>
      )}
        
    </>
  )
}

export default Home