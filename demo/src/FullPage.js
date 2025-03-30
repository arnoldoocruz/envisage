import React from "react";

import ReactPageScroller from "../../../src";
import FirstComponent from "./FirstComponent";
import SecondComponent from "./SecondComponent";
import ThirdComponent from "./ThirdComponent";
import FourthComponent from "./FourthComponent";
import FifthComponent from "./FifthComponent";
import SixthComponent from "./SixthComponent"

import "./index.css";

export default class FullPage extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    console.log('fdksafjkdslafjkdslafj');
    return (
      <React.Fragment>
        <ReactPageScroller>
          <FirstComponent />
          <SecondComponent />
          <ThirdComponent />
          <FourthComponent />
          <FifthComponent />
          <SixthComponent />
        </ReactPageScroller>
      </React.Fragment>
    );
  }
}
