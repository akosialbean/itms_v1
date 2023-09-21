import React from 'react'
import { Nav } from 'react-bootstrap'
import { FaSitemap } from 'react-icons/fa'
import {HiCpuChip} from 'react-icons/hi2'

const DeviceNav = () => {
  return (
    <>
        <Nav variant='pills' defaultActiveKey='/devices' className='flex-column'>
            <Nav.Link className='bg-secondary my-1 py-3 shadow' href='/devices'><span className='h5'><strong><HiCpuChip className='me-3' />All Devices</strong></span></Nav.Link>
            <Nav.Link className='bg-secondary text-light my-1 py-3 shadow' href='/ip'><span className='h5'><strong><FaSitemap className='me-3' />IP Address</strong></span></Nav.Link>
        </Nav>
    </>
  )
}

export default DeviceNav
