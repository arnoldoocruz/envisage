import React from "react";

import FullPage from "./pages/FullPage";

import {setNavbarNum, setDisplayProjectPanel, setShowDetail, setProjectSummaryImageNum, setFifthShowDetail, } from './actions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProjectPanel from './pages/ProjectPanel'


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  handleNavbarChange = (e) => {
    this.props.setNum(parseInt(e.target.id) - 1);
    this.moveNavBox(parseInt(e.target.id) - 1);
  }

  ResetNavbar = (e) => {
    if(this.props.navNum !== 3){
      this.props.setShowDetail(false);
      this.props.setProjectSummaryImageNum(0);
    } 
    if(this.props.navNum !== 4) {
      this.props.setFifthShowDetail(false);
    }
  }
  componentDidUpdate(prevProps) {
    this.ResetNavbar();
    return true;
  }
  handleToggleProjectPanel = (e) => {
    e.preventDefault();
    this.props.setDisplayProjectPanel(!this.props.displayProjectPanel);
  }
  moveNavBox = (num) => {
    for(var i=0; i<6; i++) {
      document.getElementById(i+1).parentElement.classList.remove("nav-selected-rt");
    }
    let ele = document.getElementById(num + 1);
    if(ele != null)
      ele.parentElement.classList.add("nav-selected-rt");

    let rectEle = document.getElementById('id-navbar-rect');
    rectEle.style.top = num * 16.5 + 0.5 + 'vh';
  }

  render() {
    return (
      <div>
        <div className="navbar-container-rt">
          <div className="navbar-rt">
            <div className="nav-rt nav-selected-rt">
              <p onClick={this.handleNavbarChange} id="1">Home</p>
            </div>
            <div className="nav-rt">
              <p onClick={this.handleNavbarChange} id="2">About</p>
            </div>
            <div className="nav-rt">
              <p onClick={this.handleNavbarChange} id="3">Specialties</p>
            </div>
            <div className="nav-rt" style={{position: "relative"}} style={{background: 'rgba(255,255,255,0.3)'}}>
              <div className="project-nav-rt"></div>
              <p onClick={this.handleNavbarChange} id="4">Projects</p>
              <button onClick={this.handleToggleProjectPanel} className="fourth-toggle-rt">+</button>
            </div>
            <div className="nav-rt">
              <p onClick={this.handleNavbarChange} id="5">Journal</p>
            </div>
            <div className="nav-rt">
              <p onClick={this.handleNavbarChange} id="6">InTouch</p>
            </div>
          </div>
          <div className="navbar-selection-rect-rt" id="id-navbar-rect"></div>
        </div>
        <ProjectPanel />

            <div className="main-area-rt">
              <FullPage moveNavBox={this.moveNavBox}/>
            </div>
   
      </div>
    );
  }
}

const mapStateToProps = state => ({
  navNum : state.main.navbarNum,
  displayProjectPanel : state.main.displayProjectPanel,
  showMenu: state.main.showMenu,
});

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
			setNum: setNavbarNum,
      setDisplayProjectPanel: setDisplayProjectPanel,
      setShowDetail: setShowDetail,
      setProjectSummaryImageNum: setProjectSummaryImageNum,
      setFifthShowDetail: setFifthShowDetail,
		},
		dispatch
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);