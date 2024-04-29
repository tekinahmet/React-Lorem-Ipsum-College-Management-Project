import React from 'react'
import './loading-spinner.scss'
import { Container } from 'react-bootstrap'

const LoadingSpinner = () => {
  return (
    <Container className="loader"></Container>
  )
}

export default LoadingSpinner


// import React from "react";
// import { Spinner } from "react-bootstrap";

// const LoadingSpinner = () => {
// 	return (
// 		<div
// 			style={{
// 				height: "80vh",
// 				display: "flex",
// 				justifyContent: "center",
// 				alignItems: "center",
// 			}}
// 		>
// 			<Spinner
// 				animation="border"
// 				variant="warning"
// 				style={{ width: "3rem", height: "3rem" }}
// 			/>
// 		</div>
// 	);
// };

// export default LoadingSpinner;