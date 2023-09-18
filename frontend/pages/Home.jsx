import React, { useEffect, useState } from 'react'
import Hero from '../src/components/Hero'
import { useSelector, useDispatch} from 'react-redux'
import { Card, Col, Container, Row } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import axios from 'axios'

const Home = () => {
  const { userInfo } = useSelector((state) => state.auth)

  const desktop = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/devices/dashboard/desktopCount');
      return response.data
    } catch (error) {
      console.error('Error fetching desktop count:', error)
      return 0
    }
  }

  const laptop = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/devices/dashboard/laptopCount');
      return response.data
    } catch (error) {
      console.error('Error fetching desktop count:', error)
      return 0
    }
  }

  // 3. Initialize desktopCount with useState
  const [desktopCount, setDesktopCount] = useState('');
  const [laptopCount, setLaptopCount] = useState('');

  // 4. Use useEffect to fetch data when the component mounts
  useEffect(() => {
    desktop().then((count) => {
      setDesktopCount(count)
    });
    laptop().then((count) => {
      setLaptopCount(count)
    });
  }, [])

  return (
    <>
      {userInfo ? (
        <>
          <Container>
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
                    {desktopCount}
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} md={2} lg={2}>
                <Card className='card mt-3'>
                  <CardHeader>LAPTOPS</CardHeader>
                  <Card.Body>
                    {laptopCount}
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