import React, { Component } from 'react';
import classNames from 'classnames';

import '../assets/ninja/theme/theme-indigo.css';
import '../assets/ninja/layout/css/layout-indigo.css';
import 'primereact/resources/primereact.min.css';
import { Constraints } from 'fullcalendar';


export default class PodCasts extends React.Component {

  constructor() {
      super();
      this.state = {
      };
  }

  componentDidMount() {

  }


render() {

    return (
<div className="ui-g-12 no-padding" style={{width: '100%', background: 'transparent'}}>
    <section className="ui-g-12" style={{fontSize: '3em', textAlign: 'center', fontWeight: 'bold', backgroundColor: '#293891', width: '100%'}}>
        <font size="3em" color="white">NinjaRater on Podcasts and Radio Shows</font>
    </section>
    
    <section className="ui-g-12" style={{width: '100%'}}>
        <a href="https://spotoninsurance.com/podcast/ninja-rater-california-wc-rates/" target="_blank">
            <div className="ui-g-12 ui-md-4">
                <img style={{width: '100%', height: '300px'}} src="images/help/SpotOnInsuranceWelcomes.jpg" />
            </div>
            <div className="ui-g-12 ui-md-8">
                <h1>SPOT ON Insurance Welcomes NinjaRater</h1>
                <p>Arleen &amp; Ted Taveras run Spot on Insurance podcast which is one of the most well produced products in the industry.  Their designers are top notch and the team is very well organized.  We had a great conversation and I admire the company they've built and their approach to business.  We probably talked a lot more about chicken farming than Insurance on this one, but it was  great discussion.</p>
            </div>
        </a>
   </section>

   <section className="ui-g-12" style={{width: '100%'}}>
        <a href="https://www.youtube.com/watch?v=bMlAbgzDZ4w" target="_blank">
            <div className="ui-g-12 ui-md-4">
                <iframe style={{width: '100%', height: '300px'}} sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-popups-to-escape-sandbox" frameBorder="0" aria-label="YouTube Video, InsNerds Attachment Point News Roundtable with Justin Fowler, MBA" src="https://www.youtube.com/embed/bMlAbgzDZ4w" allowFullScreen></iframe>
            </div>
            <div className="ui-g-12 ui-md-8">
                <h1>THE ATTACHMENT POINT</h1>
                <p>Video Chat with Nick Lamparelli and Brett Fulmer on a saturday.  Talking about Ninja Rater and the democratization of Data Analytics.</p>
            </div>
        </a>
   </section>  

   <section className="ui-g-12" style={{width: '100%'}}>
        <a href="https://insuranceinnovators.co/2018/09/06/ep-051-justin-fowler-ninja-rater-creating-workers-compensation-transparency/" target="_blank">
            <div className="ui-g-12 ui-md-4">
                <img style={{width: '100%', height: '300px'}} src="images/help/Abel_Travis_Cover.jpg" />
            </div>
            <div className="ui-g-12 ui-md-8">
                <h1>THE INSURANCE INNOVATORS</h1>
                <p>Abel Travis has done an amazing job at calling out those in our industry who believe it's business as usual.  In our discussion, we talk about what the competitive advantages are that we still offer in the value chain and how we can remain relevant.  Cooperation is where we have the best chance to beat the machines.</p>
            </div>
        </a>
   </section>

   <section className="ui-g-12" style={{width: '100%'}}>
        <a href="https://www.agencynation.com/will-small-commercial-next/" target="_blank">
            <div className="ui-g-12 ui-md-4">
                <img style={{width: '100%', height: '300px'}} src="images/help/AgencyNationSound.jpg" />
                <h4>Will Small Commercial Be Next to go Direct? | Agency Nation</h4>
            </div>
            <div className="ui-g-12 ui-md-8">
                <h1>AGENCY NATION SOUND</h1>
                <p>There is a lot of debate about the future of our industry and which sections are most vulnerable to disruption.  Joey Giangola and I get into a discussion around our own experiences in this industry as well as the trends that are shaping the new competitive environment.</p>
                <p>My position is that most of the advantages we have enjoyed as brokers for the past several decades is the result of the asymmetry of information.  Our industry is one of the last areas of commerce where a consumer has considerably less access to product information and research than does a salesman.</p>
                <p>This is changing rapidly.  The people that will win are those who will embrace the change in consumer behavior, not those who deny it. </p>
                <h4>It's certainly a possibility you shouldn't underestimate because the faster and easier things get the harder it becomes for you to add value.</h4>
            </div>
        </a>
   </section>

   <section className="ui-g-12" style={{width: '100%'}}>
        <a href="https://episodes.buzzsprout.com/513140.mp3" target="_blank">
            <div className="ui-g-12 ui-md-4">
                <img style={{width: '100%', height: '300px'}} src="images/help/ProfilesInRisk.jpg" />
            </div>
            <div className="ui-g-12 ui-md-8">
                <h1>Profiles in Risk</h1>
                <p>The INS Nerds - Nick Lamparelli, Tony Canas, and Carly Burnham have been instrumental in moving our industry toward the younger demographics and keeping us relevant.  My discussion with the Nerds centered around my experience in this industry and why it is still a great choice for someone looking to build a career.</p>
                <p>The INS Nerds are involved in several projects and their own audience has now grown to over 15k+ listeners in only a few years.  Their work is commendable in any industry, especially the insurance vertical.</p>
            </div>
        </a>
   </section>

</div>


    );
}
}



