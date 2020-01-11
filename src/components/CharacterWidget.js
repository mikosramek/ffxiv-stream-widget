import React from 'react';
import axios from 'axios';


class CharacterWidget extends React.Component {
  constructor() {
    super();
    this.state = {
      lodestone_id : 10479845,
      url : `https://xivapi.com/character/`,
      character: {},
      extraInfo: {
        title: '-'
      }
    }
  }
  componentDidMount() {
    this.getCharacterData();
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
      })
    })
  }
  render() {
    const { Name, Avatar, ActiveClassJob, DC, Server } = this.state.character;
    const { title, job, jobImg } = this.state.extraInfo;
    return(
      <>
        <main>
          { 
            this.state.character !== {} && job === undefined
              ? null
              : <>
                  <div className="head">
                    <div className="backing"></div>
                    <div className="content">
                      <div className="portrait">
                        <img src={Avatar} alt={`The character portrait for ${Name}.`}/>
                        <img src={jobImg} alt={job} className="jobIcon" />
                      </div>
                      <div className="name">
                        <p>{ title }</p>
                        <h1>{ Name }</h1>
                        <p>Level {ActiveClassJob.Level} {job}.</p>
                        <p className="server">{DC} / {Server}</p>
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