import React, { Fragment } from 'react' 
import classes from './Modal.module.css';
import BackDrop from '../Backdrop/Backdrop';

export interface ModalProps {
    show: boolean
    modalClosed: () => void
}

const modal: React.FC<ModalProps> = (props) => {
    return (
        <Fragment>
            <BackDrop show={props.show} clicked={props.modalClosed}/>
            <div className={classes.Modal}
             style={{
                 transform: props.show ? 'translateY(0)': 'translateY(-100vh)',
                 opacity: props.show ? 1 : 0
             }}
        >
            {props.children}
        </div>
        </Fragment>
    )
}

export default modal;
