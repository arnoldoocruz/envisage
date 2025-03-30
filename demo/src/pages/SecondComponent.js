import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setNavbarNum, setShowMenu } from "../actions";
import MenuPage from "./MenuPage";
import $ from "jquery";

export default props => {
  const dispatch = useDispatch();
  const handleLogoClick = () => {
    dispatch(setNavbarNum(0));
    props.moveNavBox(0);
  };
  const handleMenuClick = () => {
    dispatch(setShowMenu(true));
  };
  // <MenuPage moveNavBox={props.moveNavBox} />
  const showMenu = useSelector(state => state.main.showMenu);
  useEffect(() => {
    if (showMenu) {
      $(".menuPage").css("left", "0");
    } else {
      $(".menuPage").css("left", "-100%");
    }
  }, [showMenu]);

  const screenWidth = window.innerWidth;

  if (screenWidth > 576) {
    return (
      <div className="component second-component">
        <div className="second-logo-rt">
          <img
            src="public/img/logo.svg"
            onClick={handleLogoClick}
            className="main-logo"
          />
        </div>
        <div className="second-content-rt">
          <div className="second-content-part-rt">
            <h6 className="text-title-pinc-rt">
              about: &nbsp;
              <span className="second-text-title-rt">
                Envisage- concept design studio
              </span>
            </h6>
            <p className="text-content-rt-1">
              Dreams and visions are, of course, completely different. It is
              much like what it means to think, but not to act- to be lost in
              the potential of an idea rather than to reap its fruits. However,
              If reality and imagination are combined– if dreamscapes are fused
              with the focus of vision, a star is born! (Albeit a little
              irregularly shaped!).
            </p>
            <p className="text-content-rt-2">
              That slightly twisted result is what our company Envisage, seeks
              to reproduce for every, single client. For every bonkers brand,
              impossible idea. Sure, it sounds a little dramatic and far fetched
              - but don’t worry, behind every star we sculpt for you is a
              talented team.
            </p>
          </div>
          <div className="second-content-part-rt-2">
            <h6 className="text-title-pinc-rt">I am Ryan Lev-Ari</h6>
            <p className="text-content-rt-3">
              trained, shaped, basking (you name it!) in Graphic and Interior
              Design. At some point, I flitted towards the sun in California to
              open my own independent design studio, specialising in creating a
              visual voice for premium brands. In 2005, I packed my agency (plus
              a couple of awards and some clothes!) and moved to Tel Aviv.
            </p>
            <img src="public/img/about-img.png" width="100%" />
          </div>
          <div className="second-content-part-rt-3">
            <h6 className="text-title-pinc-rt">My approach</h6>
            <p className="text-content-rt-4">
              wherever I practice, has always been simple. I relish in
              contrasts! Chiaroscuro; natural and industrial; art and commerce.
              My vision has always been to develop a strand of art or a style of
              commerce that oozes an intimate and harmonious balance between the
              two.
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div className="component second-component">
          <div className="mobile-about-first">
            <img src="public/img/logo.svg" className="main-logo" />
            <button
              className="menu-page-btn-toggle"
              onClick={handleMenuClick}
              style={{ background: "rgba(30, 30, 30, 0.3)" }}
            >
              <div className="first-line" style={{ background: "black" }}></div>
              <div
                className="second-line"
                style={{ background: "black" }}
              ></div>
              <div className="third-line" style={{ background: "black" }}></div>
            </button>
          </div>
          <div className="mobile-about-second">
            <img src="public/img/about-img.png" />
          </div>
          <div className="mobile-about-third">
            <h6>about: &nbsp;Envisage- concept design studio</h6>
            <p
              className="text-content-rt-1"
              style={{ fontSize: "2.5vw", marginBottom: "4vw" }}
            >
              trained, shaped, basking (you name it!) in Graphic and Interior
              Design. At some point, I flitted towards the sun in California to
              open my own independent design studio, specialising in creating a
              visual voice for premium brands. In 2005, I packed my agency (plus
              a couple of awards and some clothes!) and moved to Tel Aviv.
            </p>
            <p className="text-content-rt-1" style={{ fontSize: "2.5vw" }}>
              That slightly twisted result is what our company Envisage, seeks
              to reproduce for every, single client. For every bonkers brand,
              impossible idea. Sure, it sounds a little dramatic and far fetched
              - but don’t worry, behind every star we sculpt for you is a
              talented team.
            </p>
          </div>
          <div className="mobile-about-fourth">
            <h6>I am Ryan Lev-Ari</h6>
            <p
              className="text-content-rt-1"
              style={{ fontSize: "2.5vw", marginBottom: "4vw" }}
            >
              Dreams and visions are, of course, completely different. It is
              much like what it means to think, but not to act- to be lost in
              the potential of an idea rather than to reap its fruits. However,
              If reality and imagination are combined– if dreamscapes are fused
              with the focus of vision, a star is born! (Albeit a little
              irregularly shaped!).
            </p>
          </div>
          <div className="mobile-about-fifth">
            <h6 className="text-title-pinc-rt">My approach</h6>
            <p className="text-content-rt-4" style={{ fontSize: "2.5vw" }}>
              wherever I practice, has always been simple. I relish in
              contrasts! Chiaroscuro; natural and industrial; art and commerce.
              My vision has always been to develop a strand of art or a style of
              commerce that oozes an intimate and harmonious balance between the
              two.
            </p>
          </div>
        </div>

        <MenuPage moveNavBox={props.moveNavBox} />
      </div>
    );
  }
};
