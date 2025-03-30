import React from "react";
import {useState, useEffect} from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

import { useDispatch, useSelector } from 'react-redux';
import { setNavbarNum, setShowMenu } from '../actions';
import MenuPage from './MenuPage';
import $ from 'jquery';


export default (props) => {
  const dispatch = useDispatch();
  const handleLogoClick = () => {
    dispatch(setNavbarNum(0));
    props.moveNavBox(0);
  }
  const handleMenuClick = () =>{
    dispatch(setShowMenu(true));
  }

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }
 // <MenuPage moveNavBox={props.moveNavBox} />:
const showMenu = useSelector(state => state.main.showMenu);
 useEffect(() =>{
   if(showMenu){
     $('.menuPage').css('left', '0');
     
   }
   else{
     $('.menuPage').css('left', '-100%');
   }
 }, [showMenu]);
const screenWidth = window.innerWidth;

  if(screenWidth > 576) {
    return (
      <div className="component sixth-component">
        <div className="sixth-form-container-rt">
          <div className="sixth-info-rt">
            <h6 className="sixth-form-title-rt">Tell us what on your mind</h6>
            <div className="sixth-form-subtitle-container-rt">
              <span className="sixth-form-subtitle-rt">052-940-940-1</span><br/><br/>
            </div>
            <span className="sixth-form-subtitle-rt">9 Ahad Haam St. Tel-Aviv<br/><span style={{textTransform: "uppercase"}}>ryan@envisage.studio</span></span>
          </div>
          <div className="sixth-form-rt">
            <div className="first-blank-30-rt"></div>
            <div className="sixth-form-block-rt">
              <form noValidate autoComplete="off">
                <TextField label="Your Name" onChange={handleNameChange} value={name} className="sixth-form-textfield"/>
                <TextField label="Your Email" onChange={handleEmailChange} value={email} className="sixth-form-textfield"/>
                <TextField label="Your Phone" onChange={handlePhoneChange} value={phone} className="sixth-form-textfield"/>
                <div style={{textAlign: "right"}}>
                  <Button className="sixth-form-submit" onClick={handleSubmit} variant="contained">sub<br/>mit</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="sixth-right-rt">
          <div className="sixth-logo-rt">
            <img src="public/img/logo.svg" onClick={handleLogoClick} className="main-logo" />
          </div>
          <div className="sixth-content-rt">
            <div className="flex-w-26-rt"></div>
            <div className="flex-w-44-rt">
              <h6>We will</h6>
              <span className="sixth-be-happy">be happy</span>
              <span className="sixth-work-with">to work with you, listen, plan,</span>
              <span className="sixth-solution">propose solutions</span>
              <div className="sixth-and-rt">
                <div className="img-part">
                  <img src="public/img/and.png" width="100%" />
                </div>
                <div className="text-part">
                  <span>ultimately to ensure the very root of your brand is felt by each consumer.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
  
      return(
       <div style = {{position:'relative', width:'100%', height:'100%'}}> 
      <div className="component sixth-component">
        <div className="sixth-form-container-rt">
          <div className="sixth-logo-rt">
            <button className="menu-page-btn-toggle" onClick={handleMenuClick} style = {{background:'rgba(30, 30, 30, 0.3)'}}>
              <div className="first-line" style={{background:'black'}}></div> 
              <div className="second-line" style={{background:'black'}}></div>
              <div className="third-line" style={{background:'black'}}></div>
            </button>
          </div>
          <div className="sixth-info-rt">
            <h6 className="sixth-form-title-rt">Tell us what on your mind</h6>
            <span className="sixth-form-subtitle-rt"> 9 Ahad Haam St. Tel-Aviv</span><br/>
            <span className="sixth-form-subtitle-rt">052-940-940-1</span><br /><br/>
            <span className="sixth-form-subtitle-rt">ryan@envisage.studio</span><br/>
          </div>
          <div className="sixth-form-rt">
            <div className="sixth-form-block-rt">
              <form noValidate autoComplete="off">
                <TextField label="Your Name" onChange={handleNameChange} value={name} className="sixth-form-textfield"/>
                <TextField label="Your Email" onChange={handleEmailChange} value={email} className="sixth-form-textfield"/>
                <TextField label="Your Phone" onChange={handlePhoneChange} value={phone} className="sixth-form-textfield"/>
                <div style={{textAlign: "right"}}>
                  <Button className="sixth-form-submit" onClick={handleSubmit} variant="contained">submit</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="sixth-right-rt">
          <div className="sixth-logo-rt">
            <img src="public/img/logo.svg" className="main-logo"/>
            <button className="menu-page-btn-toggle" onClick={handleMenuClick}>
              <div className="first-line"></div> 
              <div className="second-line"></div>
              <div className="third-line"></div>
            </button>
          </div>
          <div className="flex-w-44-rt">
            <h6>We will</h6>
            <span className="sixth-be-happy">be happy</span>
            <span className="sixth-work-with">to work with you, listen, plan,</span>
            
            <div className="sixth-and-rt">
              <div className="img-part">
                <img src="public/img/and.png" width="100%" />
              </div>
              <span className="sixth-solution">propose<br/>solutions</span>
            </div>
            <div className="text-part">
              <span>ultimately to ensure the very root of your brand is felt by each consumer.</span>
            </div>
          </div>
          <div className="sixth-right-footer">
            <span><img src="public/img/mobile/about/icon-camera.png" />&nbsp;&nbsp;&nbsp;@envisage_studio</span>
            <span><img src="public/img/mobile/about/icon-f.png" />&nbsp;&nbsp;&nbsp;envisagedesign</span>
          </div>
        </div>
      </div>
      <MenuPage moveNavBox={props.moveNavBox} />
      </div>
    )
    }
    
  }
  

