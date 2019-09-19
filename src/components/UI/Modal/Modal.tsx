import React, { Fragment } from 'react' 
import classes from './Modal.module.css';
import BackDrop from '../Backdrop/Backdrop';

export interface ModalProps {
    show: boolean
    modalClosed: () => void
}

class Modal extends React.Component<ModalProps, {}> {
    
    shouldComponentUpdate(nextProps: ModalProps, nextState:{}) {
       return nextProps.show !== this.props.show;
    }

    componentWillUpdate() {
        console.log('Modal Will update')
    }

    render() {
        return (
            <Fragment>
                <BackDrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div className={classes.Modal}
                 style={{
                     transform: this.props.show ? 'translateY(0)': 'translateY(-100vh)',
                     opacity: this.props.show ? 1 : 0
                 }}
            >
                {this.props.children}
            </div>
            </Fragment>
        )
    }
    
}

export default Modal;
