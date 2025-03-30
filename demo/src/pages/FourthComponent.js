import React from "react";
import Carousel from 'react-elastic-carousel'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import $ from 'jquery';
import { setShowDetail, setNavbarNum , setProjectDetailImageNum, setProjectSummaryImageNum, setShowLink } from '../actions';
import MenuPage from './MenuPage'
import LinkPage from './LinkPage'

export default (props) => {
  const dispatch = useDispatch();
  const displayProjectPanel = useSelector(state => state.main.displayProjectPanel);
  const showDetail = useSelector(state => state.main.showDetail);

  const width = window.innerWidth;
  const height = window.innerHeight;
  let descHeight = width * 0.642 * 731 / 1280;

  if(width/height > 1920/1080){
    descHeight = 0.8 * height;
  }
 
  const handleDisplayDetail = (e) => {
    dispatch(setShowDetail(true));
  }
  const handleLogoClick = () => {
    dispatch(setNavbarNum(0));
    props.moveNavBox(0);
  }
  const handleMenuClick = () => {
    dispatch(setShowLink(true));
  }

  useEffect(() => {
    let ele = $('#id-summary');
    let nWidth = window.innerWidth;
    let moveLen = nWidth * 18 / 100;

    if(displayProjectPanel) {
      ele.css('padding-left', moveLen + 'px');
    } else {
      ele.css('padding-left', '0');
    }
  }, [displayProjectPanel]);

  const summaryCarouselRef = useRef(null);
  const summaryPos = useSelector(state => state.main.projectSummaryImageNum);
  const projectDetailImageNum = useSelector(state => state.main.projectDetailImageNum);

  const item_widths = [width*0.67, width*0.28, width*0.18, width*0.18, width*0.27];
  const detail_widths = [width*0.6, width*0.5, width*0.5, width*0.5, width*0.5];
  let summary_ele = $('.fourth-summary-page-rt .rec.rec-slider');
  let detail_ele = $('.fourth-project-detail-photo-rt .rec.rec-slider');

  const handleRightSummaryClick = e => {
    if(summaryPos < 4) {
      dispatch(setProjectSummaryImageNum(summaryPos + 1));
    } else if(summaryPos == 4) {
      dispatch(setProjectSummaryImageNum(0));
    }
  }
  const handleLeftSummaryClick = e => {
    if(summaryPos > 0) {
      dispatch(setProjectSummaryImageNum(summaryPos - 1));
    } else if(summaryPos == 0) {
      dispatch(setProjectSummaryImageNum(4));
    }
  }
  useEffect(() => {
    let leftPos = 0;
    for(let i=0; i<summaryPos; i++) {
      leftPos += item_widths[i];
    }
    summary_ele.css('left', -leftPos + 'px');
    let imgUrl = 'public/img/homepage/status' + summaryPos + '.png';
    $('#id-summary-navigation').attr('src', imgUrl);

    leftPos = 0;
    for(let i=0; i<projectDetailImageNum; i++) {
      leftPos += detail_widths[i];
    }
    detail_ele.css('left', -leftPos + 'px');
  });
  

  const carouselRef = useRef(null);

  const handleLeftDetailClick = e => {
    if(projectDetailImageNum > 0) {
      dispatch(setProjectDetailImageNum(projectDetailImageNum - 1));
    } else if(projectDetailImageNum == 0) {
      dispatch(setProjectDetailImageNum(4));
    }
  }
  const handleRightDetailClick = e => {
    if(projectDetailImageNum < 4) {
      dispatch(setProjectDetailImageNum(projectDetailImageNum + 1));
    } else if(projectDetailImageNum == 4) {
      dispatch(setProjectDetailImageNum(0));
    }
  }
  const handleBack = () => {
    dispatch(setShowDetail(false));
  }
  useEffect(() => {
    let imgUrl = 'public/img/homepage/status' + (projectDetailImageNum) + '.png';
    $('#id-summary-navigation').attr('src', imgUrl);
  }, [projectDetailImageNum]);

  const screenWidth = window.innerWidth;

    // <MenuPage moveNavBox={props.moveNavBox} />
  const showLink = useSelector(state => state.main.showLink);
  useEffect(() =>{
    if(showLink){
      $('.menuPage').css('left', '0');
    }
    else{
      $('.menuPage').css('left', '-100%');
    }
  }, [showLink]);

  if(screenWidth > 576) {
    return (
      <div className="component fourth-component">
        <div className="fourth-content-rt">
          <div className="fourth-logo-container-rt">
            {showDetail &&
            <button className='btn-back-rt' onClick={handleBack}>
              <span><img src="public/img/back.png"></img></span>
            </button>
            }
            <img src="public/img/logo.svg" onClick={handleLogoClick} className="main-logo"/>
          </div>
          {!showDetail ?
            <div className="fourth-summary-page-rt" id="id-summary">
              <div className="fourth-project-summary-photo-rt" >
                <Carousel id='id-main-projects' ref={summaryCarouselRef}>
                  <div className="fourth-summary-inner-div">
                    <img src="public/img/projects/project1.png" 
                      onClick={handleDisplayDetail} 
                      style={{width: '66.2vw', maxHeight: '80vh'}} 
                    />
                    <div className="fourth-project-description-on-image-rt">
                      <h3>Title</h3>
                      <span>This is content.</span>
                    </div>
                  </div>
                  <div className="fourth-carousel-2-elements-rt fourth-summary-inner-div">
                    <div style={{position: 'relative'}}>
                      <img src="public/img/projects/project2.png"  
                        onClick={handleDisplayDetail} 
                        style={{width: '28.7vw', maxHeight: '38vh'}} 
                      />
                      <div className="fourth-project-description-on-image-rt">
                        <h3>Title</h3>
                        <span>This is content.</span>
                      </div>
                    </div>
                    <div style={{position: 'relative'}}>
                      <img src="public/img/projects/project3.png"  
                        onClick={handleDisplayDetail} 
                        style={{width: '28.7vw', maxHeight: '38vh'}} 
                      />
                      <div className="fourth-project-description-on-image-rt">
                        <h3>Title</h3>
                        <span>This is content.</span>
                      </div>
                    </div>
                    
                  </div>
                  <div className="fourth-summary-inner-div">
                    <img src="public/img/projects/project4.png"  
                      onClick={handleDisplayDetail} 
                      style={{width: '17.3vw', maxHeight: '80vh'}} 
                    />
                    <div className="fourth-project-description-on-image-rt">
                      <h3>Title</h3>
                      <span>This is content.</span>
                    </div>
                  </div>
                  <div className="fourth-summary-inner-div">
                    <img src="public/img/projects/project5.png"  
                      onClick={handleDisplayDetail} 
                      style={{width: '17.3vw', maxHeight: '80vh'}} 
                    />
                    <div className="fourth-project-description-on-image-rt">
                      <h3>Title</h3>
                      <span>This is content.</span>
                    </div>
                  </div>
                  <div className="fourth-summary-inner-div">
                    <img src="public/img/projects/project6.png"  
                      onClick={handleDisplayDetail}
                      style={{width: '26vw', maxHeight: '80vh'}} 
                    />
                    <div className="fourth-project-description-on-image-rt">
                      <h3>Title</h3>
                      <span>This is content.</span>
                    </div>
                  </div>
                </Carousel>
                <div className="fourth-left-arrow-summary-rt">
                  <img src="public/img/homepage/left-arrow.png" onClick={handleLeftSummaryClick} />
                </div>
                <div className="fourth-right-arrow-summary-rt">
                  <img src="public/img/homepage/right-arrow.png" onClick={handleRightSummaryClick} />
                </div>
              </div>
              <div className="fourth-main-projects-navigation-rt">
                <img src="public/img/homepage/status0.png" id='id-summary-navigation' />
              </div>
            </div>
           : 
            <div className="fourth-description-page-rt" id="id-summary">
              <div className="fourth-project-description-rt" style={{height: descHeight}} >
                <h3 className = "fourth-description-title-rt">
                  This is the title.
                </h3>
                <p className = "fourth-description-content-rt">
                  Chateau de Galilee is a winery dedicated to creating quality&nbsp;wines sourced from selected vineyards in the upper Galilee area.&nbsp;The Chateau offers a variety of carefully prepared wines&nbsp;made from Israel’s finest, handpicked grapes.
                </p>
                <p className = "fourth-description-content-rt">
                  Chateau de Galilee is a winery dedicated to creating quality&nbsp;wines sourced from selected vineyards in the upper Galilee area.&nbsp;The Chateau offers a variety of carefully prepared wines&nbsp;made from Israel’s finest, handpicked grapes.
                </p>
              </div>
              <div id="id-projects-detail-container" className="fourth-project-detail-photo-rt" >
                <Carousel ref={carouselRef}>
                  <div>
                    <img src="public/img/projects/project1.png" style={{width: '60vw', maxHeight: '80vh'}} />
                  </div>
                  <div>
                    <img src="public/img/projects/project11.png" style={{width: '50vw', maxHeight: '80vh'}} />
                  </div>
                  <div>
                    <img src="public/img/projects/project12.png" style={{width: '50vw', maxHeight: '80vh'}} />
                  </div>
                  <div>
                    <img src="public/img/projects/project13.png" style={{width: '50vw', maxHeight: '80vh'}} />
                  </div>
                  <div>
                    <img src="public/img/projects/project14.png" style={{width: '50vw', maxHeight: '80vh'}} />
                  </div>
                </Carousel>
                <div className="fourth-main-projects-navigation-rt">
                  <img src="public/img/homepage/status0.png" id='id-summary-navigation' />
                </div>
                <div className="fourth-left-arrow-summary-rt">
                  <img src="public/img/homepage/left-arrow.png" onClick={handleLeftDetailClick} />
                </div>
                <div className="fourth-right-arrow-summary-rt">
                  <img src="public/img/homepage/right-arrow.png" onClick={handleRightDetailClick} />
                </div>
              </div>
              
            </div>
        }
          
        </div>
      </div>
    );
  } else 
    {
      if(!showDetail)
      {
        return (
          <div style = {{position:'relative', width:'100%', height:'100%'}}>
            <div className="component fourth-component" id='id-mobile-project'>
              <div className="mobile-project-logo" style={{flexBasis: '20%', minHeight: '20%'}}>
                <img src="public/img/logo.svg" className="main-logo" />
                <button className="menu-page-btn-toggle" onClick={handleMenuClick} style = {{background:'rgba(30, 30, 30, 0.3)'}}>
                  <div className="first-line" style={{background:'black'}}></div> 
                  <div className="second-line" style={{background:'black'}}></div>
                  <div className="third-line" style={{background: 'black'}}></div>
                </button>
              </div>
              <div>
                <div className="mobile-project-big-image">
                  <img src="public/img/projects/project1.png" onClick={handleDisplayDetail} />
                </div>
                <div className="mobile-project-description-wrapper">
                  <div className="mobile-project-description">
                    <h5>SABON</h5>
                    <span>.CONCEPT CREATION.</span>
                    <span> PACKAGE DESIGN, BRANDING.</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="mobile-project-small-image">
                  <img src="public/img/projects/project2.png" onClick={handleDisplayDetail} />
                </div>
                <div className="mobile-project-description-wrapper">
                  <div className="mobile-project-description">
                    <h5>SABON</h5>
                    <span>.CONCEPT CREATION.</span>
                    <span> PACKAGE DESIGN, BRANDING.</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="mobile-project-small-image">
                  <img src="public/img/projects/project3.png" onClick={handleDisplayDetail} />
                </div>
                <div className="mobile-project-description-wrapper">
                  <div className="mobile-project-description">
                    <h5>SABON</h5>
                    <span>.CONCEPT CREATION.</span>
                    <span> PACKAGE DESIGN, BRANDING.</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="mobile-project-small-image">
                  <img src="public/img/projects/project4.png" onClick={handleDisplayDetail} />
                </div>
                <div className="mobile-project-description-wrapper">
                  <div className="mobile-project-description">
                    <h5>SABON</h5>
                    <span>.CONCEPT CREATION.</span>
                    <span> PACKAGE DESIGN, BRANDING.</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="mobile-project-small-image">
                  <img src="public/img/projects/project5.png" onClick={handleDisplayDetail} />
                </div>
                <div className="mobile-project-description-wrapper">
                  <div className="mobile-project-description">
                    <h5>SABON</h5>
                    <span>.CONCEPT CREATION.</span>
                    <span> PACKAGE DESIGN, BRANDING.</span>
                  </div>
                </div>
              </div>
            </div> 
            <LinkPage />
        </div>
        );
      }
      else{
        return(
          <div style = {{position:'relative', width:'100%', height:'100%'}}>
          <div className="component fourth-component" id='id-mobile-project'>
            <div className="mobile-project-logo" style={{flexBasis: '20%', minHeight: '20%'}}>
              <img src="public/img/logo.svg" onClick={handleLogoClick} className="main-logo" />
              <button className="menu-page-btn-toggle" onClick={handleMenuClick} style={{background:'rgba(30, 30, 30, 0.3)'}}>
                <div className="first-line" style={{background:'black'}}></div> 
                <div className="second-line" style={{background:'black'}}></div>
                <div className="third-line" style={{background: 'black'}}></div>
              </button>
              <button className='btn-back-rt' onClick={handleBack}>
                <span><img src="public/img/back.png"></img></span>
              </button>
            </div>
            <div className="mobile-project-detail-description">
              <h3>
                Description
              </h3>
              <p>
                Chateau de Galilee is a winery dedicated to creating quality&nbsp;wines sourced from selected vineyards in the upper Galilee area.&nbsp;The Chateau offers a variety of carefully prepared wines&nbsp;made from Israel’s finest, handpicked grapes.
              </p>
              <p>
                Chateau de Galilee is a winery dedicated to creating quality&nbsp;wines sourced from selected vineyards in the upper Galilee area.&nbsp;The Chateau offers a variety of carefully prepared wines&nbsp;made from Israel’s finest, handpicked grapes.
              </p>
            </div>
            <div>
              <div className="mobile-project-big-image">
                <img src="public/img/projects/project1.png" />
              </div>
            </div>
            <div>
              <div className="mobile-project-small-image">
                <img src="public/img/projects/project11.png" />
              </div>
              <div className="mobile-project-description-wrapper">
                <div className="mobile-project-description">
                
                </div>
              </div>
            </div>
            <div>
              <div className="mobile-project-small-image">
                <img src="public/img/projects/project12.png" />
              </div>
              <div className="mobile-project-description-wrapper">
                <div className="mobile-project-description">
           
                </div>
              </div>
            </div>
            <div>
              <div className="mobile-project-small-image">
                <img src="public/img/projects/project13.png" />
              </div>
              <div className="mobile-project-description-wrapper">
                <div className="mobile-project-description">
         
                </div>
              </div>
            </div>
            <div>
              <div className="mobile-project-small-image">
                <img src="public/img/projects/project14.png" />
              </div>
              <div className="mobile-project-description-wrapper">
                <div className="mobile-project-description">
            
                </div>
              </div>
            </div>
          </div>
          <LinkPage />
        </div>
        )
      }
      
    }
};


