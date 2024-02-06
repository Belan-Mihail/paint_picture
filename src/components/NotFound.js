import React from 'react'
import NotFoundPicture from '../assets/notfound.png'
import styles from '../styles/NotFound.module.css'
import Asset from './Asset'

const NotFound = () => {
  return (
    <div className={styles.MarginTop}>
        <Asset src={NotFoundPicture} message="Sorry, the page you're looking for doesn't exist" />
    </div>
  )
}

export default NotFound