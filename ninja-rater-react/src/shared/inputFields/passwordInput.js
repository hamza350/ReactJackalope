import PropTypes from "prop-types";
import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import themes from "../../styles/themesColor.module.scss";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
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
  },
  focused: {
    "& $notchedOutline": {
      borderColor: themes.black,
      outline: "none",
    },
  },
  fieldset: {
    focused: {
      "& $notchedOutline": {
        borderColor: `${themes.grey}`,
      },
    },
  },
  cssFocused: {},
  cssHover: {},
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: themes.black,
    },
  },
});
class PasswordTextfield extends Component {
  constructor (props) {
    super(props);
    this.state = {
      passwordIsMasked: false,
    };
  }

  togglePasswordMask = () => {
    this.setState((prevState) => ({
      passwordIsMasked: !prevState.passwordIsMasked,
    }));
  };
  render() {
    const {classes, onChange, className, error, _handleKeyDown} = this.props;
    const {passwordIsMasked} = this.state;
    return (
      <TextField
        onKeyDown={_handleKeyDown}
        className={[classes.root, className].join(" ")}
        error={error}
        placeholder={this.props.placeholder}
        variant="outlined"
        type={passwordIsMasked ? "text" : "password"}
        onChange={onChange}
        InputProps={{
          classes: {
            root: classes.cssOutlinedInput,
            input: classes.input1,
            focused: classes.cssFocused,
            notchedOutline: classes.notchedOutline,
          },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                style={{
                  padding: "12px 0px",
                  marginRight: "-6px",
                }}
                aria-label="Toggle password visibility"
                onClick={this.togglePasswordMask}
              >
                {this.state.passwordIsMasked ? (
                  <Visibility />
                ) : (
                    <VisibilityOff />
                  )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  }
}
PasswordTextfield.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PasswordTextfield);
