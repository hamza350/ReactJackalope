import React, { Component } from 'react';
import * as Constants from '../../Constants';

export default class MenuUtility extends Component {

  toggleMenuItemTabs(clickedMenuItem) {
    if(!clickedMenuItem)
      return;
    var topMenuContainer = clickedMenuItem.parentElement;
    for(var i = 0; i < topMenuContainer.children.length; ++i) {
      var menuItem = topMenuContainer.children[i];
      this.toggleTab(menuItem, false);
    }
    this.toggleTab(clickedMenuItem, true);
  }

  toggleTab(tabItem, isActive) {
    if(!tabItem)
      return;
    if(!tabItem.children[0] || !tabItem.children[0].children[0] || !tabItem.children[0].children[1])
      return;
    var icon = tabItem.children[0].children[0];
    var itemText = tabItem.children[0].children[1];
    if(isActive) {

      itemText.style.color = '#4054b2';
      icon.style.color = '#4054b2';
      tabItem.style.fontStyle = 'italic';
      tabItem.style.backgroundColor = 'white';
      tabItem.style.border = 'solid 1px #2a3890';
      tabItem.style.borderRadius = '7px';

    } else {
      itemText.style.color = 'white';
      icon.style.color = 'white';
      tabItem.style.fontStyle = 'normal';
      tabItem.style.backgroundColor = '#4054b2';
      tabItem.style.border = '';
      tabItem.style.borderRadius = '';
    }
  }


  render() {
      return (
        <div></div>
      );
  }

}
