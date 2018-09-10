import React from 'react';
import styles from './Nav.module.css';
import classNames from 'classnames';
import Media from "react-media";
import BgVideo from "../../assets/images/bg-video.mp4";
import BgImage from "../../assets/images/bg.webp";

class Nav extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      isCollapsed : false
    }
    this.handleOnClick = this.handleOnClick.bind(this);
    this.renderMobileNav = this.renderMobileNav.bind(this);
    this.renderDesktopNav = this.renderDesktopNav.bind(this);
  }
  handleOnClick(){
    this.setState({isCollapsed : !this.state.isCollapsed})
  }

  renderMobileNav(){
    return(
      <nav className={classNames(styles['hidden-on-warmup'], styles.tm1)}>
        <div className={classNames(styles.fullScreenOverlay, styles.tm1_menuInitial, styles['tm1_dir-center'], styles.tm1fullScreenOverlay, {[styles.tm1_menuOpen]:this.state.isCollapsed})}>
          <div className={classNames(styles.fullScreenOverlayContent, styles.tm1fullScreenOverlayContent)}>
            <div className={classNames(styles['tm1_dir-center'], styles.tm1menuBackground, {[styles.tm1_menuOpen]:this.state.isCollapsed})}>
              <div className={classNames(styles['tm1_dir-center'], styles.tm1menuContainer, {[styles.tm1_menuOpen]:this.state.isCollapsed})}>
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
        <a onClick={this.handleOnClick} className={classNames(styles.tm1_menuInitial, styles['tm1_dir-center'], styles.tm1menuButton, {[styles.tm1_menuOpen]:this.state.isCollapsed})}>
          <svg preserveAspectRatio={this.state.isCollapsed ? '' : 'none'} viewBox="0 0 17 17" className={classNames(styles.tm1_icon, styles.tm1iconSVG)} >
            <line x2="100%" className={classNames(styles.tm1_line1, styles['tm1_animating-line'])}></line>
            <line x2="100%" className={classNames(styles.tm1_line2, styles['tm1_animating-line'])}></line>
            <line x2="100%" className={classNames(styles.tm1_line3, styles['tm1_animating-line'])}></line>
          </svg>
        </a>
      </nav>
    );
  }

  renderDesktopNav(){
    return(
      <nav className={styles.ddm1} dir="ltr">
        <ul aria-label="Site navigation" role="navigation" className={styles.ddm1itemsContainer}>
          <li data-direction="ltr" data-listposition="center" className={classNames(styles.ddm1repeaterButton, styles.active)} aria-hidden="false">
            <a role="button" tabIndex="0" aria-haspopup="false" data-listposition="center" href="https://giampaolobramante.wixsite.com/cometa"
                target="_self" className={styles.ddm1repeaterButtonlinkElement}>
              <div className={styles.ddm1repeaterButton_gapper}>
                  <div className={styles.ddm1repeaterButtonbg}>
                      <p className={styles.ddm1repeaterButtonlabel}>Home</p>
                  </div>
              </div>
            </a>
          </li>
          <li data-direction="ltr" data-listposition="center" className={styles.ddm1repeaterButton} aria-hidden="false">
            <a role="button" tabIndex="0" aria-haspopup="false" data-listposition="center" href="https://giampaolobramante.wixsite.com/cometa"
                target="_self" className={styles.ddm1repeaterButtonlinkElement}>
              <div className={styles.ddm1repeaterButton_gapper}>
                <div className={styles.ddm1repeaterButtonbg}>
                  <p className={styles.ddm1repeaterButtonlabel}>About</p>
                </div>
              </div>
            </a>
          </li>
          <li data-direction="ltr" data-listposition="center" className={styles.ddm1repeaterButton} aria-hidden="false">
            <a role="button" tabIndex="0" aria-haspopup="false" data-listposition="center" href="https://giampaolobramante.wixsite.com/cometa"
                target="_self" className={styles.ddm1repeaterButtonlinkElement}>
              <div className={styles.ddm1repeaterButton_gapper}>
                <div className={styles.ddm1repeaterButtonbg}>
                  <p className={styles.ddm1repeaterButtonlabel}>Featured</p>
                </div>
              </div>
            </a>
          </li>
          <li data-direction="ltr" data-listposition="center" className={styles.ddm1repeaterButton} aria-hidden="false">
            <a role="button" tabIndex="0" aria-haspopup="false" data-listposition="center" href="https://giampaolobramante.wixsite.com/cometa"
                target="_self" className={styles.ddm1repeaterButtonlinkElement}>
              <div className={styles.ddm1repeaterButton_gapper}>
                <div className={styles.ddm1repeaterButtonbg}>
                  <p className={styles.ddm1repeaterButtonlabel}>Contact</p>
                </div>
              </div>
            </a>
          </li>
          <li data-direction="ltr" data-listposition="center" className={styles.ddm1repeaterButton} aria-hidden="false">
            <a role="button" tabIndex="0" aria-haspopup="false" data-listposition="center" href="https://giampaolobramante.wixsite.com/cometa"
                target="_self" className={styles.ddm1repeaterButtonlinkElement}>
              <div className={styles.ddm1repeaterButton_gapper}>
                <div className={styles.ddm1repeaterButtonbg}>
                  <p className={styles.ddm1repeaterButtonlabel}>Demo</p>
                </div>
              </div>
            </a>
          </li>
          <li data-direction="ltr" data-listposition="center" className={styles.ddm1repeaterButton} aria-hidden="false">
            <a role="button" tabIndex="0" aria-haspopup="false" data-listposition="center" href="https://giampaolobramante.wixsite.com/cometa"
                target="_self" className={styles.ddm1repeaterButtonlinkElement}>
              <div className={styles.ddm1repeaterButton_gapper}>
                <div className={styles.ddm1repeaterButtonbg}>
                  <p className={styles.ddm1repeaterButtonlabel}>Products</p>
                </div>
              </div>
            </a>
          </li>
          <li data-direction="ltr" data-listposition="center" className={styles.ddm1repeaterButton} aria-hidden="false">
            <a role="button" tabIndex="0" aria-haspopup="false" data-listposition="center" href="https://giampaolobramante.wixsite.com/cometa"
                target="_self" className={styles.ddm1repeaterButtonlinkElement}>
              <div className={styles.ddm1repeaterButton_gapper}>
                <div className={styles.ddm1repeaterButtonbg}>
                  <p className={styles.ddm1repeaterButtonlabel}>More...</p>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </nav>
    );
  }
  
  render(){
    return(
      <header className={styles.hc1}>
        <video autoplay="autoplay" loop="true" width="100%" className={styles.bgVideovideo}>
          <source src={BgVideo} type="video/mp4"></source>
        </video>
        <img src={BgImage} width="100%" className={styles.bgColorsImage} />
        <div className={styles.hc1screenWidthBackground}></div>
        <div className={styles.hc1centeredContent}>
          <div className={styles.hc1bg}></div>
          <div className={styles.hc1inlineContent}>

            <Media query="(max-width: 599px)">
              {matches =>
                matches ? (
                  this.renderMobileNav()
                ) : (
                  this.renderDesktopNav()
                )
              }
            </Media>

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
  }
}

export default Nav;
