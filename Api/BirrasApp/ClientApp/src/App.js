import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import  Home  from './components/Home';
import  AprovisionarMeetup  from './components/Pages/AprovisionarMeetup';
import  ConocerTemperatura  from './components/Pages/ConocerTemperatura';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/conocer-temperatura' component={ConocerTemperatura} />
         <Route path='/aprovisionar-meetup' component={AprovisionarMeetup} /> 
      </Layout>
    );
  }
}
