import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./register.module.scss";
import { Customisedbutton } from "../../shared/inputFields";
import { userActions } from "../../state/ducks/user/userAction";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { bindActionCreators } from "redux";
import { createAccountActions } from "../../state/ducks/createAccount/createAccountActions";
import "../../../src/App.css";
// const BlackRadio = withStyles({
//   root: {
//     color: "black",
//     "&$checked": {
//       color: "black",
//     },
//   },
//   checked: {},
// })((props) => <Radio color="default" {...props} />);
const Styles = (theme) => ({
  root: {
    color: "black",
    "&$checked": {
      color: "black",
    },
  },
  checked: {},
  label: {
    fontFamily: "'ProximaNova-Regular', 'Helvetia', 'Arial','sans-serif'",
    fontSize: "16px",
  },
});
class ChoosePlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: "",
      chosenPlan: {},
    };
  }
  Next = async (event) => {
    try {
      event.preventDefault();
      const { actions } = this.props;
      actions.createAccount.createAccountState(
        Object.assign(
          {},
          {
            chosenPlan: this.state.chosenPlan,
          }
        )
      );
      actions.userActions.switchtoGeneral_Info({});
    } catch (expection) {
      console.log(expection);
    }
  };

  handleChange = (event) => {
    let product = this.state.originalData.filter((item) => {
      return item.productId == event.target.value;
    });
    this.setState({
      selectedValue: event.target.value,
      chosenPlan: {
        planid: product[0].productId,
        planName: product[0].productName,
        planPrice: product[0].productPrice,
        duration: product[0].productDuration,
        trail_period:
          product[0].productName == "Annually"
            ? 0
            : product[0].productName == "Monthly"
            ? 0
            : 60,
        priceId: product[0].priceId,
      },
    });
  };
  
  componentWillReceiveProps(nextProps) {
    let item = [];
    let originalData = JSON.parse(JSON.stringify(nextProps.subscriptionPlans));
    var result = nextProps.subscriptionPlans.reduce(function (r, a) {
      r[a.planName] = r[a.planName] || [];
      r[a.planName].push(a);
      return r;
    }, Object.create(null));
    if(result.length > 0){
      Object.entries(result).map(([key, value]) => {
        if (key === "SPECIAL OFFER ALERT!") {
          //Writing this condition to display this item at first and showing star on this item in ui
          item.unshift({
            productId: value[0].productId,
            header: key,
            footer: value[0].productDiscraption,
            price: [
              {
                productId: value[0].productId,
                price: value[0].productPrice,
                duration: value[0].productDuration,
                productName: value[0].productName,
                priceId: value[0].priceId,
              },
            ],
            productName: value[0].productName,
          });
        } else {
          item.push({
            productId: value[0].productId,
            header: key,
            footer: value[0].productDiscraption,
            price: value.map((data) => {
              return {
                productId: data.productId,
                price: data.productPrice,
                duration: data.productDuration,
                productName: data.productName,
                priceId: data.priceId,
              };
            }),
            productName: value[0].productName,
          });
        }
      });
      this.setState({
        item: item,
        originalData: originalData,
        chosenPlan: {
          planid: item[0].productId,
          planName: item[0].productName,
          planPrice: item[0].price[0].price,
          duration: item[0].duration,
          trail_period: 60,
          priceId: item[0].price[0].priceId,
        },
        selectedValue: item[0].productId,
      });
    }
  }
  componentDidMount() {
    const { actions } = this.props;
    actions.createAccount.getSubscriptionPlans({});
  }
  render() {
    const { item, selectedValue, result } = this.state;
    var { classes } = this.props;
    return (
      <section className={styles.main_sec_chse_pln}>
        <p className={styles.loginlink}>
          Already have a subscription? Log in{" "}
          <a href="/sign-in" className={styles.textDecoration}>
            HERE
          </a>
        </p>
        <section className={styles.plan_flex}>
          {item &&
            item.length > 0 &&
            item.map((item, i) => {
              return (
                <React.Fragment key={i}>
                  {i == 0 && <i className={styles.star}></i>}
                  <div className={styles.rectangle} key={i}>
                    <p className={styles.header_css}>{item.header}</p>
                    <content className={styles.content_Css}>
                      <React.Fragment>
                        <RadioGroup
                          onChange={this.handleChange.bind(this)}
                          value={selectedValue.toString()}
                          className={styles.align_Content}
                        >
                          {item.price.map((value, i) => (
                            <FormControlLabel
                              key={i}
                              value={value.productId}
                              control={
                                <Radio
                                  color="default"
                                  className={classes.root}
                                />
                              }
                              label={
                                <React.Fragment>
                                  {value.price == null ? (
                                    <span className={styles.priceSize}>
                                      {value.productName}
                                    </span>
                                  ) : (
                                    <React.Fragment>
                                      <span className={styles.priceSize}>
                                        ${value.price}
                                      </span>{" "}
                                      {`    /`}
                                      <span>
                                        {value.duration == "1 month" ? (
                                          <span className={styles.durationFont}>
                                            month
                                          </span>
                                        ) : (
                                          <React.Fragment>
                                            <span
                                              className={styles.durationFont}
                                            >
                                              annual
                                            </span>{" "}
                                            <span
                                              className={styles.durationFont}
                                            >
                                              1 month free!
                                            </span>
                                          </React.Fragment>
                                        )}
                                      </span>
                                    </React.Fragment>
                                  )}
                                </React.Fragment>
                              }
                            />
                          ))}
                        </RadioGroup>
                      </React.Fragment>
                    </content>
                    <hr className={styles.hrCss} />
                    <footer className={styles.footer_css}>{item.footer}</footer>
                  </div>
                </React.Fragment>
              );
            })}
        </section>
        <p className={styles.description}>
          Disclaimer: The subscription can be cancelled at anytime and is billed
          on a monthly basis, unless the annual option has been selected.
        </p>
        <div className={styles.each_label_sec_button}>
          <Customisedbutton
            name="Next"
            className={"commonButtonClass"}
            //className={styles.custom_button}
            onClick={this.Next.bind(this)}
          />
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    subscriptionPlans: state.createAccountAjaxCallsReducer.subscriptionPlans,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      createAccount: bindActionCreators(createAccountActions, dispatch),
      userActions: bindActionCreators(userActions, dispatch),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(Styles)(ChoosePlan));
