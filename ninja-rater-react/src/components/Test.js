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

export class Test extends React.Component {

  constructor() {
      super();
      this.state = {

      };

  }

  componentDidMount() {

  }


  render() {

      return (
<div className="ui-g">
  <div className="ui-g-12 ui-md-2">
    Menu
  </div>
  <div className="ui-g-12 ui-md-10 ui-g-nopad">
    <div className="ui-g-12">
      Bar
    </div>
    <div className="ui-g-12 ui-g-nopad">
      <div className="ui-g">
        <div className="ui-g-12 ui-md-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed imperdiet, orci nec dictum convallis, ligula mauris vestibulum turpis, nec varius tortor quam at diam. Nullam a viverra nibh. In tincidunt tempor lectus quis vulputate. Pellentesque nec dui aliquam, lobortis est in, lobortis ante
        </div>
        <div className="ui-g-12 ui-md-4">
          Maecenas vel nisi aliquet, vulputate tortor id, laoreet massa. Maecenas mattis tristique bibendum. Suspendisse vel mi dictum, vestibulum lacus quis, pulvinar quam. Proin vulputate, nibh at finibus varius, leo eros lacinia elit, nec blandit odio tellus a justo. Donec nec ex auctor, tristique nulla nec, rutrum sapien.
        </div>
        <div className="ui-g-12 ui-md-4">
          Proin efficitur in leo eget ornare. Nam vestibulum neque sed velit sagittis sodales. Sed scelerisque hendrerit magna a hendrerit. Cras tempor sem at justo pharetra convallis. Curabitur vel sodales purus. Vestibulum interdum facilisis nulla imperdiet suscipit. Quisque lectus felis, condimentum eget hendrerit sit amet.
        </div>
      </div>
      <div className="ui-g">
        <div className="ui-g-6 ui-md-3">
          <img alt="Galleria 1" src="https://www.primefaces.org/primereact/showcase/resources/demo/images/galleria/galleria1.jpg" style={{width: '100%'}} />
        </div>
        <div className="ui-g-6 ui-md-3">
          <img alt="Galleria 2" src="https://www.primefaces.org/primereact/showcase/resources/demo/images/galleria/galleria2.jpg" style={{width: '100%'}}/>
        </div>
        <div className="ui-g-6 ui-md-3">
          <img alt="Galleria 3" src="https://www.primefaces.org/primereact/showcase/resources/demo/images/galleria/galleria3.jpg" style={{width: '100%'}}/>
        </div>
        <div className="ui-g-6 ui-md-3">
          <img alt="Galleria 4" src="https://www.primefaces.org/primereact/showcase/resources/demo/images/galleria/galleria4.jpg" style={{width: '100%'}}/>
        </div>
      </div>
      <div className="ui-g">
        <div className="ui-g-12 ui-md-6">
          Phasellus faucibus purus volutpat mauris lacinia sodales. Ut sit amet sapien facilisis, commodo dui non, fringilla tellus. Quisque tempus facilisis nisi sodales finibus. Pellentesque neque orci, ullamcorper vitae ligula quis, dignissim euismod augue.
        </div>
        <div className="ui-g-12 ui-md-6">
          Fusce ullamcorper congue massa, eget ullamcorper nunc lobortis egestas. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ultrices dui eget dolor feugiat dapibus. Aliquam pretium leo et egestas luctus. Nunc facilisis gravida tellus.
        </div>
      </div>
    </div>
  </div>
  <div className="ui-g-12">
    Footer
  </div>
</div>
      );
  }
}
