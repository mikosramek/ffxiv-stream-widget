import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';

import WidgetGallery from './components/WidgetGallery';
import CharacterSummary from './components/CharacterSummary';
import CharacterWidget from './components/CharacterWidget';
import JobsSummary from './components/JobsSummary';
import JobsWidget from './components/JobsWidget';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      playerInfo: undefined,
      servers: []
    }
  }
  componentDidMount() {
    const user = localStorage.getItem(`userexists`);
    this.getServerList();
    if(user === 'true') {
      const newInfo = {
        id: '',
        avatar: '',
        name: '',
        server: '',
      }
      for(let key in newInfo){
        newInfo[key] = localStorage.getItem(`user${key}`);
      }
      
      this.setState({
        playerInfo: newInfo
      });
    }
  }
  getServerList = () => {
    axios({
      method: 'GET',
      url: 'https://xivapi.com/servers',
      dataResponse: 'json',
    }).then( (result) => {
      this.setState({
        servers: result.data
      })
    }).catch( (error) => {
      console.log(error);
    });
  }
  
  setCharacterInfo = (info) => {
    const newInfo = {
      id: info.ID,
      avatar: info.Avatar,
      name: info.Name,
      server: info.Server
    }
    localStorage.setItem('userexists', 'true');
    for(let key in newInfo){
      localStorage.setItem(`user${key}`, newInfo[key]);
    }
    this.setState({
      playerInfo: newInfo
    });
  }
  clearPlayerInfo = () => {
    localStorage.clear();
    this.setState({
      playerInfo: undefined
    });
  }
  render() {
    return(
      <Router>
        <Route exact path="/" component={() => <WidgetGallery setCharacterInfo={this.setCharacterInfo} playerInfo={this.state.playerInfo} servers={this.state.servers} clearPlayerInfo={this.clearPlayerInfo} />} />
        <Route exact path="/character" component={() =>  <CharacterSummary playerInfo={this.state.playerInfo} />} />
        <Route exact path="/jobs" component={() =>  <JobsSummary playerInfo={this.state.playerInfo} /> } />
        <Route exact path="/achievements" component={()=> <CharacterSummary playerInfo={this.state.playerInfo} /> } />

        <Route path="/character/:id" component={CharacterWidget} />
        <Route path="/jobs/:id" component={JobsWidget} />
        <Route path="/achievements/:id" component={CharacterWidget} />

      </ Router>
    );
  }
};

export default App;
