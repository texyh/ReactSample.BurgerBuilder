import * as React from 'react';
import classes from './BackDrop.module.css';

export interface BackDropProps {
    show: boolean
    clicked: () => void
}
 
const BackDrop: React.FC<BackDropProps> = (props) => {
    return props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
}
 
export default BackDrop;