import React from 'react';
import { Link } from 'react-router-dom';
import {hexToRgb} from '../utility/colors';
import Header from './Header';
import Footer from './Footer';

class CharacterSummary extends React.Component {
  constructor() {
    super();
    this.state = {
      display_portrait: true,
      display_title: true,
      display_server: true,
      update_rate: 0,
      background_color: '#ffffff',
      background_transparency: '0.8',
      widget_url: '/'
    }
  }
  navigateToWidget = (e) => {
    e.preventDefault();
  }

  updateSettings = (e) => {
    this.setState({
      [e.target.value]: !this.state[e.target.value]
    });
  }


  componentDidMount() {
    if(this.props.playerInfo !== undefined){
      this.updateURL();
    }
  }
  componentDidUpdate() {
    this.updateURL();
  }

  updateURL = () => {
    const { display_portrait, display_title, display_server, update_rate, widget_url } = this.state;
    const color = hexToRgb(this.state.background_color, this.state.background_transparency);//+this.state.background_transparency;
    const rgb = `rgb(${color.r},${color.g},${color.b},${color.a})`;
    const url = `/character/${this.props.playerInfo.id}?display_portrait=${display_portrait}&display_title=${display_title}&display_server=${display_server}&update_rate=${update_rate}&background_color=${rgb}`;
    if(widget_url !== url) {
      this.setState({
        widget_url: url
      })
    }
  }
  //https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
  copyToClipboard = (e) => {
    this.input.select();
    document.execCommand('copy');
    e.target.focus();
  };
  
  render() {
    const { display_portrait, display_title, display_server, update_rate, widget_url } = this.state;
    const color = hexToRgb(this.state.background_color, this.state.background_transparency);//+this.state.background_transparency;
    const rgb = `rgb(${color.r},${color.g},${color.b},${color.a})`;
    return(
      <>
        <Header />
        <main className="characterSummary">
          <div className="wrapper">
            <h2>Character Summary Widget</h2>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi accusamus quo ad laboriosam in voluptates eaque, accusantium ipsam fugiat eum.</p>
            <form onSubmit={this.navigateToWidget}>
              <h3>Widget Settings:</h3>

              <div className="widgetOption">
                <input type="checkbox" name="display_portrait" id="display_portrait" value="display_portrait" checked={display_portrait} onChange={this.updateSettings} />
                <label htmlFor="display_portrait">Display player portrait</label>
              </div>

              <div className="widgetOption">
                <input type="checkbox" name="displayTitle" id="displayTitle" value="display_title" checked={display_title} onChange={this.updateSettings} />
                <label htmlFor="displayTitle">Display player title</label>
              </div>

              <div className="widgetOption">
                <input type="checkbox" name="displayServer" id="displayServer" value="display_server" checked={display_server} onChange={this.updateSettings} />
                <label htmlFor="displayServer">Display player server</label>
              </div>

              <div className="widgetOption">
                <label htmlFor="bgColor">Background color: </label>
                <input type="color" name="bgColor" id="bgColor" value={this.state.background_color} onChange={(e) => this.setState({
                  background_color: e.target.value
                })} />
              </div>

              <div className="widgetOption">
                <label htmlFor="bgTransRights">Background transparency: </label>
                <input type="number" name="bgTransRights" id="bgTransRights" step="0.1" value={this.state.background_transparency} onChange={(e) => this.setState({
                  background_transparency: e.target.value
                })} />
              </div>


              <div className="widgetOption">
                <label htmlFor="updateTick">Widget update rate: once every</label>
                <input type="number" name="updateTick" id="updateTick" max={3600} min={0} value={update_rate} onChange={(e) => this.setState({update_rate: e.target.value})} />
                <p>seconds. ({ Math.floor((parseInt(update_rate) / 60) * 100)/100 } minute{this.state.update_rate !== '60' ? 's' : null})</p>
              </div>

            </form>
            <h3>Preview Widget:</h3>
            <div className="widgetPreview">
              <div className="head">
                <div className="backing"></div>
                <div className="content" style={{background:rgb}}>
                  {
                    display_portrait
                    ?
                      <div className="portrait">
                        <img className="character" src='https://img2.finalfantasyxiv.com/f/406feef47d2894f6ade38ccd577c796b_58a84e851e55175d22158ca97af58a1ffc0_96x96.jpg?1578787457' alt={`The character portrait for Miko.`}/>
                        <img src='https://xivapi.com/cj/1/warrior.png' alt='Warrior icon' className="jobIcon" />
                      </div>
                    : null
                  }
                  <div className="name">
                    { display_title ? <p>Barago</p> : null }
                    <h2>Miko Ca'lupo</h2>
                    <p>Level 60 warrior.</p>
                    { display_server ? <p className="server">Aether / Siren</p> : null }
                  </div>
                </div>
              </div>
            </div>
            <h3>Link to widget:</h3>
            <input onClick={this.copyToClipboard} ref={(input) => this.input = input} className="widgetUrl" readOnly type="text" value={window.location.href.replace('/#/character/', '/#') + widget_url} />
            <p><Link className='galleryButton' to={widget_url}>Go To Widget</Link></p>
          </div> {/* End of Wrapper */}
        </main>
        <Footer />
      </>
    );
  }
};

export default CharacterSummary;