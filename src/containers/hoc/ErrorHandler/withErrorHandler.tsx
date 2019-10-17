import * as React from 'react';
import Modal from '../../../components/UI/Modal/Modal';
import { AxiosInstance } from 'axios';

const withErrorHandler = (WrapperComponent: React.ComponentType, axios: AxiosInstance) => {
    return props => {
        const [error, setError] = React.useState(null);
        
        const reqInterceptor = axios.interceptors.request.use(req => {
            setError(null)
            return req;
        })

        const resInterceptor = axios.interceptors.response.use(x => x, error => {
            setError(error)
        })

        React.useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            };
        }, [reqInterceptor, resInterceptor])

        const errorConfirmedHandler = () => {
            setError(null)
        }
        console.log(error)
        return (
            <React.Fragment>
                <Modal 
                modalClosed={errorConfirmedHandler}
                show={error != null}
                >
                    {error ? error.message : null}
                </Modal>
                <WrapperComponent {...props} />
            </React.Fragment>
            
        );
    }
}

export default withErrorHandler;