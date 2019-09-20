
import * as React from 'react';
import classes from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

export interface NavigationItemProps {
    link: string
    active?: boolean
}
 
const NavigationItem: React.FC<NavigationItemProps> = (props) => {
    return ( <li className={classes.NavigationItem}>
        
        <NavLink activeClassName={classes.active} to={props.link}
                exact
           >{props.children}</NavLink>
        </li> );
}
 
export default NavigationItem;