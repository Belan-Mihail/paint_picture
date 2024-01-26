import appStyles from '../../App.module.css'
import React from 'react'
import Container from "react-bootstrap/Container";

const PopularProfiles = () => {
  return (
    <Container className={`${appStyles.Content} mt-4`}>
        <p>Popular profiles</p>
    </Container>
  )
}

export default PopularProfiles