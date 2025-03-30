import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import * as Events from "./Events";
import { isNil, isNull, isPositiveNumber } from "./utils";
import usePrevious from "./usePrevValue";

import { useDispatch, useSelector } from 'react-redux';
import { setNavbarNum, setProjectDetailImageNum } from '../demo/src/actions'

if (!global._babelPolyfill) {
  require("babel-polyfill");
}

const DEFAULT_ANIMATION_TIMER = 1000;
const DEFAULT_ANIMATION = "ease-in-out";
let DEFAULT_CONTAINER_HEIGHT;
let diff = 2;
if(window.innerWidth < 576) {
  DEFAULT_CONTAINER_HEIGHT = window.innerHeight + "px";
} else {
  DEFAULT_CONTAINER_HEIGHT = '100vh';
}
 
const DEFAULT_CONTAINER_WIDTH = "100vw";
const DEFAULT_COMPONENT_INDEX = 0;
const DEFAULT_COMPONENTS_TO_RENDER_LENGTH = 0;

const DEFAULT_ANIMATION_TIMER_BUFFER = 200;
const KEY_UP = 38;
const KEY_DOWN = 40;
const MINIMAL_DELTA_Y_DIFFERENCE = 1;
const DISABLED_CLASS_NAME = "rps-scroll--disabled";

let previousTouchMove = null;
let isScrolling = false;
let isMounted = false;
let isBodyScrollEnabled = true;
let isTransitionAfterComponentsToRenderChanged = false;
const containers = [];

const ReactPageScroller = ({
  animationTimer,
  animationTimerBuffer,
  blockScrollDown,
  blockScrollUp,
  children,
  containerHeight,
  handleScrollUnavailable,
  onBeforePageScroll,
  pageOnChange,
  renderAllPagesOnFirstRender,
  transitionTimingFunction,
  moveNavBox,
}) => {
  const customPageNumber = useSelector(state => state.main.navbarNum);
  const projectDetailImageNum = useSelector(state => state.main.projectDetailImageNum);

  const dispatch = useDispatch();
  
  const [componentIndex, setComponentIndex] = useState(DEFAULT_COMPONENT_INDEX);
  const [componentsToRenderLength, setComponentsToRenderLength] = useState(
    DEFAULT_COMPONENTS_TO_RENDER_LENGTH,
  );
  const prevComponentIndex = usePrevious(componentIndex);
  const scrollContainer = useRef(null);
  const pageContainer = useRef(null);
  const lastScrolledElement = useRef(null);

  const scrollPage = useCallback(
    nextComponentIndex => {
      if (onBeforePageScroll) {
        onBeforePageScroll(nextComponentIndex);
      }

      pageContainer.current.style.transform = `translate3d(0, ${nextComponentIndex *
        -100}%, 0)`;
    },
    [onBeforePageScroll],
  );

  const addNextComponent = useCallback(
    componentsToRenderOnMountLength => {
      let tempComponentsToRenderLength = 0;

      if (!isNil(componentsToRenderOnMountLength)) {
        tempComponentsToRenderLength = componentsToRenderOnMountLength;
      }

      tempComponentsToRenderLength = Math.max(
        tempComponentsToRenderLength,
        componentsToRenderLength,
      );

      if (tempComponentsToRenderLength <= componentIndex + 1) {
        if (!isNil(children[componentIndex + 1])) {
          tempComponentsToRenderLength++;
        }
      }

      setComponentsToRenderLength(tempComponentsToRenderLength);
    },
    [children, componentIndex, componentsToRenderLength],
  );

  const checkRenderOnMount = useCallback(() => {
    if (renderAllPagesOnFirstRender) {
      setComponentsToRenderLength(React.Children.count(children));
    } else if (!isNil(children[DEFAULT_COMPONENT_INDEX + 1])) {
      addNextComponent(DEFAULT_COMPONENTS_TO_RENDER_LENGTH + 1);
    }
  }, [addNextComponent, children, renderAllPagesOnFirstRender]);

  const disableScroll = useCallback(() => {
    if (isBodyScrollEnabled) {
      isBodyScrollEnabled = false;
      window.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth",
      });
      document.body.classList.add(DISABLED_CLASS_NAME);
      document.documentElement.classList.add(DISABLED_CLASS_NAME);
    }
  }, []);

  const enableDocumentScroll = useCallback(() => {
    if (!isBodyScrollEnabled) {
      isBodyScrollEnabled = true;
      document.body.classList.remove(DISABLED_CLASS_NAME);
      document.documentElement.classList.remove(DISABLED_CLASS_NAME);
    }
  }, []);

  const setRenderComponents = useCallback(() => {
    const newComponentsToRender = [];

    let i = 0;

    while (i < componentsToRenderLength && !isNil(children[i])) {
      containers[i] = true;
      newComponentsToRender.push(
        <div key={i} style={{ height: "100%", width: "100%" }}>
          {React.cloneElement(children[i], { ...children[i].props })}
        </div>,
      );
      i++;
    }

    return newComponentsToRender;
  }, [children, componentsToRenderLength]);

  const scrollWindowDown = useCallback(() => {
    if (!isScrolling && !blockScrollDown) {
      if (!isNil(containers[componentIndex + 1])) {
        disableScroll();
        isScrolling = true;
        scrollPage(componentIndex + 1);
        
        moveNavBox(componentIndex + 1);

        setTimeout(() => {
          if (isMounted) {
            setComponentIndex(prevState => parseInt(prevState) + 1);
            dispatch(setNavbarNum(parseInt(componentIndex) + 1));
          }
        }, animationTimer + animationTimerBuffer);
      } else {
        enableDocumentScroll();
        if (handleScrollUnavailable) {
          handleScrollUnavailable();
        }
      }
    }
    
  }, [
    animationTimer,
    animationTimerBuffer,
    blockScrollDown,
    componentIndex,
    disableScroll,
    enableDocumentScroll,
    handleScrollUnavailable,
    scrollPage,
  ]);

  const scrollWindowUp = useCallback(() => {
    if (!isScrolling && !blockScrollUp) {
      if (!isNil(containers[componentIndex - 1])) {
        disableScroll();
        isScrolling = true;
        scrollPage(componentIndex - 1);
        
        moveNavBox(componentIndex - 1);

        setTimeout(() => {
          if (isMounted) {
            setComponentIndex(prevState => parseInt(prevState) - 1);
            dispatch(setNavbarNum(parseInt(componentIndex) - 1));
          }
        }, animationTimer + animationTimerBuffer);
      } else {
        enableDocumentScroll();
        if (handleScrollUnavailable) {
          handleScrollUnavailable();
        }
      }
    }
  }, [
    animationTimer,
    animationTimerBuffer,
    blockScrollUp,
    componentIndex,
    disableScroll,
    enableDocumentScroll,
    handleScrollUnavailable,
    scrollPage,
  ]);

  const touchMove = useCallback(
    event => {
      let flag = true;
      let ele = event.target;
      while(true) {
        if(ele.id === 'root') {
          break;
        }
        if(ele.id === 'id-scroll-part') {
          let scrollEle = document.getElementById('id-scroll-part');
          let flag1 = false;
          if(event.touches[0].clientY > previousTouchMove && scrollEle.scrollTop === 0) flag1 = true;
          else if(event.touches[0].clientY < previousTouchMove && scrollEle.scrollTop >= scrollEle.scrollHeight - scrollEle.clientHeight - diff)
            flag1 = true;
          flag = flag1;
          break;
        }
        if(ele.id === 'id-journal-summary') {
          let scrollEle = document.getElementById('id-journal-summary');
          let flag1 = false;
          if(event.touches[0].clientY > previousTouchMove && scrollEle.scrollTop === 0) flag1 = true;
          else if(event.touches[0].clientY < previousTouchMove && scrollEle.scrollTop >= scrollEle.scrollHeight - scrollEle.clientHeight - diff)
            flag1 = true;
          flag = flag1;
          break;
        }
        if(ele.id === 'id-journal-detail') {
          let scrollEle = document.getElementById('id-journal-detail');
          let flag1 = false;
          if(event.touches[0].clientY > previousTouchMove && scrollEle.scrollTop === 0) flag1 = true;
          else if(event.touches[0].clientY < previousTouchMove && scrollEle.scrollTop >= scrollEle.scrollHeight - scrollEle.clientHeight - diff)
            flag1 = true;
          flag = flag1;
          break;
        }
        if(ele.id === 'id-mobile-project') {
          let scrollEle = document.getElementById('id-mobile-project');
          let flag1 = false;
          if(event.touches[0].clientY > previousTouchMove && scrollEle.scrollTop === 0) flag1 = true;
          else if(event.touches[0].clientY < previousTouchMove && scrollEle.scrollTop >= scrollEle.scrollHeight - scrollEle.clientHeight - diff)
            flag1 = true;
          flag = flag1;
          break;
        }
        if(ele.id === 'id-mobile-journal') {
          let scrollEle = document.getElementById('id-mobile-journal');
          let flag1 = false;
          if(event.touches[0].clientY > previousTouchMove && scrollEle.scrollTop === 0) flag1 = true;
          else if(event.touches[0].clientY < previousTouchMove && scrollEle.scrollTop >= scrollEle.scrollHeight - scrollEle.clientHeight - diff)
            flag1 = true;
          flag = flag1;
          break;
        }
        if(ele.id === 'id-projects-detail-container') {
          flag = false;
          break;
        }
        if(ele.id === 'id-mobile-menu-page') {
          flag = false;
          break;
        }
        if(ele.id === 'id-mobile-link-page') {
          flag = false;
          break;
        }
        ele = ele.parentElement;
      }
      if (!isNil(previousTouchMove) && flag) {
        if (event.touches[0].clientY > previousTouchMove) {
          scrollWindowUp();
        } else {
          scrollWindowDown();
        }
      } else {
        previousTouchMove = event.touches[0].clientY;
      }
    },
    [scrollWindowDown, scrollWindowUp],
  );


  const wheelScroll = useCallback(
    event => {
      let flag = true;
      let ele = event.target;
      while(true) {
        if(ele.id === 'root') {
          break;
        }
        if(ele.id === 'id-scroll-part') {
          let scrollEle = document.getElementById('id-scroll-part');
          let flag1 = false;
          if(event.deltaY < 0 && scrollEle.scrollTop === 0) flag1 = true;
          else if(event.deltaY > 0 && scrollEle.scrollTop >= scrollEle.scrollHeight - scrollEle.clientHeight - diff)
            flag1 = true;
          flag = flag1;
          break;
        }
        if(ele.id === 'id-journal-summary') {
          let scrollEle = document.getElementById('id-journal-summary');
          let flag1 = false;
          if(event.deltaY < 0 && scrollEle.scrollTop === 0) flag1 = true;
          else if(event.deltaY > 0 && scrollEle.scrollTop >= scrollEle.scrollHeight - scrollEle.clientHeight - diff)
            flag1 = true;
          flag = flag1;
          break;
        }
        if(ele.id === 'id-journal-detail') {
          let scrollEle = document.getElementById('id-journal-detail');
          let flag1 = false;
          if(event.deltaY < 0 && scrollEle.scrollTop === 0) flag1 = true;
          else if(event.deltaY > 0 && scrollEle.scrollTop >= scrollEle.scrollHeight - scrollEle.clientHeight - diff)
            flag1 = true;
          flag = flag1;
          break;
        }
        if(ele.id === 'id-mobile-project') {
          let scrollEle = document.getElementById('id-mobile-project');
          let flag1 = false;
          if(event.deltaY < 0 && scrollEle.scrollTop === 0){
            flag1 = true;
          }
          else if(event.deltaY > 0 && scrollEle.scrollTop >= scrollEle.scrollHeight - scrollEle.clientHeight - diff) {
            flag1 = true;
          }
          flag = flag1;
          break;
        }
        if(ele.id === 'id-mobile-journal') {
          let scrollEle = document.getElementById('id-mobile-journal');
          let flag1 = false;
          if(event.deltaY < 0 && scrollEle.scrollTop === 0) flag1 = true;
          else if(event.deltaY > 0 && scrollEle.scrollTop >= scrollEle.scrollHeight - scrollEle.clientHeight - diff)
            flag1 = true;
          flag = flag1;
          break;
        }
        if(ele.id === 'id-projects-detail-container') {
          if(projectDetailImageNum > 0 && event.deltaY < 0) {
            dispatch(setProjectDetailImageNum(projectDetailImageNum - 1));
          } else if(projectDetailImageNum < 4 && event.deltaY > 0) {
            dispatch(setProjectDetailImageNum(projectDetailImageNum + 1));
          } else if(projectDetailImageNum == 0 && event.deltaY < 0) {
            dispatch(setProjectDetailImageNum(4));
          } else if(projectDetailImageNum == 4 && event.deltaY > 0) {
            dispatch(setProjectDetailImageNum(0));
          }
          flag = false;
          break;
        }
        if(ele.id === 'id-mobile-menu-page') {
          flag = false;
          break;
        }
        if(ele.id === 'id-mobile-link-page') {
          flag = false;
          break;
        }
        ele = ele.parentElement;
      }

      if (Math.abs(event.deltaY) > MINIMAL_DELTA_Y_DIFFERENCE && flag) {
        if (isPositiveNumber(event.deltaY)) {
          lastScrolledElement.current = event.target;
          scrollWindowDown();
        } else {
          lastScrolledElement.current = event.target;
          scrollWindowUp();
        }
      }
    },
    [scrollWindowDown, scrollWindowUp, projectDetailImageNum],
  );

  const keyPress = useCallback(
    event => {
      if (event.keyCode === KEY_UP) {
        scrollWindowUp();
      }
      if (event.keyCode === KEY_DOWN) {
        scrollWindowDown();
      }
    },
    [scrollWindowDown, scrollWindowUp],
  );

  useEffect(() => {
    scrollContainer.current.addEventListener(Events.TOUCHMOVE, touchMove);
    scrollContainer.current.addEventListener(Events.KEYDOWN, keyPress);
    return () => {
      scrollContainer.current.removeEventListener(Events.TOUCHMOVE, touchMove);
      scrollContainer.current.removeEventListener(Events.KEYDOWN, keyPress);
    };
  }, [touchMove, keyPress]);

  useEffect(() => {
    isMounted = true;

    checkRenderOnMount();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    isScrolling = false;
    previousTouchMove = null;
    if (componentIndex > prevComponentIndex) {
      addNextComponent();
    }
  }, [addNextComponent, componentIndex, prevComponentIndex]);

  useEffect(() => {
    if (pageOnChange) {
      pageOnChange(componentIndex);
    }
  }, [pageOnChange, componentIndex]);

  useEffect(() => {
    if (!isNil(customPageNumber) && customPageNumber !== componentIndex) {
      let newComponentsToRenderLength = componentsToRenderLength;

      if (customPageNumber !== componentIndex) {
        if (!isNil(containers[customPageNumber]) && !isScrolling) {
          isScrolling = true;
          // eslint-disable-next-line max-len
          scrollPage(customPageNumber);

          if (
            isNil(containers[customPageNumber]) &&
            !isNil(children[customPageNumber])
          ) {
            newComponentsToRenderLength++;
          }

          setTimeout(() => {
            setComponentIndex(parseInt(customPageNumber));
            setComponentsToRenderLength(newComponentsToRenderLength);
          }, animationTimer + animationTimerBuffer);
        } else if (!isScrolling && !isNil(children[customPageNumber])) {
          for (let i = componentsToRenderLength; i <= customPageNumber; i++) {
            newComponentsToRenderLength++;
          }

          if (!isNil(children[customPageNumber])) {
            newComponentsToRenderLength++;
          }

          isScrolling = true;
          isTransitionAfterComponentsToRenderChanged = true;
          setComponentsToRenderLength(newComponentsToRenderLength);
        }
      }
    }
  }, [customPageNumber, scrollPage]);

  useEffect(() => {
    if (isTransitionAfterComponentsToRenderChanged) {
      isTransitionAfterComponentsToRenderChanged = false;

      scrollPage(customPageNumber);

      setTimeout(() => {
        setComponentIndex(parseInt(customPageNumber));
      }, animationTimer + animationTimerBuffer);
    }
  }, [
    animationTimer,
    animationTimerBuffer,
    componentsToRenderLength,
    customPageNumber,
    scrollPage,
  ]);


  return (
    <div
      ref={scrollContainer}
      style={{
        height: containerHeight,
        width: '100%',
        overflow: "hidden",
      }}
    >
      <div
        ref={pageContainer}
        onWheel={wheelScroll}
        style={{
          height: "100%",
          width: "100%",
          transition: `transform 1200ms cubic-bezier(0.81, 0.07, 0.4, 0.9)`,
          outline: "none",
        }}
        tabIndex={0}
      >
        {setRenderComponents()}
      </div>
    </div>
  );
};

ReactPageScroller.propTypes = {
  animationTimer: PropTypes.number,
  animationTimerBuffer: PropTypes.number,
  blockScrollDown: PropTypes.bool,
  blockScrollUp: PropTypes.bool,
  children: PropTypes.any,
  containerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  containerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  customPageNumber: PropTypes.number,
  handleScrollUnavailable: PropTypes.func,
  onBeforePageScroll: PropTypes.func,
  pageOnChange: PropTypes.func,
  renderAllPagesOnFirstRender: PropTypes.bool,
  transitionTimingFunction: PropTypes.string,
};

ReactPageScroller.defaultProps = {
  animationTimer: DEFAULT_ANIMATION_TIMER,
  animationTimerBuffer: DEFAULT_ANIMATION_TIMER_BUFFER,
  transitionTimingFunction: DEFAULT_ANIMATION,
  containerHeight: DEFAULT_CONTAINER_HEIGHT,
  containerWidth: DEFAULT_CONTAINER_WIDTH,
  blockScrollUp: false,
  blockScrollDown: false,
};

export default ReactPageScroller;
