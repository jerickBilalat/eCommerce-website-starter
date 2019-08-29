import React, { Fragment } from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import ErrorBoundary from '../components/ErrorBoundry';
import Footer from '../components/Footer';

import 'react-toastify/dist/ReactToastify.min.css';
import '../assets/css/style.css';
import '../assets/css/blue.css';

class App extends React.Component {
  notify = (status, message) => {
    switch (status) {
      case 'success':
        return toast.success(message, {
          position: toast.POSITION.TOP_RIGHT
        });
      case 'error':
        return toast.error(message, {
          position: toast.POSITION.TOP_RIGHT
        });
      case 'info':
        return toast.info(message, {
          position: toast.POSITION.BOTTOM_LEFT
        });
      case 'warn':
        return toast.warn(message, {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      default:
        return toast('Default Notification !');
    }
  };

  render() {
    const { route } = this.props;
    return (
      <Fragment>
        <ToastContainer />
        <div className="container">
          <ErrorBoundary>{renderRoutes(route.routes)}</ErrorBoundary>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

App.propTypes = {
  route: PropTypes.objectOf(PropTypes.any)
};

App.defaultProps = {
  route: null
};

export default {
  component: App
};
