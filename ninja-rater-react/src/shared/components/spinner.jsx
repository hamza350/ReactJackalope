import React, {Component} from "react";
import Modal from "./modal";
import PropTypes from "prop-types";
import cssStyles from "./sharedcss.module.scss";
export class SpinnerComponent extends Component {
  constructor (props) {
    super(props);
    this.state = {
      show: this.props.hasOwnProperty("show") ? this.props.show : false,
    };
  }

  render() {
    const {loadingImage, name, show} = this.props;
    const modal = show ? (
      <Modal>
        <div className={cssStyles.modal}>
          <div className={cssStyles.spinner}>
            <div className={cssStyles.position}>
              {<img src="assets/ninja/layout/images/spinners/pink_spinner.gif" alt="loader" />}{" "}
              {/* <div className={cssStyles.pinkLoader}></div> */}
            </div>
          </div>
        </div>
      </Modal>
    ) : null;
    return modal;
  }
}
SpinnerComponent.propTypes = {
  show: PropTypes.bool.isRequired,
};
