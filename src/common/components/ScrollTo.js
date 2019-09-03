import React from 'react';
import { withRouter } from 'react-router-dom';

class ScrollTo extends React.Component {
  componentDidMount() {
    let { x, y } = this.props;
    x = x || 0;
    y = y || 140;
    window.scrollTo(x, y);
  }

  render() {
    return null;
  }
}

export default withRouter(ScrollTo);
