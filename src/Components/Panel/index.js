import React from 'react';
import styles from './Panel.module.css';

class Panel extends React.Component {
  render() {
    return (
      <article className={styles.panel}>
        <p>ESTE ES EL PANEL DEL SLIDER</p>
      </article>
    );
  }
}

export default Panel;