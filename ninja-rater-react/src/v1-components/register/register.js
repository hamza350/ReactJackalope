import React, { Component } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardContent,
  Typography,
  withStyles,
} from "@material-ui/core";
import styles from "./register.module.scss";
import colors from "../../styles/themesColor.module.scss";
import { default as ChoosePlan } from "./choosePlan";
import { default as Payment } from "./payment";
import { default as GeneralInformation } from "./generalInformation";
import { connect } from "react-redux";
import { userActions } from "../../state/ducks/user/userAction";

const custom = (theme) => ({
  appBar: {
    width: "60%",
    margin: "auto",
    flexGrow: 1,
    backgroundColor: colors.white,
    boxShadow: "none",
    zIndex: 0,
  },
  tabs: {
    border: "1px solid",
  },
  tab: {
    color: colors.black,
    // fontFamily: fonts.montserratregular,
    fontFamily: "'ProximaNova-Regular', 'Helvetia', 'Arial','sans-serif'",
  },
  tabLabel: {
    border: "3px solid",
  },
});


class Register extends Component {
  componentDidMount() {
    this.props.dispatch(userActions.switchtoChoosePlan({}));
  }
  render() {
    const { tabs, classes } = this.props;
    let { style, tabLabels } = tabs;
    let tabSelected = 2;

    return (
      <React.Fragment>
        <section className={styles.main_sec}>
          <p className={styles.plan_txt}>
            {(() => {
              switch (tabSelected) {
                case 0:
                  return "Subscribe to Jackalope";
                case 1:
                  return "General Information";
                case 2:
                  return "Payment";
              }
            })()}
          </p>
          <Tabs
            TabIndicatorProps={{ style: { background: "none" } }}
            value={0}
            //className={[styles.tab, classes.tabWidth].join(" ")}
            className={styles.tab}
            onChange={this.handleChange}
            variant="scrollable"
            scrollButtons="off"
          >
            {tabLabels.map(function (item, i) {
              return (
                <Tab
                  className={
                    item.id === tabSelected
                      ? styles.tab_selected
                      : styles.tab_disabled
                  }
                  // className={[
                  //   item.id === tabSelected
                  //     ? styles.tab_selected
                  //     : styles.tab_disabled,
                  //   styles.tab,
                  // ].join(" ")}
                  key={i}
                  label={
                    <Typography className={styles.tab_labels}>
                      {item.label}
                    </Typography>
                  }
                  style={{
                    borderRadius: "6px",
                    border: "1px solid black",
                    width: "auto",
                    opacity: !(item.id === tabSelected) ? "0.7" : "1",
                    minWidth: "20vw",
                    background: !(item.id === tabSelected)
                      ? "white"
                      : "-webkit-linear-gradient(135deg,#8426b0 3%,#bd0283 47%,#ec4b3c 98%)",
                    color: !(item.id === tabSelected) ? "white" : "white",
                  }}
                  disabled={!(item.id === tabSelected)}
                />
              );
            })}
          </Tabs>
          {tabSelected === 0 && <ChoosePlan />}
          {tabSelected === 1 && <GeneralInformation />}
          {tabSelected === 2 && <Payment />}
        </section>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    tabs: state.registerationTabUtilitesReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {},
    dispatch: dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(custom)(Register));
