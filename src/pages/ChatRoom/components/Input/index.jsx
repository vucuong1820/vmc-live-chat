import React from "react";
import PropTypes from "prop-types";
import "./Input.scss";
import { Input } from "antd";
import { SmileFilled, PictureFilled } from "@ant-design/icons";
import "./Input.scss"

InputBox.propTypes = {};

function InputBox(props) {
  return (
    <div className="input-box">
      <PictureFilled className="input-box__icon" />
      <SmileFilled className="input-box__icon" style={{marginRight: '8px'}} />
      <Input className="input-box__data" />
      <span className="input-box__send">
        <i className="fi fi-ss-paper-plane"></i>
      </span>
    </div>
  );
}

export default InputBox;
