import React from "react";
import ReactDOM from "react-dom";
import "babel-polyfill";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import NinjaRaterApp from "./NinjaRaterApp";
import NinjaRaterPublic from "./NinjaRaterPublic";
import {HashRouter} from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import {default as Store} from "./state/store";
import {Provider} from "react-redux";
import * as _redux from "./redux";
import axios from "axios";
import store, { persistor } from "./redux/store";
import App from "./app/App";
import "./index.scss"; // Standard version
// import "./sass/style.react.rtl.css"; // RTL version
import "./_metronic/_assets/plugins/keenthemes-icons/font/ki.css";
import "socicon/css/socicon.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./_metronic/_assets/plugins/flaticon/flaticon.css";
import "./_metronic/_assets/plugins/flaticon2/flaticon.css";
// Datepicker
import "react-datepicker/dist/react-datepicker.css";
import {
  MetronicLayoutProvider,
  MetronicSplashScreenProvider,
  MetronicSubheaderProvider
} from "./_metronic/layout";
import {MetronicI18nProvider} from "./_metronic/i18n";



const { PUBLIC_URL } = process.env;


/* const mock = */ _redux.mockAxios(axios);



_redux.setupAxios(axios, store);
debugger
const AdminIndex = () => {
  debugger
  ReactDOM.render(
    <MetronicI18nProvider>
      <MetronicLayoutProvider>
        <MetronicSubheaderProvider>
          <MetronicSplashScreenProvider>
            <App store={store} persistor={persistor} basename={PUBLIC_URL} />
          </MetronicSplashScreenProvider>
        </MetronicSubheaderProvider>
      </MetronicLayoutProvider>
    </MetronicI18nProvider>,
  document.getElementById("root")
);

return (  
      <></>
);
}



export default AdminIndex;


// ReactDOM.render(
//   <MetronicI18nProvider>
//     <MetronicLayoutProvider>
//       <MetronicSubheaderProvider>
//         <MetronicSplashScreenProvider>
//           <App store={store} persistor={persistor} basename={PUBLIC_URL} />
//         </MetronicSplashScreenProvider>
//       </MetronicSubheaderProvider>
//     </MetronicLayoutProvider>
//   </MetronicI18nProvider>,
//   document.getElementById("root2")
// );

// ReactDOM.render(
//     <HashRouter>
//         <NinjaRaterPublic></NinjaRaterPublic>
//     </HashRouter>,
//     document.getElementById('root')
// );

//ReactDOM.render(
//    <HashRouter>
//        <NinjaRaterApp></NinjaRaterApp>
//    </HashRouter>,
//    document.getElementById('root')
//);

//ReactDOM.render(
//    <HashRouter>
//        <App></App>
//    </HashRouter>,
//    document.getElementById('root')
//);

// registerServiceWorker();
