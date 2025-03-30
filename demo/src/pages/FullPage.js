import React from "react";

import ReactPageScroller from "../../../src";
import FirstComponent from "./FirstComponent";
import SecondComponent from "./SecondComponent";
import ThirdComponent from "./ThirdComponent";
import FourthComponent from "./FourthComponent";
import FifthComponent from "./FifthComponent";
import SixthComponent from "./SixthComponent"

export default class FullPage extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <React.Fragment>
        <ReactPageScroller moveNavBox={this.props.moveNavBox} >
          <FirstComponent moveNavBox={this.props.moveNavBox} />
          <SecondComponent moveNavBox={this.props.moveNavBox} />
          <ThirdComponent moveNavBox={this.props.moveNavBox} />
          <FourthComponent moveNavBox={this.props.moveNavBox} />
          <FifthComponent moveNavBox={this.props.moveNavBox} />
          <SixthComponent moveNavBox={this.props.moveNavBox} />
        </ReactPageScroller>
      </React.Fragment>
    );
  }
}
