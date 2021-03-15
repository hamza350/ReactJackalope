import React, {Component} from "react";
import LoginPage from "./v1-components/login";
import CreateAccountPage from "./v1-components/register";
import SignedUp from "./v1-components/register/signedUp";
import ReferFriend from "./v1-components/referFriend"
import Layout from "./v1-components/layout/layout";
import {grid3} from "./test/grid3";
import {TestMessages} from "./test/TestMessages";
import TestMarker from "./test/TestMarker";
import PodCasts from "./pages/PodCasts";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ResetPasswordLink from "./pages/ResetPasswordLink";
import ReferFriendLink from "./pages/ReferAFriendLink";
import NotFoundPage from "./pages/NotFoundPage";
import NinjaRaterApp from "./NinjaRaterApp";
import AdminIndex from "./admin_index";
import SwitchApp from "./SwitchApp";
import { DashboardPage } from "./app/pages/DashboardPage";
import { LayoutSplashScreen, ContentRoute } from "./_metronic/layout";
//import {BrowserRouter, Router, Route, Switch} from 'react-router-dom'
import {Link, Switch, Route, Router} from "react-router-dom";
import * as Constants from "./Constants";
// import createHistory from "history/createBrowserHistory";
import {createBrowserHistory} from "history";
import AddUser from "./v1-components/Add-User/addUser"
// const history = createHistory();
const history = createBrowserHistory();
class NinjaRaterPublic extends Component {
  constructor (props) {
    super(props);
    this.routerRef = React.createRef();
  }
  componentDidMount() {
    //temporary workaround to break out of frame
    //www.ninjarater.com has a frame for www.workcompninja.com so after successful login, break out of frame from www.ninjarater.com
    window.top.location.replace(window.location);
  }
  render() {
    return (
      // <Router ref={this.routerRef} history={createHistory}>
      <Router ref={this.routerRef} history={history}>
        <Switch>
          {/* <Route path={Constants.ACTION_HOME.url} component={NinjaRaterApp} exact={true} /> */}
          <Route
            path={Constants.ACTION_HOME.url}
            exact
            render={() => <NinjaRaterApp router={this.routerRef} />}
          />

          <Route
            path="/admin-login"
            exact
            render={() => <AdminIndex router={this.routerRef} />}
          />
          
          
          <ContentRoute 
            path="/dashboard" 
            component={DashboardPage}
          />

          <Route
            path={Constants.ACTION_OTHER_DOMAIN.url}
            exact
            component={SwitchApp}
          />
          <Route
            path={Constants.ACTION_OTHER_DOMAIN_CONTACT_US.url}
            exact
            component={() => {
              window.location.href = "https://myjackalope.com/contact-us/";
              return null;
            }}
          />
          <Route
            path={Constants.ACTION_OTHER_DOMAIN_ABOUT.url}
            exact
            component={() => {
              window.location.href = "https://myjackalope.com/about/";
              return null;
            }}
          />
          <Route
            path={Constants.ACTION_OTHER_DOMAIN_FAQ.url}
            exact
            component={() => {
              window.location.href = "http://myjackalope.com/jackalope-faq/";
              return null;
            }}
          />
          <Route
            path={Constants.ACTION_SIGN_IN.url}
            exact
            render={() => (
              <Layout router={this.routerRef}>
                <LoginPage></LoginPage>
              </Layout>
            )}
          />
          <Route
            path={Constants.ACTION_CREATE_ACCOUNT.url}
            render={() => (
              <Layout router={this.routerRef}>
                <CreateAccountPage></CreateAccountPage>
              </Layout>
            )}
          />
          <Route
            path={Constants.ACTION_RESET_PASSWORD.url}
            render={() => (
              <Layout router={this.routerRef}>
                <ResetPasswordPage></ResetPasswordPage>
              </Layout>
            )}
          />
          <Route
            path={Constants.ACTION_RESET_PASSWORD_LINK.url}
            render={() => (
              <Layout router={this.routerRef}>
                <ResetPasswordLink></ResetPasswordLink>{" "}
              </Layout>
            )}
          />
          <Route
            path={Constants.ACTION_REFER_FRIEND_LINK.url}
            render={() => (
              <Layout router={this.routerRef}>
                <ReferFriendLink></ReferFriendLink>{" "}
              </Layout>
            )}
          />
          {/* <Route
            path={Constants.ACTION_RESET_PASSWORD_LINK.url}
            render={() => <ResetPasswordLink router={this.routerRef} />}
          /> */}
          <Route
            path={Constants.ACTION_RATES.url}
            render={() => <NinjaRaterApp router={this.routerRef} />}
          />
          <Route
            path={Constants.ACTION_HOME_PAGE.url}
            render={() => <SwitchApp router={this.routerRef} />}
          // render={() => <Layout><NinjaRaterApp router={this.routerRef} /></Layout>}
          />
          <Route
            path={Constants.ACTION_SEARCH.url}
            render={() => <NinjaRaterApp router={this.routerRef} />}
          />
          <Route
            path={Constants.ACTION_MARKET_SEARCH.url}
            render={() => <NinjaRaterApp router={this.routerRef} />}
          />
          <Route
            path={Constants.ACTION_EXMOD_SEARCH.url}
            render={() => <NinjaRaterApp router={this.routerRef} />}
          />
          <Route
            path={Constants.ACTION_WCIRB.url}
            render={() => <NinjaRaterApp router={this.routerRef} />}
          />
          <Route
            path={Constants.ACTION_MY_SALES_LEADS.url}
            render={() => <NinjaRaterApp router={this.routerRef} />}
          />
          <Route
            path={Constants.ACTION_BUY_SALES_LEADS.url}
            render={() => <NinjaRaterApp router={this.routerRef} />}
          />
          <Route
            path={Constants.ACTION_MY_ACCOUNT.url}
            render={() => <NinjaRaterApp router={this.routerRef} />}
          />
          <Route
            path={Constants.ACTION_UPDATE_CREDIT_CARD.url}
            render={() => <NinjaRaterApp router={this.routerRef} />}
          />
          <Route
            path={Constants.ACTION_CANCEL_SUBSCRIPTION.url}
            render={() => <NinjaRaterApp router={this.routerRef} />}
          />
          <Route
            path={Constants.ACTION_CHANGE_PASSWORD.url}
            render={() => <NinjaRaterApp router={this.routerRef} />}
          />
          <Route
            path={Constants.ACTION_SUBSCRIBE.url}
            render={() => <NinjaRaterApp router={this.routerRef} />}
          />
          <Route
            path={Constants.ACTION_MY_NINJA_PLAN.url}
            render={() => <NinjaRaterApp router={this.routerRef} />}
          />
          <Route
            path={Constants.ACTION_HELP.url}
            render={() => <NinjaRaterApp router={this.routerRef} />}
          />
          <Route
            path={Constants.ACTION_SIGNED_UP.url}
            render={() => (
              <Layout router={this.routerRef}>
                <SignedUp></SignedUp>
              </Layout>
            )}
          />
          <Route
            path={Constants.ACTION_UPDATE_SUBSCRIPTION.url}
            render={() => <NinjaRaterApp router={this.routerRef} />}
          />
          <Route
            path={Constants.ACTION_PREVIOUS_SUBMISSIONS.url}
            render={() => <NinjaRaterApp router={this.routerRef} />}
          />
          <Route
            path={Constants.ACTION_REFER_FRIEND.url}
            render={() => (
              <Layout router={this.routerRef}>
                <ReferFriend></ReferFriend>
              </Layout>
            )}
          />
          <Route
            path={Constants.ACTION_ADD_USER.url}
            render={() => (
              <Layout router={this.routerRef}>
                <AddUser></AddUser>
              </Layout>
            )}
          />
          <Route
            path="/api"
            render={() => {
              window.location.href = "/assets/test.html";
            }}
          />
          <Route path="/testmessages" component={TestMessages} />
          <Route path="/test" component={PodCasts} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    );
  }
}
export default NinjaRaterPublic;
