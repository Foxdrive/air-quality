import React from 'react';

class MarkerIcon extends React.Component {
render() {
  const { children } = this.props;
  return children();
}

}

export default MarkerIcon