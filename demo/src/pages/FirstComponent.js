import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setHomeBackNum, setShowMenu } from "../actions";
import $ from "jquery";
import MenuPage from "./MenuPage";

export default props => {
  const dispatch = useDispatch();
  const backNum = useSelector(state => state.main.homeBackNum);

  const handleClickNext = e => {
    if (backNum < 4) {
      dispatch(setHomeBackNum(backNum + 1));
    } else if (backNum == 4) {
      dispatch(setHomeBackNum(0));
    }
  };
  const handleClickPrev = e => {
    if (backNum > 0) {
      dispatch(setHomeBackNum(backNum - 1));
    } else if (backNum == 0) {
      dispatch(setHomeBackNum(4));
    }
  };
  const handleMenuClick = () => {
    dispatch(setShowMenu(true));
  };

  const showMenu = useSelector(state => state.main.showMenu);

  useEffect(() => {
    let imgName = "url('public/img/homepage/back" + backNum + ".jpg')";
    $("#id-home-back").css("background-image", imgName);
    imgName = "url('public/img/homepage/status" + backNum + ".png')";
    $("#id-pos-img").css("background-image", imgName);
  }, [backNum]);

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
      <div className="component first-component" id="id-home-back">
        <div className="main-content-rt">
          <div className="first-blank-33-rt"></div>

          <div className="content-middle-rt">
            <div className="first-column-26-rt"></div>
            <div className="first-column-74-rt">
              <div className="first-row-31"></div>
              <div className="first-row-69">
                <div className="we-are-div-rt">
                  <span className="we-are-rt">WE are&nbsp;&nbsp;</span>
                  <span className="an-rt">an</span>
                </div>
                <div className="award-winning">
                  <span>award-winning concept design agency</span>
                </div>
              </div>
            </div>
          </div>

          <div className="first-description-rt">
            <div className="first-description-logo">
              <div className="flex-w-50-rt"></div>
              <div className="flex-w-50-rt">
                <img src="public/img/logo.svg" className="main-logo" />
              </div>
            </div>
            <div className="first-main-description-area-rt">
              <div className="flex-w-18"></div>
              <div className="flex-w-60">
                <div className="first-description-title-rt">
                  <p>
                    with a holistic approach, specialising in creating a visual
                    voice for premium brands.
                  </p>
                </div>
                <div className="first-description-content-rt">
                  <p>
                    Envisage is for those that want conceptual branding,
                    interior design product design and ideas creation.
                  </p>
                </div>
                <div className="first-description-content-rt">
                  <p>
                    It is imperative for my team and I, that we ensure the very
                    root of your brand is felt by each consumer. That your story
                    may be told, that your personality may be understood - and
                    most importantly- that in the end you see what you had
                    Envisaged.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="first-bottom-rt">
          <div className="first-blank-33-rt"></div>
          <div className="first-bottom-content-rt">
            <a href="mailto:ryan@envisage.studio">Let's get in touch</a>
          </div>
          <div className="first-back-pos-containter">
            <div id="id-pos-img"></div>
          </div>
        </div>
        <div className="first-left-arrow-rt">
          <img
            src="public/img/homepage/left-arrow.png"
            onClick={handleClickPrev}
          />
        </div>
        <div className="first-right-arrow-rt">
          <img
            src="public/img/homepage/right-arrow.png"
            onClick={handleClickNext}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div className="component first-component">
          <div className="mobile-home-img">
            <img src="public/img/logo-white.svg" className="main-logo" />
            <button className="menu-page-btn-toggle" onClick={handleMenuClick}>
              <div className="first-line"></div>
              <div className="second-line"></div>
              <div className="third-line"></div>
            </button>
          </div>
          <div className="mobile-home-content">
            <p>
              Envisage is for those that want conceptual branding, interior
              design product design and ideas creation. It is imperative for my
              team and I, that we ensure the very root of your brand is felt by
              each consumer. That your story may be told, that your personality
              may be understood - and most importantly- that in the end you see
              what you had Envisaged.
            </p>
          </div>
        </div>
        <MenuPage moveNavBox={props.moveNavBox} />
      </div>
    );
  }
};
