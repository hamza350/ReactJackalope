import React, { Component } from 'react';
import classNames from 'classnames';
import {DataGrid} from 'primereact/components/datagrid/DataGrid';
import {Dialog} from 'primereact/components/dialog/Dialog';
import {Panel} from 'primereact/components/panel/Panel';
import {Calendar} from 'primereact/components/calendar/Calendar';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Button} from 'primereact/components/button/Button';
import jQuery from 'jquery';
import $ from 'jquery';
import '../Demo.css';
import '../App.css';

export class grid2 extends React.Component {

  constructor() {
      super();
      this.state = {

      };

  }

  componentDidMount() {

  }


  render() {

      return (
<div className="ui-g ui-g-no-padding" style={{width: '100%'}}>
  <div className="ui-g-12 ui-md-10 ui-g-no-padding" style={{width: '100%'}}>
      <div className="ui-g-12 ui-md-6 ui-lg-3 ui-g-no-padding">
        One
      </div>
      <div className="ui-g-12 ui-md-6 ui-lg-3 ui-g-no-padding">
        Two
      </div>
      <div className="ui-g-12 ui-md-6 ui-lg-3 ui-g-no-padding">
        Three
      </div>
      <div className="ui-g-12 ui-md-6 ui-lg-3 ui-g-no-padding">
        Four
      </div>
      <div className="ui-g-12 ui-md-6 ui-lg-3 ui-g-no-padding">
        Five
      </div>
      <div className="ui-g-12 ui-md-6 ui-lg-3 ui-g-no-padding">
        Six
      </div>
      <div className="ui-g-12 ui-md-6 ui-lg-3 ui-g-no-padding">
        Seven
      </div>
      <div className="ui-g-12 ui-md-6 ui-lg-3 ui-g-no-padding">
        Eight
      </div>
      <div className="ui-g-12 ui-g-no-padding">
        <div className="ui-g ui-g-no-padding">
          <div className="ui-g-12 ui-md-4 ui-g-no-padding">
              <img alt="Galleria 1" src="https://www.primefaces.org/primereact/showcase/resources/demo/images/galleria/galleria1.jpg" style={{width: '100%'}} />
          </div>
          <div className="ui-g-12 ui-md-4 ui-g-no-padding">
            Maecenas vel nisi aliquet, vulputate tortor id, laoreet massa. Maecenas mattis tristique bibendum. Suspendisse vel mi dictum, vestibulum lacus quis, pulvinar quam. Proin vulputate, nibh at finibus varius, leo eros lacinia elit, nec blandit odio tellus a justo. Donec nec ex auctor, tristique nulla nec, rutrum sapien.
          </div>
          <div className="ui-g-12 ui-md-4 ui-g-no-padding">
            Proin efficitur in leo eget ornare. Nam vestibulum neque sed velit sagittis sodales. Sed scelerisque hendrerit magna a hendrerit. Cras tempor sem at justo pharetra convallis. Curabitur vel sodales purus. Vestibulum interdum facilisis nulla imperdiet suscipit. Quisque lectus felis, condimentum eget hendrerit sit amet.
          </div>
        </div>
      </div>
  </div>
</div>
      );
  }
}
