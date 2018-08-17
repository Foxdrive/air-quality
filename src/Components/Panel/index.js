import React from 'react';
import styles from './Panel.module.css';

class Panel extends React.Component {
  render() {
    return (
      <article className={styles.panel}>
        {this.props.children}
      </article>
    );
  }
}

export default Panel;