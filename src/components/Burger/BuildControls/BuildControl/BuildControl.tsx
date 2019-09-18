import React from 'react'
import classes from './BuildControl.module.css';
import { BurgerIngredientType } from '../../BurgerIngredient/BuderIngredient';
export interface BuildControlProps {
    label: string
    added: () => void
    removed: () => void
    disabled: boolean


}
const buildControl: React.FC<BuildControlProps> = (props) => {

    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button className={classes.Less} disabled={props.disabled} onClick={props.removed}>Less</button>
            <button className={classes.More} onClick={props.added}>More</button>

        </div>
    )
}

export default buildControl
