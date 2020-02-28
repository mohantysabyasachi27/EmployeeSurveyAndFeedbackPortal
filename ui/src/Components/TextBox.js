import React from 'react';
import PropTypes from 'prop-types';
import './message.css';
import {TextField, Input} from '@material-ui/core';

const TextBox = ({handleSubmit}) => {
  return (
    <div class="send-container">
      <form id="send">
        <Input className="send-input" placeholder="Type Something..." />
        <input
          type="submit"
          class="send-btn"
          value="Send"
          onClick="handleSubmit"
        />
      </form>
    </div>
  );
};
TextBox.propTypes = {};
export default TextBox;
