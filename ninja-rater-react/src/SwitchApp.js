import React, { Component,Suspense, lazy } from "react";
import NinjaRaterApp from "./NinjaRaterApp";
import App from "./app/App";
import AdminIndex from "./admin_index"
import { DashboardPage } from "./app/pages/DashboardPage";
import { Layout } from "./_metronic/layout";
import { LayoutSplashScreen, ContentRoute } from "./_metronic/layout";


const SwitchApp = () => {
  const admin = true;

return(
    <>
      {
        admin ?
        <AdminIndex /> :
        <NinjaRaterApp />
      }
    </>


);


}


export default SwitchApp;


