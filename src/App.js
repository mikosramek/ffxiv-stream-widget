import React from 'react';

import './App.css';

import CharacterWidget from './components/CharacterWidget';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      id: ''
    }
  }
  componentDidMount() {

  }

  render() {
    return(
      <main>
        <CharacterWidget />
      </main>
    );
  }
};

export default App;
