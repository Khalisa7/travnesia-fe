import React, { Component } from "react";
import "./style/sMobileFooter.css";
import AppStoreImage from "./img/app-store.svg";
import PlayStoreImage from "./img/play-store.svg";
import Phone24Hours from "./img/24hours.svg";

class MFooter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ marginBottom: 30 + "px" }} />
      // <footer className='mobile-footer'>
      // 		<div className='container'>
      // 			<div className='text-center'>
      // 				<h5 className="mb-0">We make simple.</h5>
      // 				<p>Download our apps now!</p>
      // 				<div className='mobile-store-image justify-content-center' style={{marginTop: 20}}>
      // 					<a href='#'><img src={AppStoreImage} style={{marginRight:20}}/></a>
      // 					<a href='#'><img src={PlayStoreImage}/></a>
      // 				</div>
      //                 <div className="row">
      //                     <div className="col-12">
      //                         <a href='#'><i className='fa fa-facebook-square'/></a>
      //                         <a href='#'><i className='fa fa-instagram'/></a>
      //                         <a href='#'><i className='fa fa-twitter-square'/></a>
      //                         <a href='mailto:hendy@terascode.com'><i className='fa fa-envelope'/></a>
      //                     </div>
      // 				</div>
      //                 <div className="row pb-4 justify-content-center">
      //                     <p className="text-white">&copy; Tripdize</p>
      //                 </div>
      // 			</div>
      // 		</div>
      // </footer>
    );
  }
}

export default MFooter;
