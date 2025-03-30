import React from "react";
import { useDispatch } from 'react-redux';
import { setNavbarNum, setShowMenu } from '../actions';

export default (props) => {
  const dispatch = useDispatch();
  const handleCloseMenu = (e) => {
    dispatch(setShowMenu(false));
  }

  const handleLink = (e) => {
    e.preventDefault();
    let pageNum = e.target.getAttribute('num');
    dispatch(setShowMenu(false));
    setTimeout(() => {
      props.moveNavBox(pageNum);
      dispatch(setNavbarNum(pageNum));
    }, 800);
    
  }


  const screenWidth = window.innerWidth;

  if(screenWidth > 576) {
    return (
      <div className="menuPage">
        <div className="second-logo-rt">
          <img src="public/img/logo.svg" onClick={handleLogoClick} className="main-logo"/>
        </div>
        <div className="second-content-rt">
          <div className="second-content-part-rt">
            <h6 className="text-title-pinc-rt">about: &nbsp;<span className="second-text-title-rt">Envisage- concept design studio</span></h6>
            <p className="text-content-rt-1">Dreams and visions are, of course, completely different. It is much like what it means to think, but not to act- to be lost in the potential of an idea rather than to reap its fruits. However, If reality and imagination are combined– if dreamscapes are fused with the focus of vision, a star is born! (Albeit a little irregularly shaped!).</p>
            <p className="text-content-rt-2">That slightly twisted result is what our company Envisage, seeks to reproduce for every, single client. For every bonkers brand, impossible idea. Sure, it sounds a little dramatic and far fetched - but don’t worry, behind every star we sculpt for you is a talented team.</p>
          </div>
          <div className="second-content-part-rt-2">
            <h6 className="text-title-pinc-rt">I am Ryan Lev-Ari</h6>
            <p className="text-content-rt-3">trained, shaped, basking (you name it!) in Graphic and Interior Design. At some point, I flitted towards the sun in California to open my own independent design studio, specialising in creating a visual voice for premium brands. In 2005, I packed my agency (plus a couple of awards and some clothes!) and moved to Tel Aviv.</p>
            <img src="public/img/about-img.png" width="100%" />
            </div>
          <div className="second-content-part-rt-3">
            <h6 className="text-title-pinc-rt">My approach</h6>
            <p className="text-content-rt-4">wherever I practice, has always been simple. I relish in contrasts! Chiaroscuro; natural and industrial; art and commerce. My vision has always been to develop a strand of art or a style of commerce that oozes an intimate and harmonious balance between the two.</p>
          </div>
        </div>
      </div>
    );
  } else 
  {
    return (
      <div className="menuPage" id="id-mobile-menu-page">
        <div className="mobile-menu-first">
          <img src="public/img/logo-white.svg" className="main-logo"/>
          <button className="menu-page-cross-btn" onClick={handleCloseMenu}>
            <div className="first-line"></div> 
            <div className="second-line"></div>
          </button>
        </div>
        <div className="mobile-menu-second">
          <h5 num={0} onClick={handleLink}>Envisage</h5>
          <h5 num={1} onClick={handleLink}>About</h5>
          <h5 num={3} onClick={handleLink}>Projects</h5>
          <span num={2} onClick={handleLink}>Specialties</span>
          <span num={4} onClick={handleLink}>The Magazine</span>
          <span num={5} onClick={handleLink}>In touch</span>
        </div>
        <div className="mobile-menu-fourth">
          <div className="mobile-menu-fourth-first">
          </div>
          <div className="mobile-menu-fourth-second">
            <span><img src="public/img/mobile/about/icon-camera.png" />&nbsp;&nbsp;&nbsp;@envisage_studio</span>
            <span><img src="public/img/mobile/about/icon-f.png" />&nbsp;&nbsp;&nbsp;envisagedesign</span>
          </div>
        </div>
      </div>
    )
  }
};
  

