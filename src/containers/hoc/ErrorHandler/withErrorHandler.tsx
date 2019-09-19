import * as React from 'react';
import Modal from '../../../components/UI/Modal/Modal';
import { AxiosInstance } from 'axios';

const withErrorHandler = (WrapperComponent: React.ComponentType, axios: AxiosInstance) => {
    return class extends React.Component {

        state = {
            error: null
        }

        reqInterceptor;
        resInterceptor

        componentWillMount() {

            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            })

            this.resInterceptor = axios.interceptors.response.use(x => x, error => {
                this.setState({error: error})
            })
        }

        componentWillUnmount() {
             axios.interceptors.request.eject(this.reqInterceptor);
             axios.interceptors.response.eject(this.resInterceptor);

        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render() {
            
            return (
                <React.Fragment>
                    <Modal 
                    modalClosed={this.errorConfirmedHandler}
                    show={this.state.error != null}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrapperComponent {...this.props} />
                </React.Fragment>
                
            );
        }
        
    }
}

export default withErrorHandler;