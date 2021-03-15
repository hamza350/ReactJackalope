import React, { Component } from "react";
import { withRouter } from "react-router";
import styles from "../v1-components/register/register.module.scss";
import { Customisedbutton } from "../shared/inputFields";
import * as Constants from "../Constants";
import PreviousSubmissions from "../v1-components/previousSubmissions";
import "../../src/App.css";


class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <section className={styles.dasborad_sec}>
          <div className={styles.coverimage}>
            <h2>
              Welcom<span className={styles.bottom_borderline}>e to Ja</span>
              ckalope
            </h2>
            <div className={styles.banner_buttons}>
              <Customisedbutton
                name="Previous Submissions"
                className={[
                  styles.dashboard_button_one22,
                  "commonButtonClass",
                ].join(" ")}
                onClick={(event) =>
                  this.props.ninjaRaterApp.NinjaRaterAppStateHandler(
                    event,
                    Constants.ACTION_PREVIOUS_SUBMISSIONS
                  )
                }
              />
              <Customisedbutton
                name="Get Indication"
                className={[
                  styles.dashboard_button_one22,
                  "commonButtonClass",
                ].join(" ")}
                // className={styles.dashboard_button_one22}
                onClick={(event) =>
                  this.props.ninjaRaterApp.gotoIndications(event)
                }
              />
            </div>
          </div>
        </section>
        {/* <section className={styles.testimonals_sec}>
          <div className={styles.testimonals_flex}>
            <div>
              <h2>Testimonials</h2>
            </div>
            <div className={styles.testimonals_borderline}></div>
            <div className={styles.testimonals_sub_head}>
              <p>
                Once you start using the system and see how much it improves
                your life, you will never go back to blind submissions again.
                It’s that powerful. People LOVE the increase efficiency!
              </p>
            </div>
            <div className={styles.testimonals_items}>
              <div className={styles.testimonals_item}>
                <div>
                  <div style={{ display: "flex" }}>
                    <img src="https://myjackalope.com/wp-content/uploads/2016/01/Ben512-80x80.jpg"></img>
                    <div className={styles.testimonals_t_a_position}>
                      <p className={styles.testimonals_author}>Ben Shoemaker</p>
                      <p className={styles.testimonals_title}>VICE PRESIDENT</p>
                    </div>
                  </div>
                  <div>
                    <p className={styles.testimonals_text}>
                      “It’s an exciting time to be building on-line solutions
                      that help our nation’s business owners find and secure
                      work comp coverage. I think our clients will be very
                      impressed”
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.testimonals_item}>
                <div>
                  <div style={{ display: "flex" }}>
                    <img src="https://myjackalope.com/wp-content/uploads/2016/01/T02HGQGQM-U01AUJ8A1U2-f7c9e184911b-512-80x80.jpeg"></img>
                    <div className={styles.testimonals_t_a_position}>
                      <p className={styles.testimonals_author}>Sara Bullock</p>
                      <p className={styles.testimonals_title}>
                        PROGRAM MANAGER
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className={styles.testimonals_text}>
                      " This rater will be a game changer. It really does align
                      with Bigfoot’s mission in going paperless. A user friendly
                      process for our agents! "
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </React.Fragment>
    );
  }
}

export default Home;
