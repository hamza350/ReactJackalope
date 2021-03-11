import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import $ from 'jquery';
import * as Constants from './Constants';

import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

const toolTipStyles = {
  display: 'table-cell',
  height: '60px',
  width: '80px',
  textAlign: 'center',
  background: '#f6f6f6',
  verticalAlign: 'middle',
  border: '5px solid white'
};

class AppSubmenu extends Component {

    static defaultProps = {
        className: null,
        items: null,
        onMenuItemClick: null,
        onRootItemClick: null,
        root: false,
        layoutMode: null,
        menuActive: false
    }

    static propTypes = {
        className: PropTypes.string,
        items: PropTypes.array,
        onMenuItemClick: PropTypes.func,
        onRootItemClick: PropTypes.func,
        root: PropTypes.bool,
        layoutMode: PropTypes.string,
        menuActive: PropTypes.bool
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    onMenuItemClick(event, item, index) {
        //avoid processing disabled items
        if(item.disabled) {
            event.preventDefault();
            return true;
        }

        if(this.props.root && this.props.onRootItemClick) {
            this.props.onRootItemClick({
                originalEvent: event,
                item: item
            });
        }

        //execute command
        if(item.command) {
            item.command({originalEvent: event, item: item});
        }

        //prevent hash change
        if(item.items || !item.url) {
            event.preventDefault();
        }

        if(index === this.state.activeIndex)
            this.setState({activeIndex: null});
        else
            this.setState({activeIndex: index});

        if(this.props.onMenuItemClick) {
            this.props.onMenuItemClick({
                originalEvent: event,
                item: item
            });
        }
    }

    onMenuItemMouseEnter(index) {
        if(this.props.root && this.props.menuActive && this.isHorizontalOrSlim()) {
            this.setState({activeIndex: index});
        }
    }

    componentWillReceiveProps(nextProps, nextState) {
        if(this.isHorizontalOrSlim() && this.props.menuActive && !nextProps.menuActive) {
            this.setState({activeIndex: null});
        }
    }

    isHorizontalOrSlim() {
        return (this.props.layoutMode === 'horizontal' || this.props.layoutMode === 'slim');
    }

    render() {
        var items = this.props.items && this.props.items.map((item, i) => {
            let active = this.state.activeIndex === i;
            let styleClass = classNames(item.badgeStyleClass, {'active-menuitem': active});
            let badge = item.badge && <span className="menuitem-badge">{item.badge}</span>;
            let submenuIcon = item.items && <i className="material-icons submenu-icon">keyboard_arrow_down</i>;
            let tooltip = this.props.root && <div className="layout-menu-tooltip">
                                                <div className="layout-menu-tooltip-arrow"></div>
                                                <div className="layout-menu-tooltip-text">{item.label}</div>
                                            </div>;

            return <li className={styleClass} key={i}>
                        <a className="ripplelink" href={item.url||'#'} onClick={(e) => this.onMenuItemClick(e, item, i)} target={item.target}
                            onMouseEnter={(e) => this.onMenuItemMouseEnter(i)}>
                            <i className="material-icons">{item.icon}</i>
                            {item.toolTipText && (<Tooltip placement="rightBottom" overlay={item.toolTipText}><span>{item.label}</span></Tooltip>)}
                            {!item.toolTipText && (<span>{item.label}</span>)}
                            {badge}
                            {submenuIcon}
                        </a>
                        {tooltip}
                        <AppSubmenu items={item.items} onMenuItemClick={this.props.onMenuItemClick} layoutMode={this.props.layoutMode}
                                    menuActive={this.props.menuActive} />
                    </li>
        });

        return <ul className={this.props.className}>{items}</ul>;
    }
}

export class AppMenu extends Component {

  constructor() {
    super();
    this.state = {
      modelLoadedFirstTime: true
    };
  }

    componentDidUpdate(component) {
      if(Constants.RUN_QUOTE_UPON_LOAD) {
        if(component && component.model && component.model.length && component.model.length > 0) {
          let quotes = component.model[0];
          if(quotes.items && quotes.items.length && quotes.items.length > 0) {
            let mostRecentQuote = quotes.items[0];
            if(this.state.modelLoadedFirstTime == true) {
              //page is loaded for the first time. Run the most recent quote
              this.setState({ modelLoadedFirstTime: false });
              let dateRows = $('.material-icons.submenu-icon');
              if(dateRows && dateRows.length && dateRows.length > 0) {
                let firstChild = dateRows[0].firstChild;
                if(firstChild && firstChild.data === 'keyboard_arrow_down') {
                  //alert("UPDATED: "+JSON.stringify(mostRecentQuote));

                  // $(firstChild).click();
                  // $(firstChild)[0].click();
                  let parentRow = $(firstChild).parent();
                  $(parentRow).click();

                  //let classCodesElements = $(parentRow).find(".classcodes");
                  //alert(classCodesElements);
                  //let classCodeRows = $(parentRow).find('span:contains(Class Codes)');
                  let classCodeRows = $('span:contains(Class Codes)');
                  if(classCodeRows && classCodeRows.length && classCodeRows.length > 0) {
                    $(classCodeRows[0]).click();
                  }
                }
              }
            }
          }
        }
      }
    }

    static defaultProps = {
        model: null,
        onMenuItemClick: null,
        onRootMenuItemClick: null,
        layoutMode: null,
        active: false
    }

    static propTypes = {
        model: PropTypes.array,
        layoutMode: PropTypes.string,
        onMenuItemClick: PropTypes.func,
        onRootMenuItemClick: PropTypes.func,
        active: PropTypes.bool
    }

    render() {
        return <AppSubmenu style={toolTipStyles} items={this.props.model} className="ultima-menu ultima-main-menu clearfix classcodes"
                        menuActive={this.props.active} onRootItemClick={this.props.onRootMenuItemClick}
                        onMenuItemClick={this.props.onMenuItemClick} root={true} layoutMode={this.props.layoutMode}/>
    }
}
