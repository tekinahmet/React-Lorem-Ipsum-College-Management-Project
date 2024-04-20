import React from 'react'
import "./page-header.scss"
import "../../../public/logo.jpg"
import { Image } from 'react-bootstrap'

const PageHeader = ({title}) => {
  return (
    <div className='page-header'>
        <h1><Image src='../../../public/logo.jpg' width={50} className='rounded-circle me-2' alt="Lorem Ipsum College"/>{title}<Image src='../../../public/logo.jpg' width={50} className='rounded-circle ms-2' alt="Lorem Ipsum College"/></h1>
    </div>
  )
}

export default PageHeader