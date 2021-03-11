import PropTypes from "prop-types";
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import themes from "../../styles/themesColor.module.scss";
const styles = {
  root: {
    background: "none",
    border: 0,
    borderRadius: 4,
    color: themes.black,
    textTransform: "none",
    margin: "auto",
    "&:hover": {
      textDecoration: "none",
      backgroundColor: "none",
    },
    fontWeight: "600",
    // fontFamily: "ProximaNova-Regular",
    fontFamily: '"ProximaNova-Regular", "Helvetia", "Arial","sans-serif"',
  },
};

class Customisedbutton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, onClick, className } = this.props;
    return (
      <Button
        id={"button"}
        className={[classes.root, className].join(" ")}
        onKeyDown={this._handleKeyDown}
        onClick={onClick}
      >
        {this.props.name}
      </Button>
    );
  }
}

Customisedbutton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Customisedbutton);
