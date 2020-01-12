import React from 'react';


class ServerSelect extends React.Component {
  render() {
    return(
      <select onChange={(e) => this.props.updateSelect(e.target.value)} >
        <option value=''>Unknown</option>
        { 
          this.props.servers.map( (server) => {
            return <option key={server} value={server}>{server}</option>
          })
        }
      </select>
    );
  }
};

export default ServerSelect;