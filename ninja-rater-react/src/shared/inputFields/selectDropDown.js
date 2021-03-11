import React, { Component } from "react";
import { OutlinedInput, Select } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

const components = {
  Placeholder,
};

class SelectDropDown extends Component {
  constructor(props) {
    super(props);
  }
  styles = (theme) => ({
    notchedOutline: {
      border: "1px solid !important",
      borderWidth: "1px",
      paddingLeft: "0px !important",
      width: "100%",
    },
    selectEmpty: {
      border: "none !important",
      borderRadius: "6px",
      margin: this.props.margin || "auto",
      height: this.props.height || "53px",
      fontSize: 16,
      padding: 0,
      fontFamily: "'ProximaNova-Regular', 'Helvetia', 'Arial','sans-serif'",
      fontWeight: 550,
      width: this.props.width || "100%",
      boxShadow: "0 !important",
      "&:hover": {
        border: "0 !important",
      },
    },
    cssFocused: {
      "&:focus": {
        background: "none",
        borderColor: "none !Important",
      },
    },
    focused: {
      borderColor: "none",
    },
    error_notched: {
      borderWidth: "1px !important",
    },
  });

  content = (props) => {
    let { classes, onChange, value, error } = props;
    return (
      <Select
        displayEmpty
        className={`${classes.selectEmpty} ${props.class}`}
        value={value}
        onChange={onChange}
        placeholder="Choose Security Question"
        components={components}
        MenuProps={{
          PaperProps: {
            style: {
              padding: 0,
            },
          },
          getContentAnchorEl: null,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
        }}
        input={
          <OutlinedInput
            error={error}
            name="name"
            id="outlined-age-simple"
            labelWidth={0}
            classes={{
              notchedOutline: this.props.error
                ? classes.error_notched
                : classes.notchedOutline,
            }}
          />
        }
        inputProps={{
          classes: {
            select: classes.cssFocused,
          },
        }}
        IconComponent={(props) => {
          return (
            <i
              {...props}
              className={`material-icons-outlined ${props.className}`}
              style={{
                borderRadius: "3px",
                width: "8%",
                height: "98%",
                padding: "10px 4px",
                background: "#e8e8e8",
                top: "calc(50% - 25px)",
                border: "1px solid",
                right: "0x",
                color: "black",
              }}
            >
              arrow_drop_down
            </i>
          );
        }}
      >
        {props.children}
      </Select>
    );
  };

  Styled = withStyles(this.styles)(this.content);

  render() {
    return <this.Styled {...this.props}>{this.props.children}</this.Styled>;
  }
}

export default SelectDropDown;
