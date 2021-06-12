import React, { Fragment, Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';

function withErrorHandler(WrappedComponent, axios) {
  return class extends Component {
    state = {
      error: null,
    };

    UNSAFE_componentWillMount() {
      this.requestInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });

      this.responseInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    handleErrorConfirmed = () => this.setState({ error: null });

    render() {
      return (
        <Fragment>
          <Modal
            show={this.state.error}
            modalClosed={this.handleErrorConfirmed}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  };
}

export default withErrorHandler;
