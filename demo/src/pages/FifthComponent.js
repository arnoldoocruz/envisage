import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setNavbarNum, setFifthShowDetail, setShowMenu } from "../actions";
import MenuPage from "./MenuPage";
import $ from "jquery";

export default props => {
  const dispatch = useDispatch();
  const showDetail = useSelector(state => state.main.fifthShowDetail);

  const handleLogoClick = () => {
    dispatch(setNavbarNum(0));
    props.moveNavBox(0);
  };
  const handleMenuClick = () => {
    dispatch(setShowMenu(true));
  };

  const handleDetailClick = e => {
    dispatch(setFifthShowDetail(true));
  };

  const handleBack = () => {
    dispatch(setFifthShowDetail(false));
  };

  const screenWidth = window.innerWidth;
  // <MenuPage moveNavBox={props.moveNavBox} />:
  const showMenu = useSelector(state => state.main.showMenu);
  useEffect(() => {
    if (showMenu) {
      $(".menuPage").css("left", "0");
    } else {
      $(".menuPage").css("left", "-100%");
    }
  }, [showMenu]);

  if (screenWidth > 576) {
    if (!showDetail) {
      return (
        <div className="component fifth-component">
          <div className="fifth-img-back-rt"></div>
          <div className="fifth-content" id="id-journal-summary">
            <div className="fifth-logo">
              <img
                src="public/img/logo.svg"
                onClick={handleLogoClick}
                className="main-logo"
              />
            </div>
            <div className="fifth-journal-summary-content-rt">
              <div className="fifth-content-element">
                <img
                  src="public/img/journal/journal2.png"
                  onClick={handleDetailClick}
                />
                <h5>Mizzi Studio</h5>
                <h6>Jonathan Mizzi</h6>
                <p>
                  This is content.
                  <br />
                  This is description.
                  <br />
                  This is detailed description.
                </p>
              </div>
              <div className="fifth-content-element">
                <img
                  src="public/img/journal/journal1.png"
                  onClick={handleDetailClick}
                />
                <h5>India Mahdavi</h5>
                <h6>French architect</h6>
                <p>This is content.</p>
              </div>
            </div>
            <div className="fifth-journal-summary-content-rt">
              <div className="fifth-content-element">
                <img
                  src="public/img/journal/journal1.png"
                  onClick={handleDetailClick}
                />
                <h5>Biscuiteers Baking Company</h5>
                <h6>London</h6>
                <p>This is content.</p>
              </div>
              <div className="fifth-content-element">
                <img
                  src="public/img/journal/journal2.png"
                  onClick={handleDetailClick}
                />
                <h5>Unique Concrete</h5>
                <h6>Unique Concrete</h6>
                <p>This is content.</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="component fifth-component">
          <div className="fifth-detail-left-rt">
            <img src="public/img/journal/journal2.png" />
          </div>
          <div className="fifth-content" id="id-journal-detail">
            <div className="fifth-logo">
              <button className="btn-back-rt" onClick={handleBack}>
                <span>
                  <img src="public/img/back.png"></img>
                </span>
              </button>
              <img
                src="public/img/logo.svg"
                width="150px"
                onClick={handleLogoClick}
                className="main-logo"
              />
            </div>
            <div className="fifth-journal-detail-content-rt">
              <h5>Mizzi Studio</h5>
              <h6>Jonathan Mizzi</h6>
              <p>
                In an age where we both want to catch up with and invalidate the
                trends that swirl around our heads, we have to ask ourselves, do
                we really know what is going on? Does kitsch mean the same thing
                it did many years ago? What exactly is a fixed gear bike?! One
                term you may have seen tattooed on the chest of many a web web
                page, is ‘concept design.’ As a studio, we like to class our
                selves within the aforementioned description of the modern
                person: caught up in conflicting zeitgeists, and itching to
                maintain elements of archaism in our work. Yet we find ourselves
                falling under the same roof as other artists who define
                themselves as ‘concept designers’. We don’t simply do branding;
                interior design; graphic design. Instead, we have come to
                develop a word for a niche point in commercial art that you now
                have to ask yourself: what exactly does it mean?
              </p>
              <img src="public/img/journal/detail11.png" />
              <p>
                There is no greater example of why this term is so important,
                than Jonathan Mizzi, the creator of the eponymous Mizzi Studio.
                He specialises in -you guessed it- concept design! We have
                included a few examples of his work in this post- perhaps you
                can already see what stands him apart from his more rigid
                contemporaries? As you probably know about our studio, we revel
                in tasks and artists who focus on uniqueness. Mizzi does this.
                Oh boy, he does! Bold and academic in his designs, he takes
                simple interior design and branding and turns it into a concept
                that transcends functionality whilst it also maintaining it as
                the core of his work. It is this sumptuous slither of a cross
                section that he teeters on, which makes us addicted to his
                results. Recently, Mizzi has been focusing on industrial, naval
                design and incorporating into his projects. This reflects once
                more, this cross section: beauty meeting functionality, if you
                will.
              </p>
              <p>
                The final product doesn’t necessarily need to be completely
                functional- it just needs to absorb and compliment the space it
                was assigned. Our challenge is to make art that doesn’t
                overshadow the operative space of a restaurant, bar or cafe etc.
                We define functionality in this case as this seamless blending
                of art as an interactive force with a public space. A public
                space must be receptive to an idea that takes what it means for
                example, to eat in a restaurant and make it an experience
                outside of the ordinary
              </p>
            </div>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div className="component fourth-component" id="id-mobile-journal">
          <div
            className="mobile-project-logo"
            style={{ flexBasis: "20%", minHeight: "20%" }}
          >
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
          <div>
            <div className="mobile-project-small-image">
              <img src="public/img/journal/journal1.png" />
            </div>
            <div className="mobile-project-description-wrapper">
              <div className="mobile-project-description">
                <h5>This is title</h5>
                <span>This is content1.</span>
                <span> This is content2.</span>
              </div>
            </div>
          </div>
          <div>
            <div className="mobile-project-small-image">
              <img src="public/img/journal/journal2.png" />
            </div>
            <div className="mobile-project-description-wrapper">
              <div className="mobile-project-description">
                <h5>This is title</h5>
                <span>This is content1.</span>
                <span> This is content2.</span>
              </div>
            </div>
          </div>
          <div>
            <div className="mobile-project-small-image">
              <img src="public/img/journal/journal1.png" />
            </div>
            <div className="mobile-project-description-wrapper">
              <div className="mobile-project-description">
                <h5>This is title</h5>
                <span>This is content1.</span>
                <span> This is content2.</span>
              </div>
            </div>
          </div>
          <div>
            <div className="mobile-project-small-image">
              <img src="public/img/journal/journal2.png" />
            </div>
            <div className="mobile-project-description-wrapper">
              <div className="mobile-project-description">
                <h5>This is title</h5>
                <span>This is content1.</span>
                <span> This is content2.</span>
              </div>
            </div>
          </div>
        </div>
        <MenuPage moveNavBox={props.moveNavBox} />
      </div>
    );
  }
};
