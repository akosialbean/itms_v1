import React from 'react'
import Hero from '../components/Hero'
import { useSelector, useDispatch} from 'react-redux'
import { Card, Col, Container, Row } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader'

const Home = () => {
  const { userInfo } = useSelector((state) => state.auth)
  return (
    <>
      {userInfo ? (
        <>
          <Container>
            <Row className='justify-content-center stats'>

              <Col xs={12 } md={6} lg={6} xl={6}>
                <Card className='card mt-3'>
                  <CardHeader className='font-weight-bold'>TOTAL DEVICES</CardHeader>
                  <Card.Body>
                    1000
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} md={6} lg={6} xl={6}>
                <Card className='card mt-3'>
                  <CardHeader className='font-weight-bold'>DESKTOPS</CardHeader>
                  <Card.Body>
                    1000
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} md={6} lg={6} xl={6}>
                <Card className='card mt-3'>
                  <CardHeader className='font-weight-bold'>LAPTOPS</CardHeader>
                  <Card.Body>
                    1000
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} md={6} lg={6} xl={6}>
                <Card className='card mt-3'>
                  <CardHeader className='font-weight-bold'>MOBILE PHONES</CardHeader>
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