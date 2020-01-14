import React from 'react';
import axios from 'axios';
import queryString from 'query-string';

class JobsWidget extends React.Component {
  constructor() {
    super();
    this.state = {
      lodestone_id : 10479845,
      url : `https://xivapi.com/character/`,
      jobs: [],
      extraDetails: [],
      display_careers: true,
      display_unleveled_jobs: true,
      background_color: '',
      list_direction: 'column'
    }
  }
  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    if(Object.entries(values).length !== 0){
      this.setState({
        lodestone_id: this.props.match.params.id,
        display_careers:  values.display_careers ? values.display_careers === 'true' : true ,
        display_unleveled_jobs: values.display_unleveled_jobs ? values.display_unleveled_jobs === 'true' : true,
        list_direction: values.list_direction ? values.list_direction : 'column',
        update_rate: values.update_rate ? parseInt(values.update_rate) : 0,
        background_color : values.background_color ? values.background_color : 'rgb(255,255,255,0.8)'
      },
      () => { this.getCharacterData(); this.getOtherDetails(); });
    }else {
      this.setState({
        lodestone_id: this.props.match.params.id
      }, () => { this.getCharacterData(); this.getOtherDetails(); });
    }
  }
  getCharacterData = () => {
    axios({
      method: 'GET',
      url: this.state.url + this.state.lodestone_id,
      dataResponse: 'json',
    }).then( (result) => {
      const char = result.data.Character.ClassJobs;
      char.sort((a,b) => {return a.JobID < b.JobID ? -1 : 1});
      const filteredJobs = char
        .filter((job) => {return job.JobID > 18 || this.state.display_careers})
        .filter((job) => {return job.Level > 0 || this.state.display_unleveled_jobs});
      this.setState({
        jobs: filteredJobs
      });
    }).catch( (error) => {
      console.log(error);
    });
  }
  getOtherDetails = () => {
    axios({
      method: 'GET',
      url: 'https://xivapi.com/ClassJob',
      dataResponse: 'json',
    }).then( (result) => {
      const data = result.data.Results;
      data.sort((a,b) => {return a.ID < b.ID ? -1 : 1});
      this.setState({
        extraDetails: data
      })
    }).catch( (error) => {
      console.log(error);
    });
  }

  getJobInfo = (id) => {
    const a = this.state.extraDetails.filter((job) => { return job.ID === id })
    return a[0].Icon;
  }

  getExpBar = (level, max) => {
    const width = level/max * 100;
    return <><span className="expCurrent" style={{width:`${width}%`}}></span><span className="expTotal" style={{width:`${100 - width}%`}}></span></>
  }
  
  render() {
    return(
      <ul className="jobWidgetList" style={{'flexDirection':this.state.list_direction}}>
        {
          this.state.jobs.map((job) => {
            return (
              <li key={job.JobID}>
                <div className="jobDetails">
                  <img src={`https://xivapi.com${this.getJobInfo(job.JobID)}`} alt=""/>
                  <p>{job.Level}</p>
                </div>
                <div className="expBar">{this.getExpBar(job.ExpLevel, job.ExpLevelMax)}</div>
              </li>
            );
          })
        }
      </ul>
    );
  }
};

export default JobsWidget;