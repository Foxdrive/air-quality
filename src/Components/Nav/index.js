import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Nav.module.css';

const Nav = () => (
  <nav className={styles.nav}>
    <ul className={styles.list}>
      <li><Link className={styles.link} to={"/"}>INICIO</Link></li>
      <li><Link className={styles.link} to={"/about"}>SOBRE EL PROYECTO</Link></li>
      <li><Link className={styles.link} to={"/help"}>¿CÓMO AYUDAR?</Link></li>
      <li><Link className={styles.link} to={"/support"}>APOYAN</Link></li>
      <li>REDES SOCIALES</li>
    </ul>
  </nav>
);

export default Nav;