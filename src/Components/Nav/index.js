import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Nav.module.css';
import classNames from 'classnames';

const Nav = () => (
  <header className={styles.hc1}>
    <div className={styles.hc1screenWidthBackground}></div>
    <div className={styles.hc1centeredContent}>
      <div className={styles.hc1bg}></div>
      <div className={styles.hc1inlineContent}>

        <nav className={classNames(styles['hidden-on-warmup'], styles.tm1)}>
          <div className={classNames(styles.fullScreenOverlay, styles.tm1_menuInitial, styles['tm1_dir-center'], styles.tm1fullScreenOverlay)}>
            <div className={classNames(styles.fullScreenOverlayContent, styles.tm1fullScreenOverlayContent)}>
              <div className={classNames(styles['tm1_menuInitial'], styles['tm1_dir-center'], styles.tm1menuBackground)}>
                <div className={classNames(styles['tm1_menuInitial'], styles['tm1_dir-center'], styles.tm1menuContainer)}>
                  <ul className={classNames(styles['tm1_top-menu'], styles.tm1_open, styles.tm1_firstSection)}>
                    <li className={styles.tm1_item} >
                      <a className={classNames(styles.tm1_link, styles.tm1_current)} href="https://giampaolobramante.wixsite.com/cometa" target="_self">Home</a>
                    </li>
                    <div className={styles.tm1_separator}></div>
                    <li className={styles.tm1_item}>
                      <a className={styles.tm1_link} href="https://giampaolobramante.wixsite.com/cometa" target="_self" data-keep-roots="true" data-anchor="dataItem-ioig1pcs">About</a>
                    </li>
                    <div className={styles.tm1_separator}></div>
                    <li className={styles.tm1_item}>
                      <a className={styles.tm1_link} href="https://giampaolobramante.wixsite.com/cometa" target="_self" data-keep-roots="true" data-anchor="dataItem-ioig2oa8">Featured</a>
                    </li>
                    <div className={styles.tm1_separator}></div>
                    <li className={styles.tm1_item}>
                      <a className={styles.tm1_link} href="https://giampaolobramante.wixsite.com/cometa" target="_self" data-keep-roots="true" data-anchor="dataItem-ioig3o66">Contact</a>
                    </li>
                    <div className={styles.tm1_separator}></div>
                    <li className={styles.tm1_item}>
                      <a className={styles.tm1_link} href="https://giampaolobramante.wixsite.com/cometa" target="_self" data-keep-roots="true" data-anchor="dataItem-ioig4xrg">Demo</a>
                    </li>
                    <div className={styles.tm1_separator}></div>
                    <li className={styles.tm1_item}>
                      <a className={styles.tm1_link} href="https://giampaolobramante.wixsite.com/cometa/products" target="_self">Products</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <a href="#" className={classNames(styles.tm1_menuInitial, styles['tm1_dir-center'], styles.tm1menuButton)}>
            <svg preserveAspectRatio="none" viewBox="0 0 17 17" className={classNames(styles.tm1_icon, styles.tm1iconSVG)} >
              <line x2="100%" className={classNames(styles.tm1_line1, styles['tm1_animating-line'])}></line>
              <line x2="100%" className={classNames(styles.tm1_line2, styles['tm1_animating-line'])}></line>
              <line x2="100%" className={classNames(styles.tm1_line3, styles['tm1_animating-line'])}></line>
            </svg>
          </a>
        </nav>
        <div title="logo cometa trazado.png" className={styles.wp2}>
          <div className={styles.wp2link} >
            <div className={styles.wp2img}>
              <img alt="" data-type="image" src="https://static.wixstatic.com/media/8286c9_db0dc25e086d4eeaa8e33c4b96abc3bd~mv2.png/v1/fill/w_570,h_222,al_c,usm_0.66_1.00_0.01/8286c9_db0dc25e086d4eeaa8e33c4b96abc3bd~mv2.png"/>
            </div>
          </div>
        </div>

      </div>
    </div>
  </header>
);

export default Nav;