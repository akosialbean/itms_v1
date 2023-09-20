import React from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import '../index.css'

const Hero = () => {
  return (
    <>
        <div className="py-5">
            <Container className='d-flex justify-content-center w100' fluid>
                <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-100' style={{background: "url('../herobg.jpg')", backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom right', backgroundSize: 'cover'}}>
                    <span className="h1 text-center mb-4 text-light shadow p-5" style={{textShadow: '6px 6px 6px #333', fontSize: '6rem'}}><strong>IT's not just a JOB, it’s a PASSION.</strong></span>
                    <p className="h2 text-center mb-4 text-light" style={{textShadow: '3px 3px 3px #111', fontSize: '3rem'}}>
                        <strong><em>We love what we do, and we do what we love. IT is not just a job for us, it’s a passion that drives us to excel and deliver.</em></strong>
                    </p>
                </Card>
            </Container>
        </div>
    </>
  )
}

export default Hero