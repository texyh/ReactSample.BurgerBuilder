import * as React from 'react';
import classes from './DrawerToggle.module.css';
export interface drawerToggleProps {
    clicked: () => void;
}
 
const drawerToggle: React.SFC<drawerToggleProps> = (props) => {
    return ( <div className={classes.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>

    </div> );
}
 
export default drawerToggle;