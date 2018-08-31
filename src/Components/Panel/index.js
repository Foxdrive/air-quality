import React from 'react';
import styles from './Panel.module.css';
import classNames from 'classnames';

class Panel extends React.Component {

  constructor(props){
    super(props);
    this.state={
      isPanelCollapsed : false
    }
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  handleOnClick(){
    this.setState({isPanelCollapsed : !this.state.isPanelCollapsed})
  }

  render() {
    return (
      <article className={classNames(styles.panel, {[styles.open]:this.state.isPanelCollapsed})}>
        <h3>Mediciones Calidad del aire</h3>
        <p>Concentraciones de particulas PM 2,5 (ug/m<sup>3</sup>)</p>
        {this.props.children}
        <div className={styles.metrics}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
        <div onClick={this.handleOnClick} className={styles.collapseButton}>
          <span>S</span>
          <span>L</span>
          <span>I</span>
          <span>D</span>
          <span>E</span>
          <span>R</span>
        </div>
        <div onClick={this.handleOnClick} className={ styles.close}>X</div>
      </article>
    );
  }
}

export default Panel;