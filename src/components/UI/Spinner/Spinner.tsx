
import * as React from 'react';
import classes from './Spinner.module.css';

export interface spinnerProps {
    
}
 
const spinner: React.SFC<spinnerProps> = () => {
    return ( <div className={classes.loader}>Loading...</div> );
}
 
export default spinner;