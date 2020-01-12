import React from 'react';
import axios from 'axios';
import queryString from 'query-string';

class CharacterWidget extends React.Component {
  constructor() {
    super();
    this.state = {
      lodestone_id : 10479845,
      url : `https://xivapi.com/character/`,
      character: {},
      extraInfo: {
        title: '-'
      },
      display_portrait: true,
      display_title: true,
      display_server: true,
      update_rate: 0,
      background_color: ''
    }
  }
  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    if(Object.entries(values).length !== 0){
      this.setState({
        lodestone_id: this.props.match.params.id,
        display_portrait:  values.display_portrait ? values.display_portrait === 'true' : 'true' ,
        display_title: values.display_title ? values.display_title === 'true' : 'true',
        display_server: values.display_server ? values.display_server === 'true' : 'true',
        update_rate: values.update_rate ? parseInt(values.update_rate) : 0,
        background_color : values.background_color ? values.background_color : 'rgb(255,255,255,0.8)'
      },
      this.getCharacterData);
    }else {
      this.setState({
        lodestone_id: this.props.match.params.id
      }, this.getCharacterData);
    }
    
  }
  getCharacterData = () => {
    axios({
      method: 'GET',
      url: this.state.url + this.state.lodestone_id,
      dataResponse: 'json',
    }).then( (result) => {
      const char = result.data.Character;
      console.log(char);
      this.setState({
        character: char
      });
      this.getOtherDetails();
      
    }).catch( (error) => {
      console.log(error);
    });
  }
  getOtherDetails = () => {
    const titleDetails = axios({
      method: 'GET',
      url: 'https://xivapi.com/title',
      dataResponse: 'json',
      params: {
        ids:this.state.character.Title,
      }
    });

    const jobDetails = axios({
      method: 'GET',
      url: 'https://xivapi.com/ClassJob',
      dataResponse: 'json',
      params: {
        ids: this.state.character.ActiveClassJob.JobID,
      }
    });

    axios.all([jobDetails, titleDetails]).then((response) => {
      const a = {};
      a.title = response[1].data.Results[0].Name;
      a.titleImg = 'https://xivapi.com/' + response[1].data.Results[0].Icon;
      a.job = response[0].data.Results[0].Name;
      a.jobImg = 'https://xivapi.com/' + response[0].data.Results[0].Icon;
      this.setState({
        extraInfo: a
      }, () => {
        if(this.state.update_rate !== 0){
          setTimeout(this.getCharacterData, this.state.update_rate*1000);
        }
      });
    })
  }
  render() {
    const { Name, Avatar, ActiveClassJob, DC, Server } = this.state.character;
    const { title, job, jobImg } = this.state.extraInfo;
    const { display_portrait, display_title, display_server, background_color } = this.state;
    return(
      <>
        <main className="widget">
          { 
            this.state.character !== {} && job === undefined
              ? null
              : <>
                  <div className="head">
                    <div className="backing"></div>
                    <div className="content" style={{background: background_color}}>
                      { 
                        display_portrait
                          ? 
                            <div className="portrait">
                              <img className="character" src={Avatar} alt={`The character portrait for ${Name}.`}/>
                              <img src={jobImg} alt={job} className="jobIcon" />
                            </div>
                          : null
                      }
                      <div className="name">
                        { display_title ? <p>{ title }</p> : null }
                        <h2>{ Name }</h2>
                        <p>Level {ActiveClassJob.Level} {job}.</p>
                        { display_server ? <p className="server">{DC} / {Server}</p> : null }
                      </div>
                    </div>
                  </div>
                </>
          }
        </main>
      </>
    );
  }
};

export default CharacterWidget;