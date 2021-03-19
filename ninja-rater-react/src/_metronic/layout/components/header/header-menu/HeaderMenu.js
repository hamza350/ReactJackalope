/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";

export function HeaderMenu({ layoutProps }) {
    const location = useLocation();
    const getMenuItemActive = (url) => {
        return checkIsActive(location, url) ? "menu-item-active" : "";
    }

    return <div
        id="kt_header_menu"
        className={`header-menu header-menu-mobile ${layoutProps.ktMenuClasses}`}
        {...layoutProps.headerMenuAttributes}
    >
        {/*begin::Header Nav*/}
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
            {/*begin::1 Level*/}
            <li className={`menu-item menu-item-rel ${getMenuItemActive('/dashboard')}`}>
                <NavLink className="menu-link" to="/dashboard">
                    <span className="menu-text">Dashboard</span>
                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                </NavLink>
            </li>
           
            <li
                data-menu-toggle={layoutProps.menuDesktopToggle}
                aria-haspopup="true"
                className={`menu-item menu-item-submenu menu-item-rel ${getMenuItemActive('/google-material')}`}>
                <NavLink className="menu-link menu-toggle" to="/google-material">
                    <span className="menu-text">Home</span>
                    <i className="menu-arrow"></i>
                </NavLink>
            </li>
            {/*end::1 Level*/}

            {/*Mega submenu*/}
            {/*begin::1 Level*/}
            

            {/*Classic submenu*/}
            {/*begin::1 Level*/}
            <li
                data-menu-toggle={layoutProps.menuDesktopToggle}
                aria-haspopup="true"
                className={`menu-item menu-item-submenu menu-item-rel ${getMenuItemActive('/custom')}`}>
                <NavLink className="menu-link menu-toggle" to="/custom">
                    <span className="menu-text">Actions</span>
                    <i className="menu-arrow"></i>
                </NavLink>
                <div className="menu-submenu menu-submenu-classic menu-submenu-left">
                    <ul className="menu-subnav">
                        {/*begin::2 Level*/}
                        <li
                            className={`menu-item menu-item-submenu ${getMenuItemActive('/e-commerce')}`}
                            data-menu-toggle="hover"
                            aria-haspopup="true"
                        >
                            <NavLink className="menu-link menu-toggle" to="/e-commerce">
                                <span className="menu-text">
                                   Reports
                                </span>
                            </NavLink>
                        </li>
                        {/*end::2 Level*/}

                        {/*begin::2 Level*/}
                        <li className={`menu-item ${getMenuItemActive('/builder')}`}>
                            <NavLink className="menu-link" to="/builder">
                                <span className="menu-text">Messages</span>
                            </NavLink>
                        </li>
                        {/*end::3 Level*/}

                        {/*begin::2 Level*/}
                        <li
                            className={`menu-item menu-item-submenu ${getMenuItemActive('/error')}`}
                            data-menu-toggle="hover"
                            aria-haspopup="true"
                        >
                            <NavLink className="menu-link menu-toggle" to="/error">
                                <span className="menu-text">
                                    Notes
                                </span>
                            </NavLink>
                        </li>
                        <li
                            className={`menu-item menu-item-submenu ${getMenuItemActive('/error')}`}
                            data-menu-toggle="hover"
                            aria-haspopup="true"
                        >
                            <NavLink className="menu-link menu-toggle" to="/error">
                                <span className="menu-text">
                                    Tasks
                                </span>
                            </NavLink>
                        </li>
                        {/*end::2 Level*/}

                    </ul>
                </div>
            </li>
            <li
                className={`menu-item menu-item-submenu menu-item-rel ${getMenuItemActive('/react-bootstrap')}`}
                data-menu-toggle={layoutProps.menuDesktopToggle}
                aria-haspopup="true"
            >
                <NavLink className="menu-link menu-toggle" to="/react-bootstrap">
                    <span className="menu-text">Settings</span>
                </NavLink>
                
            </li>
            {/*end::1 Level*/}
        </ul>
        {/*end::Header Nav*/}
    </div>;
}
