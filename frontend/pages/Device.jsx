import React, { useEffect, useState } from 'react'
import { Card, Container } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Device = () => {
    
    const id = useParams().id
    const getDevice = () => {
        return axios.get(`http://localhost:8000/api/devices/device/${id}`)
    }

    const [device, setDevice] = useState([])

    useEffect(() => {
        getDevice().then((response) => {
            setDevice(response.data)
        })
    }, [])
  return (
    <>
        <Container className='mt-5 pt-5'>
            <Card>
                <CardHeader key={device._id}>
                <Card.Title>{device.d_hostName}</Card.Title>
                </CardHeader>
                <Card.Body>
                    <p>{device.d_brand}</p>
                    <p>{device.d_model}</p>
                    <p>{device.d_sn}</p>
                </Card.Body>
            </Card>
        </Container>
    </>
  )
}

export default Device