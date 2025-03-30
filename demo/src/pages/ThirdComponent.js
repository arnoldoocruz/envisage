import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNavbarNum, setShowMenu, setShowDetail } from "../actions";
import $ from "jquery";
import { useEffect } from "react";
import MenuPage from "./MenuPage";

export default props => {
  const dispatch = useDispatch();
  const handleLogoClick = () => {
    dispatch(setNavbarNum(0));
    props.moveNavBox(0);
  };
  const handleMenuClick = () => {
    dispatch(setShowMenu(true));
  };

  const handleBoardClick = () => {
    dispatch(setShowDetail(true));
    console.log("show detail = true: ");
    dispatch(setNavbarNum(3));
    props.moveNavBox(3);
  };

  useEffect(() => {
    $(".third-component a").click(() => {
      handleBoardClick();
    });
  }, [dispatch]);
  // <MenuPage moveNavBox={props.moveNavBox} />:
  const showMenu = useSelector(state => state.main.showMenu);

  const screenWidth = window.innerWidth;
  useLayoutEffect(() => {
    if (showMenu) {
      $(".menuPage").css("left", "0");
    } else {
      $(".menuPage").css("left", "-100%");
    }
  }, [showMenu]);
  if (screenWidth > 576) {
    return (
      <div className="component third-component">
        <div className="thrid-container-white">
          <div className="third-blank-33-rt"></div>
          <div>
            <h5 className="third-text-header-black-rt">Branding |</h5>
            <span className="third-text-content-black-rt">
              <a>conceptual branding</a>
              <a>concept creation</a>
            </span>
          </div>
        </div>
        <div className="thrid-container-black">
          <div className="third-blank-33-rt"></div>
          <div className="third-second-first-rt">
            <h5 className="third-text-header-white-rt">Product Design |</h5>
            <span className="third-text-content-white-rt">
              <a>package design</a>
              <a>furniture design</a>
              <a>ideas creation and trends</a>
            </span>
          </div>
          <div className="third-second-second-rt">
            <h5 className="third-text-header-yellow-rt">Our Process</h5>
            <span className="third-text-content-yellow-rt">
              is to nurture any nugget or seedling you may have
            </span>
          </div>
        </div>
        <div className="thrid-container-white">
          <div className="third-blank-33-rt"></div>
          <div className="third-blank-33-rt">
            <h5 className="third-text-header-black-rt">Interior Design |</h5>
            <span className="third-text-content-black-rt-light">
              <a>restaurant</a>
              <a>coffee shop</a>
              <a>stores</a>
            </span>
          </div>
          <div className="third-blank-33-rt third-third-content-rt">
            <span className="third-text-content-yellow-rt">
              and craft it into something whole. You could bring us: a simple a
              word, a sketch - (or just a feeling!) and we will bring your brand
              to life.
            </span>
          </div>
        </div>
        <div className="thrid-container-black">
          <div className="third-logo-rt">
            <img
              src="public/img/logo-white.svg"
              onClick={handleLogoClick}
              className="main-logo"
            />
          </div>
          <div>
            <h5 className="third-text-header-white-rt">UI UX |</h5>
            <div style={{ textAlign: "left" }}>
              <span className="third-text-content-white-rt">
                <a>apps</a>
                <a>websites</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div className="component third-component">
          <div className="mobile-special-first">
            <div className="mobile-special-white">
              <div className="mobile-special-logo">
                <button
                  className="menu-page-btn-toggle"
                  onClick={handleMenuClick}
                  style={{ background: "rgba(30, 30, 30, 0.3)" }}
                >
                  <div
                    className="first-line"
                    style={{ background: "black" }}
                  ></div>
                  <div
                    className="second-line"
                    style={{ background: "black" }}
                  ></div>
                  <div
                    className="third-line"
                    style={{ background: "black" }}
                  ></div>
                </button>
              </div>
              <div className="mobile-special-content">
                <div className="mobile-special-padding"></div>
                <div>
                  <h5 className="mobile-special-title-black">Branding |</h5>
                  <span className="mobile-special-content-black">
                    <a>conceptual branding</a>
                    <a>concept creation</a>
                  </span>
                </div>
                <img src="public/img/mobile/special/circle-black.png" />
              </div>
            </div>
            <div className="mobile-special-black">
              <div className="mobile-special-logo"></div>
              <div className="mobile-special-content">
                <div className="mobile-special-padding"></div>
                <div>
                  <h5 className="mobile-special-title-white">UI UX |</h5>
                  <span className="mobile-special-content-white">
                    <a>apps</a>
                    <a>websites</a>
                  </span>
                </div>
                <img src="public/img/mobile/special/circle-white.png" />
              </div>
            </div>
          </div>
          <div className="mobile-special-first">
            <div className="mobile-special-black">
              <div className="mobile-special-logo">
                <img src="public/img/logo-white.svg" className="main-logo" />
              </div>
              <div className="mobile-special-content">
                <div className="mobile-special-padding"></div>
                <div>
                  <h5 className="mobile-special-title-white">
                    Product Design |
                  </h5>
                  <span className="mobile-special-content-white">
                    <a>package design</a>
                    <a>furniture design</a>
                    <a>ideas creation and trends</a>
                  </span>
                </div>
                <img src="public/img/mobile/special/circle-white.png" />
              </div>
            </div>
            <div className="mobile-special-white">
              <div className="mobile-special-logo"></div>
              <div className="mobile-special-content">
                <div className="mobile-special-padding"></div>
                <div>
                  <h5 className="mobile-special-title-black">
                    Interior Design |
                  </h5>
                  <span className="mobile-special-content-black">
                    <a>restaurant</a>
                    <a>coffee shop</a>
                    <a>stores</a>
                  </span>
                </div>
                <img src="public/img/mobile/special/circle-black.png" />
              </div>
            </div>
          </div>
        </div>
        <MenuPage moveNavBox={props.moveNavBox} />
      </div>
    );
  }
};
