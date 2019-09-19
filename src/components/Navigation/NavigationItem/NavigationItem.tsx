
import * as React from 'react';
import classes from './NavigationItem.module.css';

export interface NavigationItemProps {
    link: string
    active?: boolean
}
 
const NavigationItem: React.FC<NavigationItemProps> = (props) => {
    return ( <li className={classes.NavigationItem}>
        <a href={props.link}
           className={props.active ? classes.active : ''}>{props.children}</a>
        </li> );
}
 
export default NavigationItem;