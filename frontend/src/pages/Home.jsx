import React from 'react'
import Hero from '../components/Hero'
import { useSelector, useDispatch} from 'react-redux'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { FaLaptop, FaDesktop, FaMobileAlt } from 'react-icons/fa'
import CardHeader from 'react-bootstrap/esm/CardHeader'

const Home = () => {
  const { userInfo } = useSelector((state) => state.auth)
  return (
    <>
      {userInfo ? (
        <>
          <Container>
            <Row className='justify-content-center font-weight-bold'>

              <Col xs={12 } md={6} lg={6} xl={6}>
                <Card className='card mt-3'>
                  <CardHeader>TOTAL DEVICES</CardHeader>
                  <Card.Body className='stats-count'>
                    1,000
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} md={6} lg={6} xl={6}>
                <Card className='card mt-3'>
                  <CardHeader><FaDesktop/>DESKTOPS</CardHeader>
                  <Card.Body className='stats-count'>
                    1,000
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} md={6} lg={6} xl={6}>
                <Card className='card mt-3'>
                  <CardHeader><FaLaptop/>LAPTOPS</CardHeader>
                  <Card.Body className='stats-count'>
                    1,000
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} md={6} lg={6} xl={6}>
                <Card className='card mt-3'>
                  <CardHeader><FaMobileAlt/>MOBILE PHONES</CardHeader>
                  <Card.Body className='stats-count'>
                    1,000
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