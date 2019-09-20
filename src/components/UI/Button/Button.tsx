import React from 'react'
import classes from './Button.module.css'

export interface ButtonProps {
    clicked: (e?) => void
    btnType: string
}
  
const Button: React.FC<ButtonProps> = (props) => {
    return (
        <button
         className={[classes.Button, classes[props.btnType]].join(' ')}
         onClick={props.clicked}>{props.children}</button>
    )
}

export default Button
