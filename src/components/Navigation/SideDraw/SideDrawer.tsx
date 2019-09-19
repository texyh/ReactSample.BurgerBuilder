
import * as React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css';
import BackDrop from '../../UI/Backdrop/Backdrop';

export interface sideDrawProps {
    closed: () => void
    open: boolean
}
 
const sideDraw: React.SFC<sideDrawProps> = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open) {
       attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return ( 
    <React.Fragment>
        <BackDrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
            <Logo   />
        </div>
        <nav>
            <NavigationItems/>
        </nav>
    </div>
    </React.Fragment>
     );
}
 
export default sideDraw;