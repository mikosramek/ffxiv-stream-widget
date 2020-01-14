import React from 'react';
import { Link } from 'react-router-dom';
import {hexToRgb} from '../utility/colors';

import Header from './Header';
import Footer from './Footer';

class JobsSummary extends React.Component {
  constructor() {
    super();
    this.state = {
      display_careers: true,
      display_unleveled_jobs: true,
      background_color: '#ffffff',
      background_transparency: 0.6,
      update_rate: 0,
      list_direction: 'column',
      widget_url: '/'
    }
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
    const { display_careers, display_unleveled_jobs, list_direction, update_rate, widget_url } = this.state;
    const color = hexToRgb(this.state.background_color, this.state.background_transparency);//+this.state.background_transparency;
    const rgb = `rgb(${color.r},${color.g},${color.b},${color.a})`;
    const url = `/jobs/${this.props.playerInfo.id}?display_careers=${display_careers}&display_unleveled_jobs=${display_unleveled_jobs}&list_direction=${list_direction}&update_rate=${update_rate}&background_color=${rgb}`;
    if(widget_url !== url) {
      this.setState({
        widget_url: url
      })
    }
  }
  updateSettings = (e) => {
    this.setState({
      [e.target.value]: !this.state[e.target.value]
    });
  }
  updateSelect = (e) => {
    this.setState({
      list_direction: e.target.value
    });
  }
  //https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
  copyToClipboard = (e) => {
    this.input.select();
    document.execCommand('copy');
    e.target.focus();
  };

  render() {
    const { display_careers, display_unleveled_jobs, list_direction, update_rate, widget_url } = this.state;
    const color = hexToRgb(this.state.background_color, this.state.background_transparency);//+this.state.background_transparency;
    const rgb = `rgb(${color.r},${color.g},${color.b},${color.a})`;
    console.log(rgb);
    return(
      <>
        <Header />
        <main className="characterSummary">
          <div className="wrapper">
            <form>
              <div className="widgetOption">
                <input type="checkbox" name="display_careers" id="display_careers" value="display_careers" checked={display_careers} onChange={this.updateSettings} />
                <label htmlFor="display_careers">Display trades</label>
              </div>
              <div className="widgetOption">
                <input type="checkbox" name="display_unleveled_jobs" id="display_unleveled_jobs" value="display_unleveled_jobs" checked={display_unleveled_jobs} onChange={this.updateSettings} />
                <label htmlFor="display_unleveled_jobs">Display Level 0 Jobs</label>
              </div>
              <select name="list_direction" id="list_direction" onChange={this.updateSelect} value={this.state.list_direction}>
                <option value="column">Column</option>
                <option value="column-reverse">Column Reverse</option>
                <option value="row">Row</option>
                <option value="row-reverse">Row Reverse</option>
              </select>

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
            <ul className="jobWidgetList" style={{'flexDirection':list_direction}}>
              { 
                !display_careers
                  ? null
                  : <>
                      <li style={{background:rgb}}>
                        <div className="jobDetails">
                          <img src={`https://xivapi.com/cj/1/armorer.png`} alt=""/>
                          <p>24</p>
                        </div>
                        <div className="expBar"><span className="expCurrent" style={{width:`20%`}}></span><span className="expTotal" style={{width:`80%`}}></span></div>
                      </li>
                      <li style={{background:rgb}}>
                        <div className="jobDetails">
                          <img src={`https://xivapi.com/cj/1/fisher.png`} alt=""/>
                          <p>38</p>
                        </div>
                        <div className="expBar"><span className="expCurrent" style={{width:`76%`}}></span><span className="expTotal" style={{width:`24%`}}></span></div>
                      </li>
                    </>
              }
              { 
                !display_unleveled_jobs
                  ? null
                  : <>
                      <li style={{background:rgb}}>
                        <div className="jobDetails">
                          <img src={`https://xivapi.com/cj/1/redmage.png`} alt=""/>
                          <p>0</p>
                        </div>
                      </li>
                      <li style={{background:rgb}}>
                        <div className="jobDetails">
                          <img src={`https://xivapi.com/cj/1/scholar.png`} alt=""/>
                          <p>0</p>
                        </div>
                      </li>
                  </>
              }
              <li style={{background:rgb}}>
                <div className="jobDetails">
                  <img src={`https://xivapi.com/cj/1/warrior.png`} alt=""/>
                  <p>60</p>
                </div>
                <div className="expBar"><span className="expCurrent" style={{width:`60%`}}></span><span className="expTotal" style={{width:`40%`}}></span></div>
              </li>
              <li style={{background:rgb}}>
                <div className="jobDetails">
                  <img src={`https://xivapi.com/cj/1/dragoon.png`} alt=""/>
                  <p>60</p>
                </div>
                <div className="expBar"><span className="expCurrent" style={{width:`10%`}}></span><span className="expTotal" style={{width:`90%`}}></span></div>
              </li>
            </ul>
            <input onClick={this.copyToClipboard} ref={(input) => this.input = input} className="widgetUrl" readOnly type="text" value={window.location.href.replace('/#/jobs/', '/#') + widget_url} />
            <p><Link className='galleryButton' to={widget_url}>Go To Widget</Link></p>
          </div> {/* End of Wrapper */}
        </main>
        <Footer />
      </>
    );
  }
};

export default JobsSummary;