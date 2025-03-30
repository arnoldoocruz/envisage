import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setDisplayProjectPanel, setShowDetail } from '../actions';
import { useEffect } from 'react';
import $ from 'jquery';

export default () => {
  const dispatch = useDispatch();
  const displayProjectPanel = useSelector(state => state.main.displayProjectPanel);
  const handleClosePanel = (e) => {
    dispatch(setDisplayProjectPanel(false));
  }

  const handleMenuChange = (e) => {
    dispatch(setShowDetail(false));
  }
  const showDetail = (e) => {
    dispatch(setShowDetail(true));
  }

  let nWidth = window.innerWidth;
  let moveLen = nWidth * 18 / 100;

  useEffect(() => {
    if(!displayProjectPanel) {
      $('.fourth-menu-left-rt').css('left', -moveLen + 'px');
    } else {
      $('.fourth-menu-left-rt').css('left', '0');
    }
  }, [displayProjectPanel]);

  return (
    <div className="fourth-menu-left-rt">
        <button onClick={handleClosePanel} className="fourth-close-btn-rt">×</button>
        <div className="fourth-menu-container">
          <ol className="fourth-featured">
            <li>
					    <a onClick={handleMenuChange}>Featured</a>
				    </li>
            <li>
			    		<a onClick={handleMenuChange}>Conceptual brading</a>
				    </li>
            <li>
			    		<a onClick={handleMenuChange}>Interior Design</a>
				    </li>
            <li>
			    		<a onClick={handleMenuChange}>Product Design</a>
				    </li>
					</ol>
          <ol className="fourth-nav-content-rt">
			      <li className="fourth-menu-headline-rt">Project <br/> By Brand</li>
						<li>
              <a onClick={showDetail}>Apharsec</a>
			    	</li>
            <li>
		    			<a onClick={showDetail}>Arza</a>
				    </li>
            <li>
			    		<a onClick={showDetail}>Blue Diamond Vodka</a>
				    </li>
            <li>
			    		<a onClick={showDetail}>CHATEAU DE GALILEE</a>
				    </li>
            <li>
			    		<a onClick={showDetail}>INTUITION</a>
				    </li>
            <li>
			    		<a onClick={showDetail}>JEKYLL AND HYDE</a>
				    </li>
					</ol>
        </div>
      </div>
  );
};
