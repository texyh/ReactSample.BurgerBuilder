import * as React from 'react';
import classes from './Input.module.css';

export interface inputProps {
    label?: string
    name: string
    placeholder: string
    type: string
    value: string | number
    change?: (event) => void
}
 
const input: React.FC<inputProps> = (props) => {
    return ( 
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            <input 
                className={classes.InputElement} 
                onChange={props.change} 
                {...props}/>
        </div>
     );
}
 
export default input;