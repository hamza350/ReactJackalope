import PropTypes from "prop-types";
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import themes from "../../styles/themesColor.module.scss";

const styles = (theme) => ({
  root: {
    fontFamily: '"ProximaNova-Regular", "Helvetia", "Arial","sans-serif"',
    fontSize: 17,
    width: 370,
  },
  notchedOutline: {
    borderColor: "rgb(47 46 46 / 96%)",
    borderRadius: 10,
    borderWidth: 1,
  },
  input1: {
    borderStyle: "none !important",
    height: 36,
    fontSize: 12,
    padding: 5,
    fontFamily: '"ProximaNova-Regular", "Helvetia", "Arial","sans-serif"',
    fontWeight: 550,
    margin: "0px !important",
    borderRadius: "10px !important",
  },
  focused: {
    "& $notchedOutline": {
      borderColor: themes.black,
      outline: "none",
    },
  },
  cssFocused: {},
  cssHover: {},
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: themes.black,
      outline: "none",
    },
  },
});

const test = () => {
}

class CustomisedTextfield extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      classes,
      addCustomStyle,
      onChange,
      disabled,
      value,
      className,
      multiline,
      error,
      _handleKeyDown,
    } = this.props;
    return (
      <>
      {test()}
      <TextField
        className={[classes.root, className].join(" ")}
        error={error}
        placeholder={this.props.placeholder}
        variant="outlined"
        type={this.props.type}
        onChange={onChange}
        onKeyDown={_handleKeyDown}
        value={value}
        InputProps={{
          classes: {
            root: classes.cssOutlinedInput,
            input: classes.input1,
            focused: classes.cssFocused,
            notchedOutline: classes.notchedOutline,
          },
        }}
        disabled={false || disabled}
        multiline={multiline || false}
        rows={2}
        rowsMax={4}
      />
      </>
    );
  }
}
CustomisedTextfield.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomisedTextfield);
