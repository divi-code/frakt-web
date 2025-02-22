import React from 'react'

import { PreloaderIcon } from './PreloaderIcon'
import styles from './styles.module.scss'
import { PRELOADER_DEFAULT_SIZES } from './constants'

interface IPreloaderProps {
  className?: string
  size?: string
  width?: number
}

const Preloader = ({ className = '', size = 'sm', width }: IPreloaderProps) => (
  <div className={`${styles.root} ${className || ''}`}>
    <PreloaderIcon width={width || PRELOADER_DEFAULT_SIZES[size]} />
  </div>
)

export default Preloader
