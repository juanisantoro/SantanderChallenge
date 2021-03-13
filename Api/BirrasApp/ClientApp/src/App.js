import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import React, { Component } from "react";
import { Route } from "react-router";
import Home from "./components/Home";
import { Layout } from "./components/Layout";
import AddMeetup from "./components/Pages/AddMeetup";
import AprovisionarMeetup from "./components/Pages/AprovisionarMeetup";
import ConocerTemperatura from "./components/Pages/ConocerTemperatura";
import Login from "./components/Pages/Login";
export default class App extends Component {
  static displayName = App.name;

  render() {
    debugger;
    return sessionStorage.getItem("user") === null ? (
      <Login></Login>
    ) : (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Home} />
        <Route path='/conocer-temperatura' component={ConocerTemperatura} />
        <Route path='/aprovisionar-meetup' component={AprovisionarMeetup} />
        <Route path='/add-meetup' component={AddMeetup} />
      </Layout>
    );

    // <Layout>
    //   <Route exact path='/' component={Home} />
    //   <Route path='/conocer-temperatura' component={ConocerTemperatura} />
    //    <Route path='/aprovisionar-meetup' component={AprovisionarMeetup} />

    // </Layout>
  }
}
