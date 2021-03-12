import React,{ useState,Component,useEffect,useRef } from "react";
import {
  Customisedbutton,
  CustomisedTextfield,
  PasswordTextfield,
} from "../../shared/inputFields";
import logo from "../../assets/images/jackalope_logo.jpg";
import styles from "./login.module.scss";
import { Link } from "react-router-dom";
import {
  displayForValidationErrors,
  resetFormValidations,
  updateFormValidations,
} from "../../shared/components/commonValidations";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createAccountActions } from "../../state/ducks/createAccount/createAccountActions";
import UserHelper from "../../components/shared/UserHelper.js";
import ErrorDiv from "../../components/shared/ErrorDiv.js";
import NinjaProgressSpinnerSmall from "../../components/shared/NinjaProgressSpinnerSmall.js";
import styles1 from "../../shared/components/sharedcss.module.scss";
import "../../../src/App.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormattedMessage, injectIntl } from "react-intl";
// import * as auth from "../_redux/authRedux";
import { login } from "../../app/modules/Auth/_redux/authCrud";
import "../../_metronic/_assets/sass/pages/login/classic/login-1.scss";
import { toAbsoluteUrl } from "../../_metronic/_helpers";
import { size } from "lodash";



// class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       userInfo: {
//         username: "",
//         password: "",
//       },
//       showError: false,
//       errorMessage: "",
//     };
//   }
//   loginValidator = {
//     username: {
//       rules: [
//         {
//           test: (value) => {
//             return value.length > 0;
//           },
//           message: "Please enter the email or username",
//         },
//       ],
//       errors: [],
//       valid: false,
//       state: "",
//     },
//     password: {
//       rules: [
//         {
//           test: (value) => {
//             return value.length > 0;
//           },
//           message: "Please enter the password",
//         },
//       ],
//       errors: [],
//       valid: false,
//       state: "",
//     },
//   };
//   componentDidMount() {
//     resetFormValidations(this.loginValidator);
//   }
//   loginInProgress(inProgress, errorMessage) {
//     if (inProgress) {
//       this.setState({ display: "none" });
//       this.refs.NinjaProgressSpinnerSmall.setState({ display: "block" });
//       this.disableButtons();
//     } else {
//       this.refs.NinjaProgressSpinnerSmall.setState({ display: "none" });
//       this.setState({ display: "block" });
//       // this.enableButtons();
//     }

//     if (errorMessage) {
//       this.setState({ showError: true, errorMessage: errorMessage });
//       // this.refs.errorDiv.showError(errorMessage);
//     }
//   }
//   submit = () => {
//     this.state.isLoginClicked = true;
//     let validFileds = [];
//     Object.keys(this.state.userInfo).forEach((item) => {
//       let isvalid = updateFormValidations(
//         item,
//         this.state.userInfo[item],
//         this.loginValidator
//       );
//       if (!isvalid) validFileds.push(isvalid);
//       this.setState((state) => {
//         this.state.userInfo[item] = this.state.userInfo[item];
//         return state;
//       });
//     });
//     if (validFileds.length <= 0) {
//       const { userInfo } = this.state;
//       let userName = userInfo.username;
//       let password = userInfo.password;
//       this.refs.userHelper.loginUser(userName, password);
//       // this.props.history.push("/sign-up");
//     }
//   };
//   customStyle = {
//     position: "relative",
//     left: "0px",
//   };
//   updateInputValue = (name, event) => {
//     const value = event.target.value;
//     this.setState((state) => {
//       this.state.userInfo[name] = value;
//       return state;
//     });
//   };
//   render() {

  const initialValues = {
    email: "admin@demo.com",
    password: "demo",
  };
function Login(props) {
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({username: "", password: ""});
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const textInputRef = useRef(null);

   const loginValidator = {
          username: {
            rules: [
              {
                test: (value) => {
                  return value.length > 0;
                },
                message: "Please enter the email or username",
              },
            ],
            errors: [],
            valid: false,
            state: "",
          },
          password: {
            rules: [
              {
                test: (value) => {
                  return value.length > 0;
                },
                message: "Please enter the password",
              },
            ],
            errors: [],
            valid: false,
            state: "",
          },
    };
    
    useEffect(() => {
      resetFormValidations(loginValidator);
    }, [])
  
    const submit = () => {
          debugger;
          window.open('/homepage');
          // // this.state.isLoginClicked = true;
          // let validFileds = [];
          // Object.keys(userInfo).forEach((item) => {
          //   let isvalid = updateFormValidations(
          //     item,
          //     userInfo[item],
          //     loginValidator
          //   );
          //   if (!isvalid) validFileds.push(isvalid);
          //   setUserInfo((state) => {
          //     userInfo[item] = userInfo[item];
          //     return state;
          //   });
          // });
          // if (validFileds.length <= 0) {
          //   let userName = userInfo.username;
          //   let password = userInfo.password;
          //   debugger;
          //   textInputRef.loginUser(userName, password);
          // }
    };
    

    const customStyle = {
          position: "relative",
          left: "0px",
        };
    const updateInputValue = (name, event) => {
          const value = event.target.value;
          setUserInfo((state) => {
            userInfo[name] = value;
            return state;
          });
    };

    const onChangeHandler = (name, event) => {
      const value = event.target.value;
      setUserInfo((state) => {
        userInfo[name] = value;
        return state;
      });
    }

  
    const formik = useFormik({
      initialValues
    });


    const mystyle={
      background: 'linear-gradient(135deg, #8426b0 3%, #bd0283 47%, #ec4b3c 98%)'
    }
    const buttonStyle = {
      background: 'linear-gradient(135deg, #8426b0 3%, #bd0283 47%, #ec4b3c 98%)',
      margin: '-36px'
    }

    return (
      <>
      <UserHelper ref={textInputRef}/>
      <div className="d-flex flex-column flex-root" style={{padding: '40px',alignContent: 'center',marginTop: '148px'}}>
        {/*begin::Login*/}
        <div
          className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid bg-white"
          id="kt_login"
        >
          {/*begin::Aside*/}
          <div
            className="login-aside d-flex flex-row-auto bgi-size-cover bgi-no-repeat p-10 p-lg-10"
            style={mystyle}
          >
            {/*begin: Aside Container*/}
            <div className="d-flex flex-row-fluid flex-column justify-content-between">
              {/* start:: Aside header */}
              {/* <Link to="/" className="flex-column-auto mt-5 pb-lg-0 pb-10">
                <img
                  alt="Logo"
                  className="max-h-70px"
                  src={toAbsoluteUrl("/media/logos/jlop.png")}
                />
              </Link> */}
              {/* end:: Aside header */}

              {/* start:: Aside content */}
              <div className="flex-column-fluid d-flex flex-column justify-content-center">
              {/*custom size font-size-h1 */}
                <h3 className="mb-5 text-white" style={{fontSize: "50px"}}>
                  Welcome to Jackalope!
                </h3>
                <p className="font-weight-lighter text-white opacity-80">
                  The best Insurance carrier providers in your area.
                </p>
              </div>
              {/* end:: Aside content */}

              {/* start:: Aside footer for desktop */}
              {/* end:: Aside footer for desktop */}
            </div>
            {/*end: Aside Container*/}
          </div>
          {/*begin::Aside*/}
          
        
               
          
          {/*begin::Content*/}
          <div className="login-form login-signin" id="kt_login_signin_form" style={{padding: '90px'}}>
          {/* begin::Head */}
          <Link to="/" className="mt-5" style={{marginLeft : "150px"}}>
                <img
                  alt="Logo"
                  className="max-h-70px"
                  src={toAbsoluteUrl("/media/logos/jlop.png")}
                />
              </Link>
          <div className="text-center mb-10 mb-lg-20">
            <h3 className="font-size-h1">
              Log in
            </h3>
          </div>
          {/* end::Head */}

          {/*begin::Form*/}
        
          <form
            onSubmit={submit}
            className="form fv-plugins-bootstrap fv-plugins-framework"
          >
            
            <div className="form-group fv-plugins-icon-container">
              <input
                placeholder="Email"
                type="email"
                className={`form-control form-control-solid h-auto py-5 px-6`}
                name="email"
                {...formik.getFieldProps("email")}
                style={{width: '200%'}}
              />
              <div>
                {displayForValidationErrors(
                "username",
                loginValidator,
                customStyle
              )}
            </div>
            </div>
            <div className="form-group fv-plugins-icon-container">
              <input
                placeholder="Password"
                type="password"
                className={`form-control form-control-solid h-auto py-5 px-6`}
                name="password"
                {...formik.getFieldProps("password")}
                style={{width: '200%'}}
              />
              <span id="error" className="hide">invalid email</span>
              <div>
               {displayForValidationErrors(
                  "password",
                  loginValidator,
                  customStyle
                )}
              </div>
              {showError && (
                <div className={styles1.error_message}>
                  <div>* {errorMessage}</div>
                </div>
              )}
            </div>
            <span className="font-weight-bold text-dark-50">
                Don't have an account yet?
                <Link
                to="/auth/registration"
                className="font-weight-bold ml-2"
                id="kt_login_signup"
              >
                Sign Up!
              </Link>
            </span>
            <div className="form-group d-flex flex-wrap justify-content-between align-items-center" >
              <Link
                to="/auth/forgot-password"
                className="text-dark-50 text-hover-primary my-3 mr-2"
                id="kt_login_forgot"
              >
                {/* <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" /> */}
              </Link>
              <button
                id="kt_login_signin_submit"
                type="submit"
                disabled={formik.isSubmitting}
                className="btn btn-primary font-weight-bold px-9 py-4 my-3  border border-left-0 " style={{bordercolor : "none"}}
                style={buttonStyle}
              >
                <span>Sign In</span>
                {loading && <span className="ml-3 spinner spinner-white"></span>}
              </button>
            </div>
          </form>
          {/*end::Form*/}
        
            {/*end::Content header*/}

            {/* begin::Content body */}
            <div className="d-flex flex-column-fluid flex-center mt-30 mt-lg-0">
              {/* <Switch>
                <ContentRoute path="/auth/login" component={Login} />
                <ContentRoute
                  path="/auth/registration"
                  component={Registration}
                />
                <ContentRoute
                  path="/auth/forgot-password"
                  component={ForgotPassword}
                />
                <Redirect from="/auth" exact={true} to="/auth/login" />
                <Redirect to="/auth/login" />
              </Switch> */}
            </div>
            {/*end::Content body*/}

            {/* begin::Mobile footer */}
            <div className="d-flex d-lg-none flex-column-auto flex-column flex-sm-row justify-content-between align-items-center mt-5 p-5">
              <div className="text-dark-50 font-weight-bold order-2 order-sm-1 my-2">
                &copy; 2020 Metronic
              </div>
              <div className="d-flex order-1 order-sm-2 my-2">
                <Link to="/terms" className="text-dark-75 text-hover-primary">
                  Privacy
                </Link>
                <Link
                  to="/terms"
                  className="text-dark-75 text-hover-primary ml-4"
                >
                  Legal
                </Link>
                <Link
                  to="/terms"
                  className="text-dark-75 text-hover-primary ml-4"
                >
                  Contact
                </Link>
              </div>
            </div>
            {/* end::Mobile footer */}
          </div>
          {/*end::Content*/}
        </div>
        {/*end::Login*/}
      </div>
    </>
      // <section className={styles.main_sec_1}>
      //   <UserHelper ref="userHelper" parentComponent={this} />
      //   <ErrorDiv ref="errorDiv" clssName="no-padding" />
      //   <NinjaProgressSpinnerSmall
      //     ref="NinjaProgressSpinnerSmall"
      //     maxWidth="150px"
      //     maxHeight="150px"
      //     marginTop="0px"
      //     display="none"
      //     divHeight="250px"
      //   />

      //   <img src={logo} />
      //   <section className={styles.main_section}>
      //     <div className={styles.each_label_sec}>
      //       <p className={styles.login_label}>Username*</p>
      //       <CustomisedTextfield
      //         className={styles.text_field}
      //         //placeholder="Username or Email"
      //         type="text"
      //         value={this.state.userInfo.username}
      //         error={
      //           this.state.isLoginClicked &&
      //           this.loginValidator["username"].errors.length > 0
      //         }
      //         onChange={this.updateInputValue.bind(this, "username")}
      //       />
      //       <div>
      //         {displayForValidationErrors(
      //           "username",
      //           this.loginValidator,
      //           this.customStyle
      //         )}
      //       </div>
      //     </div>
      //     <div className={styles.each_label_sec}>
      //       <p className={styles.login_label}>Password*</p>
      //       <PasswordTextfield
      //         className={styles.text_field}
      //         //placeholder="Password"
      //         type="password"
      //         value={this.state.userInfo.password}
      //         onChange={this.updateInputValue.bind(this, "password")}
      //         error={
      //           this.state.isLoginClicked &&
      //           this.loginValidator["password"].errors.length > 0
      //         }
      //       />
      //       <div>
      //         {displayForValidationErrors(
      //           "password",
      //           this.loginValidator,
      //           this.customStyle
      //         )}
      //       </div>
      //       {this.state.showError && (
      //         <div className={styles1.error_message}>
      //           <div>* {this.state.errorMessage}</div>
      //         </div>
      //       )}
      //       <p className={styles.href_forgot}>
      //         <Link to="/reset-password">
      //           <span>Forgot your password?</span>
      //         </Link>
      //       </p>
      //     </div>
      //     <div className={styles.each_label_sec_button}>
      //       <Customisedbutton
      //         name="Login"
      //         //className={styles.login_button}
      //         className={["commonButtonClass", styles.login_button].join(" ")}
      //         onClick={this.submit.bind(this)}
      //       />
      //     </div>
      //     <div className={styles.each_label_sec}>
      //       <p>
      //         Don't have an account?
      //         <Link to="/sign-up">
      //           <span className={styles.register_link}>Sign up here!</span>
      //         </Link>
      //       </p>
      //       <Link to="/contact-us">
      //         <span className={styles.contact_us}>Contact Us</span>
      //       </Link>
      //     </div>
      //   </section>
      // </section>
    );
  // }
}
const mapStateToProps = (state) => {
  return {
    // createAccountObject: state.createAccountReducer
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      createAccount: bindActionCreators(createAccountActions, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
