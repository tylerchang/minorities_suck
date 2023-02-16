import React from "react";
import './Popup.css';
import {View} from 'react-native';
 
const Popup = props => {
  return (
    <div className="popup-box">
      <div className="box">
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
      </View>
      </div>
    </div>
  );
};
 
export default Popup;