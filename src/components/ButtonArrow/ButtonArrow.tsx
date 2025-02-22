import React from 'react'
import { ArrowRightIcon } from '../../icons'
import styles from './styles.module.scss'

interface IButtonProps {
  className?: string
  onClick?: () => void
  size?: string
  arrowLeft?: boolean
  children: any
}

const ButtonArrow = ({
  className,
  onClick = () => {},
  size = 'md',
  arrowLeft = false,
  children,
}: IButtonProps) => {
  return (
    <button
      type='button'
      className={`${styles.root} ${
        size === 'lg' ? styles.lg : size === 'sm' ? styles.sm : ''
      } ${arrowLeft ? styles.arrowLeft : ''} ${className || ''}`}
      onClick={onClick}
    >
      {arrowLeft && <ArrowRightIcon />}
      {children}
      {!arrowLeft && <ArrowRightIcon />}
    </button>
  )
}

export default ButtonArrow
