import React from 'react';

class MarkerIcon extends React.Component {

  constructor(props) {
    super(props);
    this.setColor = this.setColor.bind(this);
  }

  setColor() {
    const colors = {
    red: '#FE1212',
    green: '#12FE1A',
    orange: '#FEA012'
    };
    const measurement = this.props.measurement;
    if (measurement < 6000) {
      return colors.green;
    }
    else if (measurement < 12000) {
      return colors.orange;
    }
    else {
      return colors.red;
    }
  }

render() {
  
  const { children } = this.props;
  return children({
    color: this.setColor()
  });
}

}

export default MarkerIcon