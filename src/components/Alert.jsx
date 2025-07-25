import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
    this.bgColor = null;
  } 
  
  getStyle = () => {
    return {
      color: this.color,
      backgroundColor: this.bgColor,
      borderWidth: "2px",
      borderStyle: "solid",
      fontWeight: "bolder",
      borderRadius: "7px",
      borderColor: this.color,
      textAlign: "center",
      fontSize: "12px",
      margin: "10px 0",
      padding: "10px"
    };
  }

  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{ this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
      super(props);
      this.color = 'rgb(0, 0, 255)';
      this.bgColor = 'rgb(220, 220, 255)';
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
      super(props);
      this.color = 'rgba(251, 5, 5, 1)';
      this.bgColor = 'rgba(255, 221, 220, 1)';
  }
}

class WarningAlert extends Alert {
  constructor(props) {
      super(props);
      this.color = 'rgba(233, 237, 9, 1)';
      this.bgColor = 'rgba(250, 252, 169, 1)';
  }
}
export { Alert, InfoAlert, ErrorAlert, WarningAlert };

Alert.propTypes = {
  text: PropTypes.string.isRequired,
};