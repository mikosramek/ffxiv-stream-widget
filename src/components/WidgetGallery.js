import React from 'react';
import axios from 'axios';

import ServerSelect from './ServerSelect';
import Header from './Header';
import Footer from './Footer';
import ConditionalLink from './ConditionalLink';

class WidgetGallery extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      server: '',
      gettingInfo: false
    }
  }
  
  getInfo = (e) => {
    e.preventDefault();
    this.setState({
      gettingInfo: true
    })
    axios({
      method: 'GET',
      url: 'https://xivapi.com/character/search',
      dataResponse: 'json',
      params: {
        name:this.state.name,
        server: this.state.server
      }
    }).then( (result) => {
      this.setState({
        gettingInfo: false
      }, () => {
        const info = result.data.Results[0];
        this.props.setCharacterInfo(info); 
      })
    }).catch( (error) => {
      console.log(error);
    });
  }
  render() {
    return(
      <>
        <Header />
        <main>
          <div className="wrapper">
            <ul className="widgetGalleryList">
              <li>
                { 
                  this.props.playerInfo !== undefined
                    ? 
                      <div className="profileSummary">
                        <div className="profileImage">
                          <img src={this.props.playerInfo.avatar} alt=""/>
                        </div>
                        <h2>{this.props.playerInfo.name}</h2>
                        <p>{this.props.playerInfo.server}</p>
                        <button onClick={this.props.clearPlayerInfo}>Clear Player Info</button>
                      </div>
                    : this.state.gettingInfo
                        ? <p>Fetching Info</p>
                        : 
                          <form onSubmit={this.getInfo}>
                            <label htmlFor="nameSearch">Character Name</label>
                            <input type="text" id="nameSearch" value={this.state.name} onChange={(e) => this.setState({name:e.target.value})} required />
                            <label htmlFor="serverSelect">Select a server</label>
                            <ServerSelect id="serverSelect" servers={this.props.servers} updateSelect={(newServer) => this.setState({server: newServer})} server={this.state.server} />
                            <button>Get Information</button>
                          </form>  
                }
              </li>
              <li>
                <h2>Character</h2>
                <p>A general overview of your character's profile.</p>
                <div className="galleryLinks">
                  <ConditionalLink destination={`character/`} disabled={this.props.playerInfo === undefined}>Configure</ConditionalLink>
                  <ConditionalLink destination={`character/${this.props.playerInfo ? this.props.playerInfo.id : ''}`} disabled={this.props.playerInfo === undefined}>Quick</ConditionalLink>
                </div>
              </li>
              {/* <li>
                <h2>Jobs</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita quia ratione laborum. Eligendi, laboriosam natus.</p>
                <div className="galleryLinks">
                  <Link className='galleryButton' to='/character'>Configure</Link>
                  <QuickLink id={this.props.playerInfo} destination='character' />
                </div>
              </li>
              <li>
                <h2>Achievements</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, voluptatibus!</p>
                <div className="galleryLinks">
                  <Link className='galleryButton' to='/character'>Configure</Link>
                  <QuickLink id={this.props.playerInfo} destination='character' />
                </div>
              </li> */}
            </ul>
          </div>
        </main>
        <Footer />
      </>
    );
  }
};

export default WidgetGallery;